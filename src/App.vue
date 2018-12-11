<template>
  <div id="app" class="app">
    <transition name="fade">
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive"> </router-view>
      </keep-alive>
    </transition>
        <transition name="fade">
        <router-view v-if="!$route.meta.keepAlive"> </router-view>
    </transition>
    <myTable></myTable>
  </div>
</template>

<script>
  import MyTable from "./base/MyTable.vue"
  export default {
    name: 'App',
    components:{MyTable}
  }
</script>
<style>
  *{
    padding: 0;
    margin: 0;
  }
  ul,li{
    list-style: none;
  }
  a{
    text-decoration: none
  }
  .border_left{
    border-left: 1px solid black;
  }
  .app{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .fade-enter{
    opacity: 0;
  }
  .fade-enter-active{
    transition: all 1s linear;
  }
  .fade-leave-active{
    transition: all 1s linear;
    opacity: 0;
  }

</style>
