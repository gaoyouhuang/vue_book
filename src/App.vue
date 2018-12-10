<template>
  <div id="app" class="app">
    <router-view></router-view>
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
</style>
