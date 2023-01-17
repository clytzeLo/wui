<template>
  <div class="hello">
    <tss-button>button233</tss-button>
    <tss-input></tss-input>
    <div class="anchor-class">
      <div class="content">
      <div id="props"> props</div>
      <div id="slots"> slots</div>
    </div>
      <tss-anchor>
        <tss-anchor-link title="何时使用" />
        <tss-anchor-link  title="基础用法" />
        <tss-anchor-link  target="_blank" title="新页面" />
        <tss-anchor-link title="API" href="#API">
          <tss-anchor-link href="#props" title="Props" />
          <tss-anchor-link href="#slots" title="Slots" />
        </tss-anchor-link>
      </tss-anchor>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     window.addEventListener('scroll', () => {
  //       console.log(123123);
  //     })
  //   })
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.anchor-class {
  display: flex;
  
}
.content {
  height: 2000px;
  width: 300px;
  background-color: red;
  margin-right: 20px;
}
#props {
  height: 30%;
  background-color: rgba(233,233,233, .7);
}
#slot {
  height: 40%;
  background-color: rgba(111,11,111, 1);
} 
</style>
