<script setup lang="ts">
import { ref, reactive, nextTick,onUnmounted } from "vue";
import { currentGET, GETNOBASE } from "@/api";
import { registerMap, getMap } from "echarts/core";
import { optionHandle, regionCodes } from "./center.map";
import type { MapdataType } from "./center.map";
const option = ref({});
const centerMapRef = ref()
const code = ref("china"); //china 代表中国 其他地市是行政编码
const vData:any = reactive({
  timer:null,
  dataList:[]
})
withDefaults(
  defineProps<{
    // 结束数值
    title?: number | string;
  }>(),
  {
    title: "地图",
  }
);

const dataSetHandle = async (regionCode: string, list: object[]) => {
  vData.dataList = list
  const geojson: any = await getGeojson(regionCode);
  let cityCenter: any = {};
  let mapData: MapdataType[] = [];
  //获取当前地图每块行政区中心点
  geojson.features.forEach((element: any) => {
    cityCenter[element.properties.name] =
      element.properties.centroid || element.properties.center;
  });
  //当前中心点如果有此条数据中心点则赋值x，y当然这个x,y也可以后端返回进行大点，前端省去多行代码
  list.forEach((item: any) => {
    if (cityCenter[item.name]) {
      mapData.push({
        name: item.name,
        value: cityCenter[item.name].concat(item.value),
      });
    }
  });
  await nextTick();

  option.value = optionHandle(regionCode, list, mapData);

  nextTick(()=>{
    let chart = centerMapRef.value
    let index = 0
    chart.dispatchAction({
      type: "hideTip",
      seriesIndex: 0,
      dataIndex: index,
    });
    // 显示提示框
    chart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index + 1,
    });
    // 取消高亮指定的数据图形
    chart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: index,
    });
    chart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: index + 1,
    });
    index++;
    if (index > 34) {
      index = -1;
    }
    handleHeight()
  })

};
const handleHeight = ()=>{
  let chart = centerMapRef.value
  let index = 1;
  vData.timer = setInterval(()=>{
    chart.dispatchAction({
    type: "hideTip",
    seriesIndex: 0,
    dataIndex: index,
  });
  // 显示提示框
  chart.dispatchAction({
    type: "showTip",
    seriesIndex: 0,
    dataIndex: index + 1,
  });
  // 取消高亮指定的数据图形
  chart.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
    dataIndex: index,
  });
  chart.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    dataIndex: index + 1,
  });
  index++;
  // console.log(vData.dataList)
  if(vData.dataList&&vData.dataList.length){
    if (index >= vData.dataList.length-1) {
      index = 0;
      // chart.dispatchAction({
      //   type: "highlight",
      //   seriesIndex: 0,
      //   dataIndex: vData.dataList.length-1,
      // });
      setInterval(()=>{
        chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: vData.dataList.length-1,
        });
      },2000)
    }
  }
  },2000)
  
}
const getData = async (regionCode: string) => {
  // currentGET("centerMap", { regionCode: regionCode }).then((res) => {
  //   console.log("设备分布", res);
  //   if (res.success) {
  //     dataSetHandle(res.data.regionCode, res.data.dataList);
  //   }
  // });
  currentGET('getMap',{}).then((res:any)=>{
    let dataList:any = []
    for(let key in res.data){
      dataList.push({
        name:key,
        value:res.data[key]
      })
    }
    dataSetHandle(regionCode,dataList);
  })
};
const getGeojson = (regionCode: string) => {
  return new Promise<boolean>(async (resolve) => {
    let mapjson = getMap(regionCode);
    if (mapjson) {
      mapjson = mapjson.geoJSON;
      resolve(mapjson);
    } else {
      mapjson = await GETNOBASE(`map-geojson/${regionCode}.json`).then(
        (data) => data
      );
      code.value=regionCode
      registerMap(regionCode, {
        geoJSON: mapjson as any,
        specialAreas: {},
      });
      resolve(mapjson);
    }
  });
};
getData(code.value);
onUnmounted(()=>{
  clearInterval(vData.timer)
  vData.timer = null
})
const mapClick = (params: any) => {
  // console.log(params);
  // let xzqData = regionCodes[params.name];
  // if (xzqData) {
  //   getData(xzqData.adcode);
  // } else {

  //   window["$message"].warning("暂无下级地市")
  // }
};
</script>

<template>
  <div class="centermap">
    <!-- <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">{{ title }}</span>
      <div class="you"></div>
    </div> -->
    <div class="mapwrap">
      <div class="quanguo" @click="getData('china')" v-if="code !== 'china'">
        中国
      </div>
      <v-chart
        class="chart"
        :option="option"
        ref="centerMapRef"
        @click="mapClick"
        v-if="JSON.stringify(option)!='{}'"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.centermap {
  // margin-bottom: 30px;
  height:500px;
  .mapwrap {
    height: 500px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

    .quanguo {
      position: absolute;
      right: 20px;
    //   top: -46px;
      top: 0;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5),
        0 0 6px rgba(0, 237, 237, 0.4);
        z-index: 10;
    }
  }
}
</style>
