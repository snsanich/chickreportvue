<template>
  <div>
    <svg class="history-graph" viewBox="0 0 200 200">
      <path v-if="drewChartString" v-bind:d="drewChartString" stroke="white" fill="transparent" stroke-width="3" />

    </svg>
    <div class="history-graph-title">
      Past {{maxNumberOfWeeks}} weeks
    </div>
  </div>
</template>

<script>
/*
eslint no-plusplus: 0
  */
export default {
  name: 'chick-line-graph-history',
  props: {
    points: Array,
    maxNumberOfWeeks: Number,
  },
  computed: {
    // a computed getter
    drewChartString() {
      const lineChartPoints = this.filterPointsForLineChart(this.points);
      return this.drawLineChart(lineChartPoints, 2, 2);
    },
  },

  methods: {
    filterPointsForLineChart(points) {
      const pointMap = {};

      const extractPointToMap = (point) => {
        if (!pointMap[point.x]) {
          pointMap[point.x] = [];
        }
        pointMap[point.x].push(point);
      };
      points.map(extractPointToMap);
      return Object.keys(pointMap).map((x) => {
        const group = pointMap[x];
        const point = group.reduce((acc, cur) => {
          ++acc.count;
          acc.y += cur.y;
          return acc;
        }, { x, count: 0, y: 0 });

        return {
          x: point.x,
          y: Math.floor(point.y / point.count),
        };
      });
    },
    drawLineChart(lineChartPoints, multiplierX, multiplierY) {
      let firstLine = true;
      const pointToSvgPathString = (point) => {
        if (firstLine) {
          firstLine = false;
          return `M ${point.x * multiplierX} ${point.y * multiplierY}`;
        }
        return `L ${point.x * multiplierX} ${point.y * multiplierY}`;
      };
      return lineChartPoints.map(pointToSvgPathString).join(' ');
    },
  },
};
</script>
<style scoped>
svg {
  transform-origin: 0px 0px 0px;
}

.history-graph {
  background-color: rgba(216, 216, 216, 1);
  border: 1px solid rgba(151, 151, 151, 1);
}

.history-graph-title {
  font-family: 'AvenirNext-Bold';
  font-size: 24px;
  color: rgba(74, 74, 74, 1);
}
</style>
