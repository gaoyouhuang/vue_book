<template>
  <div  id="collection" class="collection">
     <MyHeader v-bind:cShow="pShow">收藏</MyHeader>
     <div class="content">
       <ul>
       <li v-for="(val,index) in listdata" v-bind:key = "index">
         <img  :src="val.imgurl" alt="">
         <div>
           <p>{{val.name}}</p>
            <i class="iconfont icon-shoucang-tianchong collection" 
            v-bind:class="{iscollection:val.isCollection,isnotcollection:!val.isCollection}" @click="fo_changecollection(val)">收藏状态</i>
         </div>
       </li>
     </ul>
     </div>
  </div>
</template>

<script>
  import MyHeader from "../base/MyHeader.vue";
  import {colloectionlist,changecollection} from "../api/index.js";
  export default {
    data:function(){
      return{
        pShow:false,
        listdata:[],
      }
    },
    created(){
      console.log("collection created");
      this.fo_colloectionlist();
    },
    components:{MyHeader},
    methods:{
      async fo_changecollection(changeitem){
        await changecollection(changeitem.id,!changeitem.isCollection).then(res=>{
            console.log(res.data);
            if(res.status==200)
              if(res.data.success)
                this.fo_colloectionlist();
                // this.listdata = this.listdata.filter(item=>item.id!==changeitem.id);
        },err=>{
          console.log(err);
        });
      },
      async fo_colloectionlist(){
        await colloectionlist().then(res=>{
          if(res.status==200)
            console.log(res.data);
            this.listdata = res.data;
        },err=>{
          console.log(err);
        })
      }
    },
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
  }
  .iscollection{
    color: red;
  }
  .isnotcollection{
    color: black;
  }
</style>

