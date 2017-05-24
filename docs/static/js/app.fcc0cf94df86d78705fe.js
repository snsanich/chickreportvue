webpackJsonp([1],Array(39).concat([function(t,e,n){"use strict";var r=n(21),a=n(136),i=n(126),c=n.n(i),o=n(127),s=n.n(o),u=n(125),h=n.n(u),l=n(122),f=n.n(l),d=n(121),v=n.n(d),m=n(124),p=n.n(m),_=n(123),k=n.n(_);r.a.use(a.a),r.a.component("chick-raw-table",h.a),r.a.component("chick-line-graph-history",f.a),r.a.component("chick-line-graph-future",v.a),r.a.component("chick-quantiles-table",p.a),r.a.component("chick-pie-chart",k.a),e.a=new a.a({routes:[{path:"/",name:"View1",component:c.a},{path:"*",name:"View404",component:s.a}]})},function(t,e,n){n(114);var r=n(1)(n(60),n(132),null,null);t.exports=r.exports},,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(21),a=n(40),i=n.n(a),c=n(39);r.a.config.productionTip=!1,new r.a({el:"#panel_data_graph_chick",router:c.a,render:function(t){return t(i.a)}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"panel_data_graph_chick"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"chick-line-graph-future",props:{quantiles:Object,maxNumberOfWeeks:Number},computed:{lineChartUp:function(){if(this.quantiles)return{from:this.quantiles[50],to:this.quantiles[75]}},lineChartDown:function(){if(this.quantiles)return{from:this.quantiles[50],to:this.quantiles[25]}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(27),a=n.n(r);e.default={name:"chick-line-graph-history",props:{points:Array,maxNumberOfWeeks:Number},computed:{drewChartString:function(){var t=this.filterPointsForLineChart(this.points);return this.drawLineChart(t,2,2)}},methods:{filterPointsForLineChart:function(t){var e={},n=function(t){e[t.x]||(e[t.x]=[]),e[t.x].push(t)};return t.map(n),a()(e).map(function(t){var n=e[t],r=n.reduce(function(t,e){return++t.count,t.y+=e.y,t},{x:t,count:0,y:0});return{x:r.x,y:Math.floor(r.y/r.count)}})},drawLineChart:function(t,e,n){var r=!0,a=function(t){return r?(r=!1,"M "+t.x*e+" "+t.y*n):"L "+t.x*e+" "+t.y*n};return t.map(a).join(" ")}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(27),a=n.n(r);e.default={name:"chick-pie-chart",props:{chicks:Array},methods:{extractPercentInChickByDiet:function(t){var e=[],n=function(t){e[t.diet]||(e[t.diet]=[]),e[t.diet].push(t.maxIncome)};return t.map(n),function(){var t=0;return a()(e).map(function(n){var r=e[n],a=r.reduce(function(t,e){return t+e},0),i=a/r.length;return t+=i,i}).map(function(e){return Math.round(100*e/t)})}()},generatePieChartPaths:function(t){var e=this.extractPercentInChickByDiet(t);return this.drawPieChartPaths(e)},drawPieChartPaths:function(t){function e(t){return{x:Math.cos(2*Math.PI*t),y:Math.sin(2*Math.PI*t)}}var n=["#aaa","#bbb","#ccc","#ddd","#eee","#fff"],r=function(t,e){return t+e},a=t.reduce(r,0),i=t.map(function(t){return t/a}),c=0;return i.map(function(t,r){var a=e(c);c+=t;var i=e(c),o=c>.5?1:0;return{d:["M "+a.x+" "+a.y,"A 1 1 0 "+o+" 1 "+i.x+" "+i.y,"L 0 0"].join(" "),fill:n[r]}})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"chick-quantiles-table",props:{quantiles:Object,quantileChangeInPercent:Number},computed:{drewChartString:function(){return this.drawLineChart(this.lineChartPoints,2,2)}},methods:{drawLineChart:function(t,e,n){var r=!0,a=function(t){return r?(r=!1,"M "+t.x*e+" "+t.y*n):"L "+t.x*e+" "+t.y*n};return t.map(a).join(" ")}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"chick-raw-table",props:{records:Array},filters:{relativeDate:function(t){var e=new Date,n=60*(e.getTimezoneOffset()-t.getTimezoneOffset())*1e3;if(e.setTime(e.getTime()-n),e.getTime()-t.getTime()<0)return"Future";var r=e.getFullYear()-t.getFullYear();if(r)return 1===r?"Previous Year":r+" Years ago";var a=e.getMonth()-t.getMonth();if(a)return 1===a?"Previous Month":a+" Months ago";var i=e.getDay()-t.getDay();return i?1===i?"Yesterday":i+" Days ago":"Today"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(73),a=n.n(r),i=n(69),c=n.n(i),o=n(71),s=n.n(o),u=n(72),h=n.n(u),l=n(41),f=n.n(l),d=function(){function t(e,n){s()(this,t),this.x=e,this.y=n}return h()(t,null,[{key:"properties",get:function(){return{x:Number,y:Number}}}]),t}(),v=function(){function t(e,n){s()(this,t),this.id=e,this.dietId=n,this.maxWeekAgo=-1/0,this.maxIncomeValue=-1/0,this.initWeight=NaN}return h()(t,[{key:"registerRecord",value:function(t){this.maxWeekAgo=Math.max(t.someWeekAgo,this.maxWeekAgo),0===t.someWeekAgo&&(this.initWeight=t.weight)}},{key:"addMaxIncome",value:function(t){this.maxIncomeValue=Math.max(this.maxIncomeValue,t)}},{key:"calculateIncome",value:function(t){return t-this.initWeight}},{key:"calculateWeek",value:function(t){var e=this.maxWeekAgo-t,n=7*e*864e5,r=Date.now();return new Date(r-n)}},{key:"diet",get:function(){return this.dietId}},{key:"maxIncome",get:function(){return this.maxIncomeValue}}]),t}();e.default={name:"view1",data:function(){return{records:[],errors:[],rawChicks:[],chicks:[],chickId:100,maxNumberOfWeeks:0,points:[],maxIncome:-1/0,quantiles:void 0,quantileChangeInPercent:0}},methods:{DataWithId:function(t,e,n,r,a,i){return c()({},t,{id:e,chick:n,diet:r,someWeekAgo:a,weight:i,income:0,update:new Date})},addIdentifierToData:function(t){return this.chickId=this.chickId+1,this.DataWithId(t,this.chickId,t.Chick,t.Diet,t.Time,t.weight)},findOrCreateChick:function(t,e){return this.rawChicks[t]||(this.rawChicks[t]=new v(t,e)),this.rawChicks[t]},addChick:function(t){return this.findOrCreateChick(t.chick,t.diet).registerRecord(t),t},addIncomeWeekToRecord:function(t){var e=this.findOrCreateChick(t.chick,t.diet);return function(){return t.income=e.calculateIncome(t.weight),e.addMaxIncome(t.income),t.updated=e.calculateWeek(t.someWeekAgo),t}()},findMaxIncome:function(t){return this.maxIncome=Math.max(t.income,this.maxIncome),t},findMaxNumberOfWeeks:function(t,e){this.maxNumberOfWeeks=Math.ceil(e/6048e5)}},created:function(){var t=this,e=window.location.protocol+"//"+window.location.host+":"+window.location.port+window.location.pathname;f.a.get(e+"/static/raw-data.json").then(function(e){function n(t){function e(t,e){e%a==0&&(i.push(c),c={value:0,count:0}),c.value+=t,++c.count}function n(t,e){o[25*e]=t.count?Math.floor(t.value/t.count):0}var r=t.map(function(t){return t.y}).sort(function(t,e){return t-e}),a=Math.floor(r.length/4),i=[],c={value:0,count:0};r.map(e);var o={};i.map(n);var s=t.length/2,u=t[Math.ceil(s)].y/2;return o.median=t[Math.floor(s)].y+u,o}var r=e.data.map(function(e){return t.addIdentifierToData(e)});r=r.map(function(e){return t.addChick(e)}),r=r.map(function(e){return t.addIncomeWeekToRecord(e)}),r=r.map(function(e){return t.findMaxIncome(e)}),t.records=r;var i=function(t){return t.updated.getTime()},c=Math.min.apply(Math,a()(r.map(i))),o=Date.now()-c;t.findMaxNumberOfWeeks(r,o);var s=function(t,e,n){return function(r){var a=r.updated.getTime()-t,i=Math.ceil(a/e*100),c=r.income/n,o=Math.ceil(100*(1-c));return new d(i,o)}}(c,o,t.maxIncome),u=t.records.map(s).sort(function(t,e){return t.x-e.x}),h=n(u),l=u.filter(function(t){return t.y<90}),f=n(l);t.chicks=t.rawChicks,t.points=u,t.quantiles=h,t.quantileChangeInPercent=h[75]-f[75]}).catch(function(e){t.errors.push(e)})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"view404"}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,function(t,e,n){n(117);var r=n(1)(n(61),n(135),"data-v-c2b682f8",null);t.exports=r.exports},function(t,e,n){n(115);var r=n(1)(n(62),n(133),"data-v-6ba20aa3",null);t.exports=r.exports},function(t,e,n){n(113);var r=n(1)(n(63),n(131),"data-v-3e669fdb",null);t.exports=r.exports},function(t,e,n){n(111);var r=n(1)(n(64),n(129),"data-v-030cf0c3",null);t.exports=r.exports},function(t,e,n){n(110);var r=n(1)(n(65),n(128),"data-v-01f196a2",null);t.exports=r.exports},function(t,e,n){n(116);var r=n(1)(n(66),n(134),"data-v-982583ae",null);t.exports=r.exports},function(t,e,n){n(112);var r=n(1)(n(67),n(130),"data-v-0bf0b3b0",null);t.exports=r.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",{staticClass:"chick-table"},[t._m(0),t._v(" "),n("tbody",[t._l(t.records,function(e){return[n("tr",[n("th",[t._v(t._s(e.id))]),t._v(" "),n("th",[t._v(t._s(e.chick))]),t._v(" "),n("th",[t._v(t._s(e.diet))]),t._v(" "),n("th",[t._v("£"+t._s(e.weight))]),t._v(" "),n("th",[t._v("£"+t._s(e.income))]),t._v(" "),n("th",[t._v(t._s(t._f("relativeDate")(e.updated)))])])]})],2)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th"),t._v(" "),n("th",[t._v("chick")]),t._v(" "),n("th",[t._v("diet")]),t._v(" "),n("th",[t._v("weight")]),t._v(" "),n("th",[t._v("income")]),t._v(" "),n("th",[t._v("last viewed")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("table",{staticClass:"avg-stats"},[t.quantiles?n("tbody",[n("tr",[n("th",[t._v("High")]),t._v(" "),n("td",[t._v(t._s(t.quantiles[75]))])]),t._v(" "),n("tr",[n("th",[t._v("Avg")]),t._v(" "),n("td",[t._v(t._s(t.quantiles[50]))])]),t._v(" "),n("tr",[n("th",[t._v("Low")]),t._v(" "),n("td",[t._v(t._s(t.quantiles[25]))])])]):t._e()]),t._v(" "),t.quantileChangeInPercent>0?n("div",{staticClass:"avg-stats-summary"},[t._v("\n    upside %"+t._s(t.quantileChangeInPercent)+"\n  ")]):t._e(),t._v(" "),t.quantileChangeInPercent<0?n("div",{staticClass:"avg-stats-summary"},[t._v("\n    downside -%"+t._s(t.quantileChangeInPercent)+"\n  ")]):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n  Oops you hit a 404.\n  "),n("a",{attrs:{href:"/"}},[t._v("Head back to home.")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.chicks?n("svg",{staticClass:"pie-chart",staticStyle:{transform:"rotate(-0.90deg)"},attrs:{viewBox:"-1 -1 2 2"}},t._l(t.generatePieChartPaths(t.chicks),function(t){return n("path",{attrs:{fill:t.fill,d:t.d}})})):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"panel_data_graph_chick"}},[n("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("svg",{staticClass:"history-graph",attrs:{viewBox:"0 0 200 200"}},[t.drewChartString?n("path",{attrs:{d:t.drewChartString,stroke:"white",fill:"transparent","stroke-width":"3"}}):t._e()]),t._v(" "),n("div",{staticClass:"history-graph-title"},[t._v("\n    Past "+t._s(t.maxNumberOfWeeks)+" weeks\n  ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex-container flex-horizontal"},[n("div",{staticClass:"flex-container flex-vertical"},[n("div",[n("chick-line-graph-history",{attrs:{"max-number-of-weeks":t.maxNumberOfWeeks,points:t.points}})],1),t._v(" "),n("div",[n("chick-line-graph-future",{attrs:{"max-number-of-weeks":t.maxNumberOfWeeks,quantiles:t.quantiles}})],1),t._v(" "),n("div",[n("chick-quantiles-table",{attrs:{quantiles:t.quantiles,"quantile-change-in-percent":t.quantileChangeInPercent}})],1),t._v(" "),n("div",[n("chick-pie-chart",{attrs:{chicks:t.chicks}})],1)]),t._v(" "),n("div",{staticClass:"flex-horizontal-table"},[n("chick-raw-table",{attrs:{records:t.records}})],1),t._v(" "),t.errors&&t.errors.length?n("ul",t._l(t.errors,function(e){return n("li",[t._v("\n      "+t._s(e.message)+"\n    ")])})):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("svg",{staticClass:"future-graph",attrs:{viewBox:"0 0 200 200"}},[t.lineChartUp?[n("line",{attrs:{"stroke-dasharray":"5, 10",x1:"0",x2:"200",y1:t.lineChartUp.from,y2:t.lineChartUp.to,stroke:"white","stroke-width":"2"}})]:t._e(),t._v(" "),t.lineChartDown?[n("line",{attrs:{"stroke-dasharray":"5, 10",x1:"0",x2:"200",y1:t.lineChartDown.from,y2:t.lineChartDown.to,stroke:"white","stroke-width":"2"}})]:t._e()],2),t._v(" "),n("div",{staticClass:"future-graph-title"},[t._v("\n    Next "+t._s(t.maxNumberOfWeeks)+" weeks\n  ")])])},staticRenderFns:[]}}]),[59]);