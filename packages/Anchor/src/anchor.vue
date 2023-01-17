<template>
  <affix v-if="affix" :offset-top="offsetTop" :get-container="getContainer">
    <div class="q-anchor">
      <div v-if="showInk" :class="['q-anchor-ink', inkHeight === '0px' ? '' : 'visible']" :style="{ top: inkPositionTop, height: inkHeight }" />
      <slot />
    </div>
  </affix>
  <div v-else class="q-anchor">
    <div v-if="showInk" class="q-anchor-ink" :style="{ top: inkPositionTop, height: inkHeight }" />
    <slot />
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce';
import { getScrollTop, getOffsetTop, scrollTo } from './dom.js';
import Affix from './affix.vue';

const sharpMatcherRegx = /#([^#]+)$/;

export default {
  name: "TssAnchor",
  components:{
    Affix
  },
  data(){
    return {
      links: [],
      scrollContainer: window,
      animating : false,
      inkPositionTop : '',
      inkHeight : '0px',
      bizAnchorActiveLink:''
    }
  },
  props:{
    affix: {
      type: Boolean,
      default: true
    },
    bounds: {
      type: Number,
      default: 5
    },
    getContainer:{
      type: Function,
      default:  () => window
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    showInk:{
      type: Boolean,
      default: true
    },
    targetOffset:{
      type: Number,
    },
    getCurrentAnchor:{
      type: Function,
      default:  null
    },
  },
  provide(){
    const getBizAnchor = () => {
      const registerLink = (link) => {
        if (!this.links.includes(link)) {
          this.links.push(link);
        }
      };
      const unregisterLink = (link) => {
        this.links = this.links.filter(item => item !== link);
      };
      const scrollTo = this.scrollTo.bind(this);
      return {
        registerLink,
        unregisterLink,
        scrollTo
      };
    }
    return {
      getBizAnchor,
      getBizAnchorActiveLink: () => this.bizAnchorActiveLink
    }
  },
  methods:{
    scrollTo(link) {
      const { offsetTop, getContainer, targetOffset } = this;

      this.setCurrentActiveLink(link);
      const container = getContainer();
      const scrollTop = getScrollTop(container);

      const sharpLinkMatch = sharpMatcherRegx.exec(link);
      if (!sharpLinkMatch) {
        return;
      }

      const targetElement = document.getElementById(sharpLinkMatch[1]);
      if (!targetElement) {
        return;
      }

      const eleOffsetTop = getOffsetTop(targetElement, container);
      let y = scrollTop + eleOffsetTop;
      y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
      this.animating = true;

      scrollTo(y, {
        callback: () => {
          this.animating = false;
        },
        getContainer,
      });
    },

    handleScroll() {
      if (this.animating) {
        return;
      }
      const currentActiveLink = this.getCurrentActiveLink(
        this.targetOffset !== undefined ? this.targetOffset : this.offsetTop || 0,
        this.bounds,
      );
      this.setCurrentActiveLink(currentActiveLink);
    },

    setCurrentActiveLink(link) {
      this.bizAnchorActiveLink = link;
      this.$nextTick(() => {
        const linkNode = this.$el.getElementsByClassName('is-active')[0];
        if (linkNode) {
          this.inkPositionTop = `${ linkNode.offsetTop }px`;
          this.inkHeight = `${ linkNode.clientHeight }px`;
        } else {
          this.inkHeight = '0px';
        }
      });
    },

    getCurrentActiveLink(offsetTop = 0, bounds = 5) {
      if (typeof this.getCurrentAnchor === 'function') {
        return this.getCurrentAnchor();
      }

      const activeLink = '';
      if (typeof document === 'undefined') {
        return activeLink;
      }

      const linkSections = [];
      const { getContainer } = this;

      const container = getContainer();
console.log(this.links, 'links');
      this.links.forEach(link => {
        const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
        if (!sharpLinkMatch) {
          return;
        }
        const target = document.getElementById(sharpLinkMatch[1]);
        if (target) {
          const top = getOffsetTop(target, container);
          if (top < offsetTop + bounds) {
            linkSections.push({
              link,
              top,
            });
          }
        }
      });

      if (linkSections.length) {
        const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
        return maxSection.link;
      }
      return '';
    }
  },
  mounted(){
    this.scrollHandLer = throttle(30, this.handleScroll.bind(this));

    this.$nextTick(() => {
      this.scrollContainer = this.getContainer();
      if (this.scrollContainer) {
        this.scrollContainer.addEventListener('scroll', this.scrollHandLer);
      }
      this.handleScroll();
    });
  },
  updated() {
    this.$nextTick(() => {
      const currentContainer = this.getContainer();
      if (this.scrollContainer !== currentContainer) {
        if (this.scrollContainer) {
          this.scrollContainer.removeEventListener('scroll', this.scrollHandLer);
        }
        this.scrollContainer = currentContainer;
        if (this.scrollContainer) {
          this.scrollContainer.addEventListener('scroll', this.scrollHandLer);
        }
        this.handleScroll();
      }
    });
  },

  beforeDestroy () {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.scrollHandLer);
    }
  }
}

</script>
