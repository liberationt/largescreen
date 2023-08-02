<script setup lang="ts">
import { reactive, onMounted } from "vue";
import icon from "@/assets/img/icon_vector.png";
import { currentPOST } from "@/api";

type itemType = {
  title: string,
  content: string[]
}
type stateType = {
  imgUrl: string,
  list: itemType[]
}
const state = reactive<stateType>({
  imgUrl: '',
  list: [],
});

onMounted(async () => {
  const res = await currentPOST('getFrImgList', {
    type: 1
  })
  const { code, data } = res
  if(code === 0) {
    const { imgUrl, titleAndContents } = data
    state.imgUrl = imgUrl
    state.list = titleAndContents
  }
  
})
</script>
<template>
  <module-wrap title="商品扫码体验" :icon="icon" class="module-wrap">
    <template #content>
      <div class="my-content">
        <div class="book-box" v-if="state.imgUrl">
          <img :src="state.imgUrl" alt="" />
        </div>
        <div class="intro-box">
          <div class="intro-item" v-for="(item, index) in state.list" :key="index">
            <div class="intro-item_title">{{ item.title }}</div>
            <div class="intro-item_desc">{{ item.content.join('') }}</div>
          </div>
        </div>
      </div>
    </template>
  </module-wrap>
</template>

<style lang="scss" scoped>
.my-content {
  padding: 16px 0;
  height: 433px;
  box-sizing: border-box;
}
.book-box {
  display: flex;
  height: 200px;
  width: 366px;
  img {
    width: 100%;
    height: auto;
  }
}
.intro-box {
  .intro-item {
    margin-top: 16px;
    .intro-item_title {
      font-weight: 700;
      font-size: 16px;
      line-height: 21px;
      color: #ffffff;
    }
    .intro-item_desc {
      margin-top: 8px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: rgba(255, 255, 255, 0.6);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; // 控制多行的行数
      -webkit-box-orient: vertical;
    }
  }
}
</style>
