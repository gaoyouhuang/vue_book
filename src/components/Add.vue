<template>
  <div id="item_detil" class="item_detil">
     <MyHeader v-bind:cShow="pShow">添加</MyHeader>
     <div class="content">
       <ul>
         <li>
            <img :src="item_data.imgurl">
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
         <li>
             <label for="imgfile">图片</label>
             <input type="text" id="imgfile" v-model="item_data.imgurl" >
         </li>
       </ul> 
       <button @click="fo_postAddBook">添加</button>   
     </div>
  </div>
</template>

<script>
  import MyHeader from "../base/MyHeader.vue";
  import {postAddBook} from "../api/index.js";

  export default {
    watch:{
      $route:function(newdata,olddata){
        this.fo_getDetail(newdata.params.id)
      }
    },
    data:function(){
      return{
        pShow:false,
        item_data:{},
      }
    },
    components:{MyHeader},
    created(){
    },
    methods:{
      async fo_postAddBook(){
        if(!this.item_data.name||!this.item_data.price||
        !this.item_data.msg||!this.item_data.author||
        !this.item_data.imgurl){
          alert("请填写完成的信息");
          return;
        }
        this.item_data.isCollection = false;
        await postAddBook(this.item_data).then(res=>{
          if(res.status==200){
              if(res.data.success){
                this.$router.push("/list");
              }else{
              }
          }
        },err=>{
          console.log(err);
        })
      }
    },
    computed:{
    }
  }
</script>
<style scoped>
  .content{
    width: 100%;
    height: 100%;
    position: fixed;
    top:50px;
    bottom: 50px;
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

