import Vue from 'vue';
import Router from 'vue-router';
import View1 from '@/components/View1';
import View404 from '@/components/View404';
import ChickRawTable from '@/components/ChickRawTable';
import ChickLineGraphHistory from '@/components/ChickLineGraphHistory';
import ChickLineGraphFuture from '@/components/ChickLineGraphFuture';
import ChickQuantilesTable from '@/components/ChickQuantilesTable';
import ChickPieChart from '@/components/ChickPieChart';

Vue.use(Router);
Vue.component('chick-raw-table', ChickRawTable);
Vue.component('chick-line-graph-history', ChickLineGraphHistory);
Vue.component('chick-line-graph-future', ChickLineGraphFuture);
Vue.component('chick-quantiles-table', ChickQuantilesTable);
Vue.component('chick-pie-chart', ChickPieChart);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'View1',
      component: View1,
    },
    {
      path: '*',
      name: 'View404',
      component: View404,
    },
  ],
});
