<template>
  <div id="home" class="home">
    <MyHeader v-bind:cShow="pShow">首页</MyHeader>
    <div class="content">
      <MySwiper v-bind:bannerList="bannerList"></MySwiper>
      <h2>热门图书</h2>
      <ul>
        <router-link tag="li" :to="{name:'detail',params:{id:val.id}}" v-for="(val) in hotBooklist" v-bind:key="val.id">
          <img :src="val.imgurl" alt="图片">
          <div>
            <b>{{val.name}}</b>
            <b>{{val.author+"   "+val.price+"￥"}}</b>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  import MyHeader from "../base/MyHeader.vue";
  import MySwiper from "../base/MySwiper.vue";
  import {getBannerList,getHotBooks} from "../api/index.js";
  export default {
    data:function(){
      return{
        pShow:false,
        bannerList:[],
        hotBooklist:[]
      }
    },
    components:{MyHeader,MySwiper},
    created(){
      console.log("home created");
       this.fo_getBannerList();
       this.fp_getHotBooks();
    },
    methods:{
      async fp_getHotBooks(){
        await getHotBooks().then(res=>{
            if(res.status==200)
              this.hotBooklist = res.data;
        },err=>{
            console.log(err);
        });
      },
      async fo_getBannerList(){
        await getBannerList().then(
          res=>{
            if(res.status==200){
              this.bannerList = res.data;
            } 
          },
          err=>{console.log(err)});
      }
    }
  }
</script>
<style scoped>
  .content{
    top: 50px;
    width: 100%;
    position: fixed;
    bottom: 50px;
    overflow: auto;
  } 
  .content h2{
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin :5px 0;
    border-top: 1px solid black;
    border-bottom: 1px solid black;

  }
  .content li{
    text-align: center;
    float: left;
    width: 50%;
    margin: 0 auto;
  }
</style>

