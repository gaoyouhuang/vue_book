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
      <div class="more" @click ="loadmore">{{canmoreload?"加载更多":"加载完毕"}}</div>
     </div>
  </div>
</template>

<script>
  import MyHeader from "../base/MyHeader.vue";
  import {getAllBooks,deleBook,pageBookList} from "../api/index.js";
  export default {
    data:function(){
      return{
        pShow:false,
        bookList:[],
        bookMaxNum:0,
        page:1,
        canmoreload:true,
      }
    },
    components:{MyHeader},
    created(){
      console.log("list created");
      // this.fo_getAllBooks();
      this.fo_pageBookList(1);
    },
    methods:{
      loadmore(){
        if(this.canmoreload)
          if(this.bookList.length<this.bookMaxNum)
            {
              this.fo_pageBookList();
            }
          else{
            this.canmoreload = false;
          }
      },
      async fo_pageBookList(){
        await pageBookList(this.page).then(res=>{
          if(res.status==200){
            console.log(res.data)
            this.bookMaxNum = res.data.maxNum;
            this.page++;
            this.bookList = [...this.bookList,...res.data.bookList];
          }
        },err=>{
          console.log(err);
        })
      },
      async fo_getAllBooks(){//一次性全部加载
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
<style scoped lang="less">
  .content{
    position: fixed;
    top: 50px;
    bottom: 50px;
    overflow: auto;
    width: 100%;
    .more{
      height: 30px;
      line-height: 30px;
      margin: 10px 10px 0px;
      background-color: skyblue;
      color: white;
      text-align: center;
    }
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

