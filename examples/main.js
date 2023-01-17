import Vue from 'vue'
import App from './App.vue'

import TssUi from '../packages'
// import {TssButton} from '../'
// import {TssInput} from 'tss_ui'
// import {TssAnchor} from '../packages/Anchor/index'
import '../packages/Anchor/src/index.scss'

Vue.config.productionTip = false

// Vue.use(TssButton)
// Vue.use(TssInput)
Vue.use(TssUi)

new Vue({
  render: h => h(App),
}).$mount('#app')
