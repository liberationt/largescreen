<template>
  <div class="map">
    <div class="scroll">
      <span class="news">
        <img src="@/assets/img/news.png" />
      </span>
      <div class="scroll-item">
        <SeamlessScroll
          :list="state.dataOption"
          v-model="state.scroll"
          :singleHeight="state.defaultOption.singleHeight"
          :step="state.defaultOption.step"
          :limitScrollNum="state.defaultOption.limitScrollNum"
          :hover="state.defaultOption.hover"
          :singleWaitTime="state.defaultOption.singleWaitTime"
          :wheel="state.defaultOption.wheel"
        >
          <ul class="list">
            <li
              class="item_list"
              v-for="(item, i) in state.dataOption"
              :key="i"
            >
              {{ item.value }}
            </li>
          </ul>
        </SeamlessScroll>
      </div>
    </div>
    <div class="mapContent">
      <center-map />
      <!-- <MyCharts :option="vdata.option" /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
import CenterMap from "./center-map.vue";
import { currentGET } from "@/api";
const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
var data = [
  { name: "北京", value: 199 },
  { name: "天津", value: 42 },
  { name: "河北", value: 102 },
  { name: "山西", value: 81 },
  { name: "内蒙古", value: 47 },
  { name: "辽宁", value: 67 },
  { name: "吉林", value: 82 },
  { name: "黑龙江", value: 123 },
  { name: "上海", value: 24 },
  { name: "江苏", value: 92 },
  { name: "浙江", value: 114 },
  { name: "安徽", value: 109 },
  { name: "福建", value: 116 },
  { name: "江西", value: 91 },
  { name: "山东", value: 119 },
  { name: "河南", value: 137 },
  { name: "湖北", value: 116 },
  { name: "湖南", value: 114 },
  { name: "重庆", value: 91 },
  { name: "四川", value: 125 },
  { name: "贵州", value: 62 },
  { name: "云南", value: 83 },
  { name: "西藏", value: 9 },
  { name: "陕西", value: 80 },
  { name: "甘肃", value: 56 },
  { name: "青海", value: 10 },
  { name: "宁夏", value: 18 },
  { name: "新疆", value: 180 },
  { name: "广东", value: 123 },
  { name: "广西", value: 59 },
  { name: "海南", value: 14 },
  { name: "香港", value: 11 },
  { name: "澳门", value: 35 },
  { name: "台湾", value: 22 },
];
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 40,
    limitScrollNum: 1,
    singleWaitTime: 0,
  },
  type: 1,
  scroll: true,
  dataOption: [],
});
const vdata: any = reactive({});
onMounted(() => {
  currentGET("orderForm", {}).then((res) => {
    state.dataOption = res.data;
  });
});
</script>
<style scoped lang="scss">
.map {
  width: 100%;
}
.scroll {
  height: 50px;
  overflow: hidden;
  background: url("@/assets/img/ssbb.png") no-repeat center;
  background-size: 100% 100%;
  position: relative;
  padding: 12px 0;
  .scroll-item {
    overflow: hidden;
    height: 26px;
  }
}
.news {
  position: absolute;
  top: 14px;
  left: 20px;
  img {
    width: 25px;
    height: 25px;
  }
}
.list {
  overflow: hidden;
  .item_list {
    padding-left: 50px;
    font-size: 20px;
    color: rgba(100, 186, 227, 1);
    line-height: 40px;
  }
}
.mapContent {
}
</style>
