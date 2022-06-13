import Vue from 'vue'
import App from './App.vue'

import tssUi from '../packages'

Vue.config.productionTip = false
Vue.use(tssUi)

new Vue({
  render: h => h(App),
}).$mount('#app')
