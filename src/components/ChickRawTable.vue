<template>
  <table class="chick-table">
    <thead>
      <tr>
        <th></th>
        <th>chick</th>
        <th>diet</th>
        <th>weight</th>
        <th>income</th>
        <th>last viewed</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in records">
        <tr>
          <th>{{item.id}}</th>
          <th>{{item.chick}}</th>
          <th>{{item.diet}}</th>
          <th>£{{item.weight}}</th>
          <th>£{{item.income}}</th>
          <th>{{item.updated | relativeDate}}</th>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'chick-raw-table',
  props: {
    records: Array,
  },
  filters: {
    relativeDate: (value) => {
      const today = new Date();
      const subTimezone = (today.getTimezoneOffset() - value.getTimezoneOffset()) * 60 * 1000;
      today.setTime(today.getTime() - subTimezone);
      const diff = today.getTime() - value.getTime();
      if (diff < 0) {
        return 'Future';
      }

      const years = today.getFullYear() - value.getFullYear();
      if (years) {
        if (years === 1) {
          return 'Previous Year';
        }
        return `${years} Years ago`;
      }

      const months = today.getMonth() - value.getMonth();
      if (months) {
        if (months === 1) {
          return 'Previous Month';
        }
        return `${months} Months ago`;
      }

      const days = today.getDay() - value.getDay();
      if (days) {
        if (days === 1) {
          return 'Yesterday';
        }
        return `${days} Days ago`;
      }

      return 'Today';
    },
  },
};
</script>
<style scoped>
body {
  padding-top: 29px;
}

.chick-table {
  background-color: rgba(216, 216, 216, 1);
  border: 1px solid rgba(151, 151, 151, 1);
}

.chick-table tr {
  background-color: rgba(184, 184, 184, 1);
}

.chick-table thead th {
  background-color: rgba(172, 172, 172, 1);
}

.chick-table td,
.chick-table th {
  width: 157px;
  color: white;
}
</style>
