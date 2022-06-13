<template>
  <div class="tss-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tss-button',
  props: {
    type: String
  }
}
</script>

<style scoped>
  .tss-button {
      display: inline-block;
      padding: 3px 6px;
      background: #000;
      color: #fff;
  }
</style>