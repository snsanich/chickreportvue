import Vue from 'vue';
import PanelDataGraphChick from './PanelDataGraphChick';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#panel_data_graph_chick',
  router,
  render: h => h(PanelDataGraphChick),
});
