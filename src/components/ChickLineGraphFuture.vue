<template>
  <div>
    <svg class="future-graph" viewBox="0 0 200 200">
      <template v-if="lineChartUp">
        <line stroke-dasharray="5, 10" x1="0" x2="200" v-bind:y1="lineChartUp.from" v-bind:y2="lineChartUp.to" stroke="white" stroke-width="2" />
      </template>
      <template v-if="lineChartDown">
        <line stroke-dasharray="5, 10" x1="0" x2="200" v-bind:y1="lineChartDown.from" v-bind:y2="lineChartDown.to" stroke="white" stroke-width="2" />
      </template>
    </svg>
    <div class="future-graph-title">
      Next {{maxNumberOfWeeks}} weeks
    </div>
  </div>
</template>

<script>
export default {
  name: 'chick-line-graph-future',
  props: {
    quantiles: Object,
    maxNumberOfWeeks: Number,
  },
  computed: {
    lineChartUp() {
      if (!this.quantiles) {
        return undefined;
      }
      return {
        from: this.quantiles[50],
        to: this.quantiles[75],
      };
    },

    lineChartDown() {
      if (!this.quantiles) {
        return undefined;
      }
      return {
        from: this.quantiles[50],
        to: this.quantiles[25],
      };
    },
  },
};
</script>
<style scoped>
.future-graph {
  background-color: rgba(216, 216, 216, 1);
  border: 1px solid rgba(151, 151, 151, 1);
}

.future-graph-title {
  font-family: 'AvenirNext-Bold';
  font-size: 24px;
  color: rgba(74, 74, 74, 1);
}
</style>
