<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Category from "../components/category.vue";
import ConstitutePie from "../components/constitutePie.vue";

</script>
<template>
  <module-wrap title="" class="my-module-wrap">
    <template #content>
      <div class="title border-transparency">
        <div class="module-title title1">
          <div class="icon">
            <img src="@/assets/img/icon_earnings@2x.png" alt="" />
          </div>
          <div class="title-text">合作图书品类占比</div>
        </div>
        <div class="module-title title2">
          <div class="icon">
            <img src="@/assets/img/icon_constitute@2x.png" alt="" />
          </div>
          <div class="title-text">品类收益占比</div>
        </div>
      </div>
      <div class="my-content">
        <Category class="pie"/>
        <ConstitutePie  class="pie"/>
      </div>
    </template>
  </module-wrap>
</template>
<style lang="scss" scoped>
.my-module-wrap {
  margin-top: 34px;
}
.title {
  display: flex;
}
.module-title {
  padding: 16px 0;
  display: flex;
  align-items: center;
  width: 50%;
  .icon {
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .title-text {
    color: rgba(255, 255, 255, 1);
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    margin-left: 8px;
  }
}
.my-content {
  display: flex;
  box-sizing: border-box;
  .pie {
    flex: 1;
  }
}
</style>
