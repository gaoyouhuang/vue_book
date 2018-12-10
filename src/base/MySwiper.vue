<template>
  <swiper :options="swiperOption" class="swiper-box">
    <swiper-slide class="swiper-item"  v-for="(val,index) in bannerList" v-bind:key="index"><img :src="val" alt="">   </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    props:{
        bannerList:{
            type:Array,
            default:[1,2,3,4,5]
        }
    },  
    data() {
      return {
        swiperOption: {
          slidesPerView: 1,//同时显示几个sildes
          // spaceBetween: 30,//每一个slides之间的间距
          mousewheel: true,//鼠标滚动有效
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          loop : true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,//到最后一张图 是否要停止 false不停止(loop模式下无效)
            disableOnInteraction: false,//操作swiper之后要不要停止轮播 false不停止
          },
        },
      }
    }
  }
</script>

<style scoped>
  .swiper-box {
    width: 100%;
    height: 200px;
    margin: 0 auto;
  }
  .swiper-item {
    height: 200px;
    width: 100%;
    text-align: center;
    font-size: 18px ;
  }
  .swiper-slide img {
    width: 100%;
    height: 200px;
  }
</style>