<template>
  <div ref="placeholder" class="q-affix-placeholder" :style="placeholderStyle">
    <div class="q-affix" :style="affixStyle">
      <slot />
    </div>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce';
import { getTargetRect, getFixedTop } from './dom';

const events = ['scroll', 'resize'];

export default {
  data(){
    return {
      eventHandler:  throttle(16, this.updatePosition.bind(this)),
      placeholderStyle: {},
      affixStyle: {},
      affixContainer: null
    }
  },
  props: {
    getContainer: {
      type: Function,
      default: () => window
    },
    offsetTop: {
      type:Number,
      default: 0
    }
  },
  watch:{
    getContainer(val){
      let newTarget  = null;
      if (val) {
        newTarget = val() || null;
      }
      if (this.affixContainer !== newTarget) {
        events.forEach(event => this.affixContainer && this.affixContainer.removeEventListener(event, this.eventHandler));
        events.forEach(event => newTarget && newTarget.addEventListener(event, this.eventHandler));
        this.updatePosition();
        this.affixContainer = newTarget;
      }
    },
    offsetTop(){
      this.updatePosition();
    }
  },
  methods:{
    updatePosition(){
      const $container = this.getContainer();
      const $placeholder = this.$refs.placeholder;

      if (!$container || !$placeholder) {
        return;
      }
      const containerRect = getTargetRect($container);
      const placeholderRect = getTargetRect($placeholder);
      const fixedTop = getFixedTop(placeholderRect, containerRect, this.offsetTop);
      if (fixedTop !== undefined) {
        this.affixStyle = {
          position: 'fixed',
          top: fixedTop,
          width: placeholderRect.width + 'px',
          height: placeholderRect.height + 'px',
        };
        this.placeholderStyle = {
          width: placeholderRect.width + 'px',
          height: placeholderRect.height + 'px',
        };
      } else {
        this.affixStyle = {};
        this.placeholderStyle = {};
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.affixContainer = this.getContainer();
      events.forEach(event => this.affixContainer && this.affixContainer.addEventListener(event, this.eventHandler));
    });
  },
  beforeDestroy () {
    events.forEach(event => this.affixContainer && this.affixContainer.removeEventListener(event, this.eventHandler));
  }
}
</script>
