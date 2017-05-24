<template>
  <svg v-if="chicks" class="pie-chart" viewBox="-1 -1 2 2" style="transform: rotate(-0.90deg)">
    <path v-for="path in generatePieChartPaths(chicks)" :fill="path.fill" :d="path.d"></path>
  </svg>
</template>

<script>
export default {
  name: 'chick-pie-chart',
  props: {
    chicks: Array,
  },

  methods: {
    extractPercentInChickByDiet(chicks) {
      const dietMap = [];
      const addToDietGroup = (chick) => {
        if (!dietMap[chick.diet]) {
          dietMap[chick.diet] = [];
        }
        dietMap[chick.diet].push(chick.maxIncome);
      };

      const getDietPercentList = () => {
        let totalIncomeDiets = 0;

        const avgIncomeForDietList = Object.keys(dietMap).map((x) => {
          const dietIncomeList = dietMap[x];
          const sumIncomes = dietIncomeList.reduce((acc, cur) => acc + cur, 0);
          const avgIncomeForDiet = sumIncomes / dietIncomeList.length;
          totalIncomeDiets += avgIncomeForDiet;
          return avgIncomeForDiet;
        });

        return avgIncomeForDietList.map(x => Math.round((x * 100) / totalIncomeDiets));
      };

      chicks.map(addToDietGroup);
      return getDietPercentList();
    },

    generatePieChartPaths(chicks) {
      const dietProportions = this.extractPercentInChickByDiet(chicks);
      return this.drawPieChartPaths(dietProportions);
    },

    drawPieChartPaths(dietProportions) {
      const colors = ['#aaa', '#bbb', '#ccc', '#ddd', '#eee', '#fff'];

      function getCoordinatesForPercent(percent) {
        return {
          x: Math.cos(2 * Math.PI * percent),
          y: Math.sin(2 * Math.PI * percent),
        };
      }

      const sumDiet = (acc, cur) => acc + cur;
      const dietSum = dietProportions.reduce(sumDiet, 0);
      const percents = dietProportions.map(proportion => proportion / dietSum);

      let sumPercent = 0;
      const pathData = percents.map((percent, index) => {
        const start = getCoordinatesForPercent(sumPercent);
        sumPercent += percent;
        const end = getCoordinatesForPercent(sumPercent);
        const largeArcFlag = sumPercent > 0.5 ? 1 : 0;

        const data = [
          `M ${start.x} ${start.y}`,
          `A 1 1 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
          'L 0 0',
        ].join(' ');
        return {
          d: data,
          fill: colors[index],
        };
      });
      return pathData;
    },
  },
};
</script>
<style scoped>
.pie-chart {
  border: 1px solid rgba(151, 151, 151, 1);
  border-radius: 173px;
  transform: rotate(-0.90deg);
}
</style>
