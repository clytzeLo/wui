// 导入组件，组件必须声明 name
import TssButton from './src'

// 为组件提供 install 安装方法，供按需引入
TssButton.install = function (Vue) {
  Vue.component(TssButton.name, TssButton)
}

// 导出组件
export default TssButton
