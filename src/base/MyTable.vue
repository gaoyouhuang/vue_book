<template>
  <div id="mytable" class="mytable">
      <router-link to="/home" >
          <i class="iconfont icon-shouye"></i>
          <span>首页</span>
      </router-link>
      <router-link to="/list" class="border_left">
          <i class="iconfont icon-liebiao1"></i>
          <span>列表</span>    
      </router-link>
      <router-link to="/collection" class="border_left">
          <i class="iconfont icon-shoucang-tianchong"></i>
          <span>收藏</span>
      </router-link>
      <router-link to="/add" class="border_left">
          <i class="iconfont icon-tianjia-"></i>
          <span>添加</span>    
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'mytable'
}
</script>

<style scoped>
    .mytable{
        width: 100%;
        height: 50px;
        border-top: 1px solid black;
        position:fixed;
        bottom: 0px;
        display: flex;
    }
    .mytable a{
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        justify-content: center;
        color:rgba(0, 0, 0, 0.5);
    }
    .mytable a.router-link-active{
        color: red;
    }
</style>
