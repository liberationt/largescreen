<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import icon from "@/assets/img/icon_parther@2x.png";
import { Autoplay } from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import _ from "lodash";

// Import Swiper styles
import "swiper/css";
let imageList = [
  "https://oss.5rs.me/oss/uploadfe/png/c890abe19a351d132e4e98bfe5a13581.png",
  "https://oss.5rs.me/oss/uploadfe/png/2b9900099d527284e4358c0ebdad28b8.png",
  "https://oss.5rs.me/oss/uploadfe/png/8e7848351febf63f3e16eea2a6626e47.png",
  "https://oss.5rs.me/oss/uploadfe/png/2f3f17ca831aec26def1b36286926100.png",
  "https://oss.5rs.me/oss/uploadfe/png/84d023adda9a09c0e7463332cf4f3b3e.png",
  "https://oss.5rs.me/oss/uploadfe/png/d909eb7717715fe80599bdcfefbef558.png",
  "https://oss.5rs.me/oss/uploadfe/png/288a410fe7a9f1545efae9e9d4927b37.png",
  "https://oss.5rs.me/oss/uploadfe/png/d2d7978a4976e6456f13f20c9eb1afa4.png",
  "https://oss.5rs.me/oss/uploadfe/png/ccf08f20ff5a6ac152f457e47659e9f4.png",
  "https://oss.5rs.me/oss/uploadfe/png/f0a3fba3cc7960884921c77df1c3cdae.png",
  "https://oss.5rs.me/oss/uploadfe/png/2e438f4d365752531b3b39292b3aa3d5.png",
  "https://oss.5rs.me/oss/uploadfe/png/ff004e7294defd49183169d014199872.png",

  "https://oss.5rs.me/oss/uploadfe/png/bbd1c57624fd184e227190f27eba48a1.png",
  "https://oss.5rs.me/oss/uploadfe/png/3bc4d2b41e8bb53174319bdf1c220ded.png",
  "https://oss.5rs.me/oss/uploadfe/png/02a49b81d2fe51d77055160553f22bc4.png",
  "https://oss.5rs.me/oss/uploadfe/png/89d49d2725f35c04be00f34e6ae78c2a.png",
  "https://oss.5rs.me/oss/uploadfe/png/978b12047f37039465cc0584d92c70a3.png",
  "https://oss.5rs.me/oss/uploadfe/png/b24677c0443db7b739fc9386e44934ff.png",
  "https://oss.5rs.me/oss/uploadfe/png/e7de23ad9db04bd7d9c15feda99d7902.png",
  "https://oss.5rs.me/oss/uploadfe/png/eca3a45b4ba326dfb0ffbb2f32d0e5ab.png",
  "https://oss.5rs.me/oss/uploadfe/png/5a2bf02679bcd82bd50322376d326df2.png",
  "https://oss.5rs.me/oss/uploadfe/png/bf06342d7ef3c9031f82d48ca578f6e8.png",
  "https://oss.5rs.me/oss/uploadfe/png/23da94bf36299b43c3d9dd2ccf50fe6e.png",
  "https://oss.5rs.me/oss/uploadfe/png/4d4b02ed256b5e6805f047951ced9126.png",

  "https://oss.5rs.me/oss/uploadfe/png/2e4694f99713df320f02b53d3d4a78a3.png",
  "https://oss.5rs.me/oss/uploadfe/png/db112eb8ac67cd3f995d97a0f980aae2.png",
  "https://oss.5rs.me/oss/uploadfe/png/29ca7db4ffad9b54a9b1616280f84eca.png",
  "https://oss.5rs.me/oss/uploadfe/png/2be016a33c704a2bb5f212235bda138b.png",
  "https://oss.5rs.me/oss/uploadfe/png/5ab19acfbf4206460883c86da124863a.png",
  "https://oss.5rs.me/oss/uploadfe/png/52647533b97e350a821ee81643b2f970.png",
  "https://oss.5rs.me/oss/uploadfe/png/2419bbd5a4d0254623d3abd97b2fe9fb.png",
  "https://oss.5rs.me/oss/uploadfe/png/4e71bd671930a9c340d2912b9d6c1f9e.png",
  "https://dcg-c-system.obs.cn-east-3.myhuaweicloud.com/data-borad/68f46b3907164fb88cd845931052d084/logo-qingdao.png",
  "https://dcg-c-system.obs.cn-east-3.myhuaweicloud.com/data-borad/0d06a123d62a4b4db6ac822b66b5cc20/logo-reader.png",
  "https://dcg-c-system.obs.cn-east-3.myhuaweicloud.com/data-borad/be8e779a2b3640458016c1804f983808/logo-tianjin.png",
  "https://dcg-c-system.obs.cn-east-3.myhuaweicloud.com/data-borad/979e719d1359486da169e29a94edaaa8/logo-young.png",
];
const swiperRef = ref<any>(null);
const state = reactive({
  modules: [Autoplay],
  list: [],
});

const dealList = () => {
  const list = imageList.sort(function () {
    return Math.random() - 0.5;
  });
  state.list = _.chunk(list, 12);
};

onMounted(() => {
  dealList();
});
</script>

<template>
  <module-wrap title="合作伙伴" :icon="icon" class="category">
    <template #content>
      <div class="my-content">
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
          :modules="state.modules"
          class="my-swiper"
        >
          <swiper-slide
            v-for="(item, index) in state.list"
            :key="`slide-item${index}`"
            class="my-swiper-slide"
          >
            <div
              class="img-wrap"
              v-for="(img, j) in item"
              :key="`img-${index}-${j}`"
            >
              <img :src="img" alt="" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </template>
  </module-wrap>
</template>
<style scoped lang="scss">
.category {
  margin-top: 24px;
  .my-content {
    height: 507px;
    padding-top: 16px;
    box-sizing: border-box;
  }
  ::v-deep(.swiper-slide) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .img-wrap {
    display: flex;
    margin-bottom: 12px;
    img {
      width: 172px;
      height: auto;
    }
  }
}
</style>
