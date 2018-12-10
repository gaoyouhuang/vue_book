<template>
  <header  >
    <slot></slot>
    <i  v-if="cShow" v-on:click="goBack" class="iconfont icon-fanhui"></i>
  </header>
</template>

<script>
export default {
  name: 'myheader',
  props:{
    cShow:{
      type:Boolean,
      default:false,
    }
  },
  data:function(){
    return{}
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
    header{
        position: fixed;
        top: 0px;
        height: 50px;
        width: 100% ;
        text-align: center;
        font-size: 20px;
        line-height: 50px;
        background: skyblue;
    }
    i{
      position: absolute;
      left: 10px;
      font-size: 25px;
    }
</style>
