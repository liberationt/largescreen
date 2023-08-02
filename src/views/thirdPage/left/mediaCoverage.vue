<template>
  <module-wrap title="媒体报道" :icon="icon3" class="category">
    <template #content>
      <swiper
          :spaceBetween="30"
          :centeredSlides="true"
          :loop="true"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :modules="vData.modules"
          class="my-swiper"
        >
          <swiper-slide
            v-for="(item, index) in vData.list"
            :key="`slide-item${index}`"
            class="my-swiper-slide catergory-content"
          >
            <div class="container"
              v-for="(element, j) in item"
              :key="`img-${index}-${j}`">
              <img class="img" :src="element.imageUrl" alt="">
              <div class="title">{{ element.title }}</div>
              <!-- <div class="detail">{{ element.content }}</div> -->
              <div class="date">{{ element.createTime }}</div>
            </div>
          </swiper-slide>
        </swiper>
    </template>
  </module-wrap>
</template>
<script setup lang="ts">
import { reactive, onMounted} from "vue";
import icon3 from "@/assets/image/media.svg";
import { Autoplay } from "swiper";
import { currentGET } from "@/api"
import { Swiper, SwiperSlide } from "swiper/vue";
import _ from "lodash";

const vData = reactive({
  modules: [Autoplay],
  list:[]
})
onMounted(() => {
  currentGET('getMediaCoverage',{type: 1}).then(res=>{
    vData.list = _.chunk(res.data, 2);
  })
})
</script>
<style lang="scss" scoped>
.category {
  height: 100%;
}
.container {
  padding-top: 16px;
  padding-bottom: 48px;
  .img {
    width: 100%;
    height: 229px;
  }
  .title {
    padding-top: 16px;
    font-weight: 700;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; // 控制多行的行数
    -webkit-box-orient: vertical;
    margin: 4px 0 20px;
    color: #fff;
  }
  .detail {
    margin: 8px 0 12px;
    font-size: 14px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; // 控制多行的行数
    -webkit-box-orient: vertical;
  }
  .date {
    font-size: 14px;
    line-height: 18px;
    color: rgba(255, 255, 255, 0.6);
  }
}
.catergory-content:nth-child(2) {
  padding-bottom: 10px;
}

</style>
