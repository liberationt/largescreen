<script setup lang="ts">
import { defineProps } from "vue";
const props = withDefaults(
  defineProps<{
    title?: string;
    icon?: string;
  }>(),
  {
    icon: "",
    title: "",
  }
);
</script>
<template>
  <div class="module-wrap">
    <div class="content">
      <div class="border-top"></div>
      <div class="border-bottom"></div>
      <div class="border-left"></div>
      <div class="border-right"></div>
      <div class="module-title border-transparency" v-if="title">
        <div class="icon">
          <img :src="icon" alt="" />
        </div>
        <div class="title-text">{{ title }}</div>
      </div>
      <div class="module-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$border-width: 2px;
.module-wrap {
  position: relative;
  box-sizing: border-box;
  padding: 12px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #64bae3 0%, rgba(100, 186, 227, 0) 50%)
        left top no-repeat,
      linear-gradient(135deg, #64bae3 0%, rgba(100, 186, 227, 0) 50%) left top
        no-repeat,
      linear-gradient(135deg, #64bae3 0%, rgba(100, 186, 227, 0) 50%) right top
        no-repeat,
      linear-gradient(-45deg, #64bae3 0%, rgba(100, 186, 227, 0) 50%) right top
        no-repeat,
      linear-gradient(-45deg, #64bae3 0%, rgba(100, 186, 227, 0) 50%) left
        bottom no-repeat,
      linear-gradient(135deg, #64bae3 0%, rgba(100, 186, 227, 0) 50%) left
        bottom no-repeat,
      linear-gradient(-45deg, #64bae3 0%, rgba(100, 186, 227, 0) 50%) right
        bottom no-repeat,
      linear-gradient(-45deg, #64bae3 0%, rgba(100, 186, 227, 0) 50%) right
        bottom no-repeat;
    background-size: $border-width 96px, 96px $border-width, $border-width 96px,
      96px $border-width;
  }
  .content {
    border-radius: 2px;
    opacity: 1;
    background: rgba(11, 81, 204, 0.1);
    backdrop-filter: blur(120px);
    padding: 0 20px;
    .border-top {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 2px;

      background: linear-gradient(
        90deg,
        rgba(100, 186, 227, 0) 0.15%,
        rgba(255, 255, 255, 0) 0.15%,
        rgba(228, 246, 255, 0.5) 49.11%,
        rgba(255, 255, 255, 0) 100.15%
      );
    }
    .border-bottom {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: linear-gradient(
        90deg,
        rgba(100, 186, 227, 0) 0.15%,
        rgba(255, 255, 255, 0) 0.15%,
        rgba(228, 246, 255, 0.5) 49.11%,
        rgba(255, 255, 255, 0) 100.15%
      );
    }
    .border-left {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      width: 2px;

      background: linear-gradient(
        180deg,
        rgba(100, 186, 227, 0) 0.15%,
        rgba(255, 255, 255, 0) 0.15%,
        rgba(228, 246, 255, 0.5) 49.11%,
        rgba(255, 255, 255, 0) 100.15%
      );
    }

    .border-right {
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      width: 2px;

      background: linear-gradient(
        180deg,
        rgba(100, 186, 227, 0) 0.15%,
        rgba(255, 255, 255, 0) 0.15%,
        rgba(228, 246, 255, 0.5) 49.11%,
        rgba(255, 255, 255, 0) 100.15%
      );
    }
  }
  .module-title {
    padding: 16px 0;
    display: flex;
    align-items: center;
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
  .module-content {
  }
}
</style>
