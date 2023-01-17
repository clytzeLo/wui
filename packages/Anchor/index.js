import TssAnchor from './src/anchor.vue';

/* istanbul ignore next */
TssAnchor.install = function(Vue) {
  Vue.component(TssAnchor.name, TssAnchor);
};

export default TssAnchor;
