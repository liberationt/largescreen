<template>
  <div class="header">
    <div class="headerTop">
      <div class="logo" @click="screen">
        <img src="@/assets/img/logo.png" alt="" />
      </div>
      <div class="text">
        <img src="@/assets/img/bt.png" alt="" />
      </div>
      <div class="timer">
        <span>{{ dateData.dateDay }}</span>
        <span class="dataTime">{{ dateData.timing }}</span>
      </div>
    </div>
    <div class="bg">
      <img src="@/assets/img/zs.png" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import dayjs from "dayjs";
import screenfull from 'screenfull'

const dateData: any = reactive({
  dateDay: "",
  dateYear: "",
  timing: null,
});
const screen = ()=>{
  screenfull.toggle()
}
const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateDay = dayjs().format("YYYY-MM-DD");
    dateData.timing = dayjs().format("HH:mm:ss");
  }, 1000);
};
timeFn();
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  .headerTop {
    display: flex;
    width: 100%;
    height: 92px;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(180deg, #1c6cf5 0%, rgba(20, 84, 193, 0) 100%);
  }
  .logo {
    margin-top: 28px;
    display: flex;
    img {
      width: 106px;
      height: 40px;
    }
  }
  .text {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 20px;
    img {
      width: 442px;
      height: 78px;
    }
  }
  .bg {
    display: flex;
    img {
      width: 100%;
      height: auto;
    }
  }
  .timer {
    font-size: 20px;
    font-family: 'YouSheBiaoTiHei';
    margin-top: 35px;
    display: flex;
    color: rgba(255, 255, 255, 0.8);
    width: 240px;
  }
  .dataTime {
    color: #5afc9a;
    margin-left: 12px;
  }
}
</style>
