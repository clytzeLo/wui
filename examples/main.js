import Vue from 'vue'
import App from './App.vue'

import xui from '../pageages'

Vue.config.productionTip = false
Vue.use(xui)

new Vue({
  render: h => h(App),
}).$mount('#app')
