import AnchorLink from '../Anchor/src/anchor-link';

/* istanbul ignore next */
AnchorLink.install = function(Vue) {
  Vue.component(AnchorLink.name, AnchorLink);
  // Vue.component(AnchorLink.name, AnchorLink);
};

export default AnchorLink;
