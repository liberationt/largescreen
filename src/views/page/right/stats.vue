<script setup lang="ts">
import { reactive, ref , onMounted} from "vue";
import icon1 from "@/assets/img/stas@2x.png";
import { currentGET } from "@/api";
const duration = ref(2);
const state = reactive({
  visitNum: 0,
  onlineNum: 0,
  activeNum: 0,
  scanNum: 0
});

onMounted(async () => {
 const res = await currentGET('readStats', {})
 const { data, code } = res
 if(code === 0) {
    const {visitNum, onlineNum, activeNum, scanNum} = data
    state.visitNum = visitNum
    state.onlineNum = onlineNum
    state.activeNum = activeNum
    state.scanNum = scanNum
 }
})
</script>
<template>
  <module-wrap title="读者数据" :icon="icon1" class="stats">
    <template #content>
      <div class="stats-content">
        <div class="stats-content-item">
          <div class="stats-content-item_top">
            <img src="@/assets/img/icon_count@2x.png" alt="" />
            <span class="stats-content-item_top_title">近90天累计扫码用户数</span>
          </div>
          <div class="stats-content-item_bottom">
            <count-up :endVal="state.scanNum" :duration="duration"></count-up>
          </div>
        </div>
        <div class="stats-content-item">
          <div class="stats-content-item_top">
            <img src="@/assets/img/icon_count@2x.png" alt="" />
            <span class="stats-content-item_top_title">访问读书人数</span>
          </div>
          <div class="stats-content-item_bottom">
            <count-up :endVal="state.visitNum" :duration="duration"></count-up>
          </div>
        </div>

        <div class="stats-content-item">
          <div class="stats-content-item_top">
            <img src="@/assets/img/icon_count@2x.png" alt="" />
            <span class="stats-content-item_top_title">近90天活跃用户数</span>
          </div>
          <div class="stats-content-item_bottom">
            <count-up :endVal="state.activeNum" :duration="duration"></count-up>
          </div>
        </div>
        <div class="stats-content-item">
          <div class="stats-content-item_top">
            <img src="@/assets/img/icon_count@2x.png" alt="" />
            <span class="stats-content-item_top_title">实时在线人数</span>
          </div>
          <div class="stats-content-item_bottom">
            <count-up :endVal="state.onlineNum" :duration="duration"></count-up>
          </div>
        </div>
      </div>
    </template>
  </module-wrap>
</template>
<style lang="scss" scoped>
.stats {
}
.stats-content {
  padding-bottom: 18px;
  height: 180px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  .stats-content-item {
    width: 140px;
    &:nth-child(1) {
      margin-top: 17px;
    }
    &:nth-child(2) {
      margin-top: 17px;
    }
    &:nth-child(3) {
      margin-top: 11px;
    }
    &:nth-child(4) {
      margin-top: 11px;
    }
    .stats-content-item_top {
      display: flex;
      align-items: center;
      img {
        width: 16px;
        height: 16px;
      }
      .stats-content-item_top_title {
        line-height: 18px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;
        font-weight: 400;
        margin-left: 8px;
        white-space: nowrap;
      }
    }
    .stats-content-item_bottom {
      padding-top: 8px;
      padding-left: 24px;
      ::v-deep(.countup-wrap) {
        line-height: 38px;
        color: rgba(100, 186, 227, 1);
        font-size: 32px;
        font-weight: 500;
        font-family: "HarmonyOS Sans";
        text-align: left;
      }
    }
  }
}
</style>
