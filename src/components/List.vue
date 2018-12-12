<template>
  <div id="list" class="list">
    <MyHeader v-bind:cShow="pShow">列表</MyHeader>
    <div class="content" @scroll="scrollloadmore" ref="scroll">
      <ul>
        <router-link
          tag="li"
          :to="{name:'detail',params:{id:val.id}}"
          v-for="val in bookList"
          v-bind:key="val.id"
        >
          <img :src="val.imgurl" alt="图片">
          <div class="book_msg">
            <p>{{val.name}}</p>
            <p>{{val.msg}}</p>
            <p>{{val.price+"￥"}}</p>
            <button @click.stop="fo_deleBook(val.id)">删除</button>
          </div>
        </router-link>
      </ul>
      <div class="more" @click="clickloadmore">{{canmoreload?"加载更多":"加载完毕"}}</div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../base/MyHeader.vue";
import { getAllBooks, deleBook, pageBookList } from "../api/index.js";
export default {
  data: function() {
    return {
      pShow: false,
      bookList: [],
      bookMaxNum: 0,
      page: 1,
      canmoreload: true,
      scroll_timer: {}, //上拉刷新限流用的定时器
      islock: false, //防止重复加载
      scroll_touch_end_timer: {} //呈现弹性效果的定时器
    };
  },
  components: { MyHeader },
  created() {
    console.log("list created");
    // this.fo_getAllBooks();
    this.fo_pageBookList(1);
  },
  mounted() {
    //下拉刷新
    let start_y = 0;
    let move_y = 0;
    this.$refs.scroll.addEventListener("touchstart", event => {
      console.log("scroll" + this.$refs.scroll.scrollTop);
      if (this.$refs.scroll.scrollTop > 0) {
        return;
      }
      start_y = event.touches[0].clientY;
      console.log("start_y" + start_y);
          let touch_move = event => {
      console.log("touch_move");
      move_y = event.touches[0].clientY - start_y;
      console.log(
        "move_y1 " + event.touches[0].clientY + " start_y " + start_y
      );
      console.log("move_y2 " + move_y);
      if (move_y > 0) {
        if (move_y > 50) move_y = 50;
        this.$refs.scroll.style.top = move_y + 50 + "px";
      } else {
        console.log("remove");
        this.$refs.scroll.removeEventListener("touchmove", touch_move);
        this.$refs.scroll.removeEventListener("touchend", touch_end);
      }
    };
    let touch_end = event => {
      console.log("touch_end" + move_y);
      clearInterval(this.scroll_touch_end_timer);
      this.scroll_touch_end_timer = setInterval(() => {
        move_y -= 5;
        if (move_y < 0) move_y = 0;
        this.$refs.scroll.style.top = move_y + 50 + "px";
        if (move_y <= 0) {
          clearInterval(this.scroll_touch_end_timer);
          if (!this.islock) {
            this.page = 1;
            this.bookList = [];
            this.canmoreload = true;
            if (this.canmoreload)
              if (this.bookList.length < this.bookMaxNum) {
                this.islock = true;
                this.fo_pageBookList();
              } else {
                this.canmoreload = false;
              }
          }
        }
      }, 1);
    };
      this.$refs.scroll.addEventListener("touchmove", touch_move);
      this.$refs.scroll.addEventListener("touchend", touch_end);
    });

  },
  methods: {
    scrollloadmore() {
      //上拉刷新
      clearTimeout(this.scroll_timer);
      this.scroll_timer = setTimeout(() => {
        let c_height = this.$refs.scroll.clientHeight;
        let s_height = this.$refs.scroll.scrollHeight;
        let s_top = this.$refs.scroll.scrollTop;
        if (c_height + s_top + 50 >= s_height) {
          if (!this.islock) {
            if (this.canmoreload)
              if (this.bookList.length < this.bookMaxNum) {
                this.islock = true;
                this.fo_pageBookList();
              } else {
                this.canmoreload = false;
              }
          }
        }
      }, 30);
    },
    clickloadmore() {
      //手动点击加载更多
      if (this.canmoreload)
        if (this.bookList.length < this.bookMaxNum) {
          this.fo_pageBookList();
        } else {
          this.canmoreload = false;
        }
    },
    async fo_pageBookList() {
      await pageBookList(this.page).then(
        res => {
          this.islock = false;
          if (res.status == 200) {
            this.bookMaxNum = res.data.maxNum;
            this.page++;
            this.bookList = [...this.bookList, ...res.data.bookList];
            console.log(this.bookList);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    async fo_getAllBooks() {
      //一次性全部加载
      await getAllBooks().then(
        res => {
          if (res.status == 200) {
            this.bookList = JSON.parse(res.data);
          } else {
            this.bookList = [];
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    async fo_deleBook(id) {
      console.log("dele");
      await deleBook(id).then(
        res => {
          console.log(res);
          if (res.status == 200) {
            if (res.data.success)
              this.bookList = this.bookList.filter(
                item => item.id !== parseInt(id)
              );
            console.log(this.bookList);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style scoped lang="less">
.content {
  position: fixed;
  top: 50px;
  bottom: 50px;
  overflow: auto;
  width: 100%;
  .more {
    height: 30px;
    line-height: 30px;
    margin: 10px 10px 0px;
    background-color: skyblue;
    color: white;
    text-align: center;
  }
}
.content li {
  display: flex;
  flex-direction: row;
  font-weight: 700;
  color: black;
  font-size: 20px;
}
li .book_msg {
  word-wrap: break-word;
  overflow: hidden;
  order: 1;
  width: 100%;
}
li button {
  border: none;
  width: 80px;
  height: 25px;
  line-height: 25px;
  font-size: 17px;
  color: white;
  border-radius: 8px;
  background-color: skyblue;
}
</style>

