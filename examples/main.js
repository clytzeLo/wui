import Vue from 'vue'
import App from './App.vue'

import TssUi from '../packages'

Vue.config.productionTip = false
Vue.use(TssUi)

new Vue({
  render: h => h(App),
}).$mount('#app')
