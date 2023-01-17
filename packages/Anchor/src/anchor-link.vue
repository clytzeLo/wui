<template>
  <div class="q-anchor-link">
    <slot name="title">
      <a
        :href="href"
        :target="target"
        :title="title"
        class="q-anchor-link__title"
        :class="getBizAnchorActiveLink() === href ? 'is-active' : ''"
        @click="handleClick"
      >
        {{ title }}
      </a>
    </slot>
    <slot />
  </div>
</template>

<script>

export default {
  name:"TssAnchorLink",
  props: {
    title: {
      type:String,
      default: ''
    },
    href: {
      type:String,
      default: ''
    },
    target:{
      type: String,
      default:''
    }
  },
  inject:[
    'getBizAnchor',
    'getBizAnchorActiveLink'
  ],
  watch:{
    href(val, oldVal) {
      this.$nextTick(() => {
        this.bizAnchor.unregisterLink(oldVal);
        this.bizAnchor.registerLink(val);
      });
    }
  },
  data(){
    return {
      bizAnchor: null
    }
  },
  mounted() {
    this.bizAnchor.registerLink(this.href);
  },

  beforeDestroy() {
    this.bizAnchor.unregisterLink(this.href);
  },

  created () {
    this.bizAnchor = this.getBizAnchor();
  },
  methods:{
    handleClick (e) {
      this.bizAnchor.scrollTo(this.href);
      this.$emit('click', e, { title: this.title, href: this.href });
    }
  }
}
</script>

