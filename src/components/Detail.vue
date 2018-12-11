<template>
  <div id="item_detil" class="item_detil">
     <MyHeader v-bind:cShow="pShow">详情页</MyHeader>
     <div class="content">
       <ul>
         <li>
            <img :src="item_data.imgurl">
            <i class="iconfont icon-shoucang-tianchong collection" 
            v-bind:class="showcollection" @click="fo_changecollection">收藏状态</i>
            
         </li>
         <li>
            <label for="name">书名</label>
            <input type="text" id="name" v-model="item_data.name">
         </li>
         <li>
            <label for="author">作者</label>
            <input type="text" id="author" v-model="item_data.author">
         </li>
         <li>
            <label for="price">价格</label>
            <input type="text" id="price" v-model="item_data.price">
         </li>
         <li>
            <label for="msg">介绍</label>
            <input type="text" id="msg" v-model="item_data.msg">
         </li>
       </ul> 
       <button @click="fo_putsavebook">保存</button>   
     </div>
  </div>
</template>

<script>
  import MyHeader from "../base/MyHeader.vue";
  import {getDetail,putsavebook,changecollection} from "../api/index.js";

  export default {
    name:"detail",
    watch:{
      $route:function(newdata,olddata){
        this.fo_getDetail(newdata.params.id)
      }
    },
    data:function(){
      return{
        pShow:true,
        item_data:{},
      }
    },
    components:{MyHeader},
    created(){
      this.fo_getDetail(this.$route.params.id)
    },
    methods:{
      async fo_changecollection(){
        await changecollection(this.item_data.id,!this.item_data.isCollection).then(res=>{
          if(res.status==200){
            if(res.data.success){
              this.item_data.isCollection = res.data.isCollection;
              console.log(this.item_data);
            }else{
            }
          }
        },err=>{

        });
      },
      async fo_getDetail(id){
        console.log(id);
        await getDetail(id).then(res=>{
          if(res.status==200){
            this.item_data = res.data;
          }
        },err=>{
          console.log(err);
        })
      },
      async fo_putsavebook(){
        await putsavebook(this.item_data).then(res=>{
          if(res.status==200){
              if(res.data.success){
                this.$router.go(-1);
              }else{
                
              }
          }
        },err=>{
          console.log(err);
        })
      }
    },
    computed:{
      showcollection(){
        return{
          iscollection:this.item_data.isCollection,
          isnotcollection:!this.item_data.isCollection
        }
      }
    }
  }
</script>
<style scoped>
  .content{
    width: 100%;
    height: 100%;
    position: fixed;
    top:50px;
    z-index: 999;
    background-color: white;
    text-align: center;
  }
  .content li {
    margin-top: 10px;
    font-size: 18px;
  }
  .content li label{
    height: 30px;
    line-height: 30px;
  }
  .content li input{
    padding: 0 5px;
    border:1px solid black;
    height: 30px;
    line-height: 30px;
  }
  .content button{
     border:none;
    width: 80px;
    height: 25px;
    line-height: 25px;
    font-size: 17px;
    color: white;
    border-radius: 8px;
    background-color: skyblue;
    margin-top: 30px;
  }
  .content li .collection{
    vertical-align:top;
    display: inline-block;
  }
  .iscollection{
    color: red;
  }
  .isnotcollection{
    color: black;
  }
</style>

