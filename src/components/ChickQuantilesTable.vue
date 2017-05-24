<template>
  <div>
    <table class="avg-stats">
      <tbody v-if="quantiles">
        <tr>
          <th>High</th>
          <td>{{quantiles[75]}}</td>
        </tr>
        <tr>
          <th>Avg</th>
          <td>{{quantiles[50]}}</td>
        </tr>
        <tr>
          <th>Low</th>
          <td>{{quantiles[25]}}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="quantileChangeInPercent > 0" class="avg-stats-summary">
      upside %{{quantileChangeInPercent}}
    </div>
    <div v-if="quantileChangeInPercent < 0" class="avg-stats-summary">
      downside -%{{quantileChangeInPercent}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'chick-quantiles-table',
  props: {
    quantiles: Object,
    quantileChangeInPercent: Number,
  },
  computed: {
    // a computed getter
    drewChartString() {
      return this.drawLineChart(this.lineChartPoints, 2, 2);
    },
  },

  methods: {
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
.avg-stats {
  width: 100%;
  background-color: rgba(223, 223, 223, 1);
  border: 1px solid rgba(151, 151, 151, 1);
}

.avg-stats-summary {
  color: rgba(74, 74, 74, 1);
  text-align: center;
}
</style>
