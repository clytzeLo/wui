import Vue from 'vue'
import App from './App.vue'

// import TssUi from '../packages'
import {TssButton} from 'tss_ui'
import {TssInput} from 'tss_ui'

Vue.config.productionTip = false

Vue.use(TssButton)
Vue.use(TssInput)

new Vue({
  render: h => h(App),
}).$mount('#app')
