<template>
  <div id="list" class="list">
     <MyHeader v-bind:cShow="pShow">列表</MyHeader>
     <div class="content">
        <ul>
        <router-link tag="li" :to="{name:'detail',params:{id:val.id}}" v-for="val in bookList" v-bind:key="val.id">
          <img :src="val.imgurl" alt="图片">
          <div class="book_msg">
            <p>{{val.name}}</p>
            <p>{{val.msg}}</p>
            <p>{{val.price+"￥"}}</p>
            <button @click.stop="fo_deleBook(val.id)">删除</button>
          </div>
        </router-link>
      </ul>
     </div>
  </div>
</template>

<script>
  import MyHeader from "../base/MyHeader.vue";
  import {getAllBooks,deleBook} from "../api/index.js";
  export default {
    data:function(){
      return{
        pShow:false,
        bookList:[],
      }
    },
    components:{MyHeader},
    created(){
      this.fo_getAllBooks();
    },
    methods:{
      async fo_getAllBooks(){
        await getAllBooks().then(res=>{
          if(res.status==200){
              this.bookList = JSON.parse(res.data);
          }else{
              this.bookList=[];
          }
        },err=>{
          console.log(err);
        })
      },
      async fo_deleBook(id){
        console.log("dele");
        await deleBook(id).then(res=>{
          console.log(res);
          if(res.status==200){
            if(res.data.success)
              this.bookList = this.bookList.filter(item=>item.id!==parseInt(id))
              console.log(this.bookList);
          }
        },err=>{
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped>
  .content{
    position: fixed;
    top: 50px;
    bottom: 50px;
    overflow: auto;
    width: 100%;
  }
  .content li{
    display: flex;
    flex-direction: row;
    font-weight: 700;
    color: black;
    font-size: 20px;
  }
  li .book_msg{
    word-wrap: break-word;
    overflow: hidden;
    order: 1;
    width: 100%;
  }
  li button{
    border:none;
    width: 80px;
    height: 25px;
    line-height: 25px;
    font-size: 17px;
    color: white;
    border-radius: 8px;
    background-color: skyblue;
  }
</style>

