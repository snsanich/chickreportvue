<template>
  <div class="flex-container flex-horizontal">
    <div class="flex-container flex-vertical">
      <div>
        <chick-line-graph-history v-bind:max-number-of-weeks="maxNumberOfWeeks" v-bind:points="points"></chick-line-graph-history>
      </div>
      <div>
        <chick-line-graph-future v-bind:max-number-of-weeks="maxNumberOfWeeks" v-bind:quantiles="quantiles"></chick-line-graph-future>
      </div>
      <div>
        <chick-quantiles-table v-bind:quantiles="quantiles" v-bind:quantile-change-in-percent="quantileChangeInPercent"></chick-quantiles-table>
      </div>
      <div>
        <chick-pie-chart v-bind:chicks="chicks"></chick-pie-chart>
      </div>
    </div>
    <div class="flex-horizontal-table">
      <chick-raw-table v-bind:records="records"></chick-raw-table>
    </div>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
/*
eslint no-plusplus: 0
 */
import axios from 'axios';

class Point {
  static get properties() {
    return {
      x: Number,
      y: Number,
    };
  }
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Chick {


  get diet() {
    return this.dietId;
  }

  get maxIncome() {
    return this.maxIncomeValue;
  }

  registerRecord(record) {
    this.maxWeekAgo = Math.max(record.someWeekAgo, this.maxWeekAgo);
    if (record.someWeekAgo === 0) {
      this.initWeight = record.weight;
    }
  }

  addMaxIncome(income) {
    this.maxIncomeValue = Math.max(this.maxIncomeValue, income);
  }

  calculateIncome(weight) {
    return weight - this.initWeight;
  }

  /**
   * if _maxWeekAgo is now,
   * than weekAgo is yesterday.
   * So, formula is: now - (_maxWeekAgo - weekAgo) weeks
   * @param weekAgo
   */
  calculateWeek(weekAgo) {
    const weeks = this.maxWeekAgo - weekAgo;
    const millisecondsInWeeks = weeks * 7 * 86400000;
    const now = Date.now();
    return new Date(now - millisecondsInWeeks);
  }

  constructor(id, diet) {
    this.id = id;
    this.dietId = diet;
    this.maxWeekAgo = -Infinity;
    this.maxIncomeValue = -Infinity;
    this.initWeight = NaN;
  }
}

export default {
  name: 'view1',
  data: () => ({
    records: [],
    errors: [],
    rawChicks: [],
    chicks: [],
    chickId: 100,
    maxNumberOfWeeks: 0,
    points: [],
    maxIncome: -Infinity,
    quantiles: undefined,
    quantileChangeInPercent: 0,
  }),

  methods: {
    DataWithId(data, id, chickId, dietId, someWeekAgo, weight) {
      return Object.assign({}, data, {
        id,
        chick: chickId,
        diet: dietId,
        someWeekAgo,
        weight,
        income: 0,
        update: new Date(),
      });
    },
    addIdentifierToData(data) {
      this.chickId = this.chickId + 1;
      return this.DataWithId(data, this.chickId, data.Chick, data.Diet, data.Time, data.weight);
    },

    findOrCreateChick(key, diet) {
      if (!this.rawChicks[key]) {
        this.rawChicks[key] = new Chick(key, diet);
      }
      return this.rawChicks[key];
    },

    addChick(record) {
      const chick = this.findOrCreateChick(record.chick, record.diet);
      chick.registerRecord(record);
      return record;
    },

    addIncomeWeekToRecord(record) {
      const chick = this.findOrCreateChick(record.chick, record.diet);
      function newWithIncomeWeek() {
        record.income = chick.calculateIncome(record.weight);
        chick.addMaxIncome(record.income);
        record.updated = chick.calculateWeek(record.someWeekAgo);
        return record;
      }
      return newWithIncomeWeek();
    },

    findMaxIncome(record) {
      this.maxIncome = Math.max(record.income, this.maxIncome);
      return record;
    },
    findMaxNumberOfWeeks(records, msecondsPeriod) {
      const msecondsInWeek = 86400000 * 7;
      this.maxNumberOfWeeks = Math.ceil(msecondsPeriod / msecondsInWeek);
    },
  },

  created() {
    axios.get('./static/raw-data.json')
      .then((response) => {
        let updated = response.data.map(item => this.addIdentifierToData(item));
        updated = updated.map(item => this.addChick(item));
        updated = updated.map(item => this.addIncomeWeekToRecord(item));
        updated = updated.map(item => this.findMaxIncome(item));
        this.records = updated;

        const extractTimestamp = record => record.updated.getTime();

        const oldestTimestamp = Math.min(...updated.map(extractTimestamp));
        const msecondsPeriod = Date.now() - oldestTimestamp;
        this.findMaxNumberOfWeeks(updated, msecondsPeriod);

        const pointsForLineChart = (divForX, maxX, maxY) => (record) => {
          const updateMinusOffset = record.updated.getTime() - divForX;
          const x = Math.ceil((updateMinusOffset / maxX) * 100);
          const incomeByCoordinate = record.income / maxY;
          const y = Math.ceil((1 - incomeByCoordinate) * 100);
          return new Point(x, y);
        };

        function quantiles(points) {
          const incomes = points.map(point => point.y).sort((a, b) => a - b);
          const quantileSize = Math.floor(incomes.length / 4);
          const list = [];

          let curQuantile = { value: 0, count: 0 };

          function calculateQuantiles(income, index) {
            if ((index % quantileSize) === 0) {
              list.push(curQuantile);
              curQuantile = { value: 0, count: 0 };
            }
            curQuantile.value += income;
            ++curQuantile.count;
          }

          incomes.map(calculateQuantiles);

          const result = {};

          function mapQuantilesToResult(cur, index) {
            const quantilePercent = index * 25;
            result[quantilePercent] = cur.count ? Math.floor(cur.value / cur.count) : 0;
          }

          list.map(mapQuantilesToResult);

          const halfSize = points.length / 2;
          const nextValue = points[Math.ceil(halfSize)].y / 2;
          result.median = points[Math.floor(halfSize)].y + nextValue;

          return result;
        }
        const relativePoints = pointsForLineChart(oldestTimestamp, msecondsPeriod, this.maxIncome);
        const points = this.records.map(relativePoints).sort((a, b) => a.x - b.x);

        const quantiles0to100by25 = quantiles(points);
        const pointsMonthAgo = points.filter(point => point.y < 90);
        const quantiles0to100by25MonthAgo = quantiles(pointsMonthAgo);

        this.chicks = this.rawChicks;
        this.points = points;
        this.quantiles = quantiles0to100by25;
        this.quantileChangeInPercent = quantiles0to100by25[75] - quantiles0to100by25MonthAgo[75];
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex-container.flex-horizontal {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;

  -ms-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

.flex-container>div {
  -ms-flex: 1 1 0.000000001px;
  -webkit-flex: 1;
  flex: 1;
  -webkit-flex-basis: 0.000000001px;
  flex-basis: 0.000000001px;

  padding: 0 15px 15px 15px;
  margin: 0 5px 5px 5px;
  width: 173px;
  height: 219px;
}

.flex-container.flex-vertical {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.flex-container>.flex-horizontal-table {
  -ms-flex: 10 10 0.000000001px;
  -webkit-flex: 10;
  flex: 10;
}
</style>
