<template>
  <module-wrap title="各年度收益图数量" :icon="icon3" class="category">
    <template #content>
      <div class="catergory-content">
        <my-charts class="chart" :height="height" :autoPlay="true" :option="vData.option" />
      </div>
    </template>
  </module-wrap>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import icon3 from "@/assets/image/movablePin.svg";
import * as echarts from "echarts";
import { currentGET } from "@/api";
// const dataInfo = reactive({
//     xData:[],
//     yData:[]
// })
const xData = ref()
const yData = ref()
var centerColorList = [ '#3BA1ED', '#F67071', '#3FDAA2', '#FD9442', '#78D8F8'];
var centerCgradientList = [ '#2695E7', '#EA5A5B', '#36C08E', '#E18741', '#27AEDA'];
let itemStyleColor = {
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      global: false,
      colorStops: [
        {
          offset: 0,
          color: 'red',
        },
        {
          offset: 0.5,
          color: 'red',
        },
        {
          offset: 0.5,
          color: 'pink',
        },
        {
          offset: 0.8,
          color: 'pink',
        },
      ]
    };
const height = ref('200')
const vData = reactive({
    list:[],
    option:{
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
    },
  grid: {
    left: '0%',
    right: '5%',
    top: '15%',
    bottom: '7%',
    containLabel: true
  },
  xAxis: {
    axisLabel: {
      color: "#64BAE3",
      fontSize: 14,
      interval: 0,
    },
    axisLine: {
        show: true,
        lineStyle: {
            color:"rgba(255,255,255,0.25)"
        }
    },
    axisTick: {
        show: false,
        length: 9,
        alignWithLabel: true,
        lineStyle: {
            color: '#7DFFFD'
        }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(31,99,163,.2)",
      },
    },
    data:xData,
    type: "category",
  },
  yAxis: {
        type: 'value',
        axisLine: {
            show: true,
            lineStyle: {
              color:"rgba(255,255,255,0.25)"
            }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(31,99,163,.2)",
          },
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            fontSize: 13,
            color:'#64BAE3'
        },
        boundaryGap: ['0%', '0%']
  },
  series: [
    {
      data: yData,
      type: "bar",
      barMaxWidth: "20",
      barWidth: 20,
      itemStyle: {
        color: function (params:any) {
          //  中间
            return new echarts.graphic.LinearGradient(
              0, 1, 1, 1,
              [
                  {offset: 0, color: centerColorList[params.dataIndex]},
                  {offset: 0.5, color: centerColorList[params.dataIndex]},
                  {offset: 0.5, color: centerCgradientList[params.dataIndex]},
                  {offset: 1, color: centerCgradientList[params.dataIndex]}
              ]
          )
        },
      },
      label: {
        show: true,
        position: "top",
        distance: 10,
        color:"#64BAE3"
      },
    },
    {
      data: [1, 1, 1, 1, 1, 1, 1, 1],
      type: "pictorialBar",
      barMaxWidth: "20",
      barWidth: 20,
      symbol: "diamond",
      symbolOffset: [0, "50%"],
      symbolSize: [20, 10],
      itemStyle: {
        
        //  底部
        color: function (params:any) {
          if (params.dataIndex > 4) return
          return new echarts.graphic.LinearGradient(0, 1, 1, 1,
           [
              {
                  offset: 0, color: centerColorList[params.dataIndex]             //指0%处的颜色
              },
              {
                  offset: 0.5, color: centerColorList[params.dataIndex]                //指0%处的颜色
              },
              {
                  offset: 0.5, color: centerCgradientList[params.dataIndex]                 //指100%处的颜色
              },
              {
                  offset: 1, color: centerCgradientList[params.dataIndex]                //指100%处的颜色
              }
            ], false)
        },
      },
    },
    {
      data: yData,
      type: "pictorialBar",
      barMaxWidth: "20",
      barWidth: 20,
      symbolPosition: "end",
      symbol: "diamond",
      symbolOffset: [0, "-50%"],
      symbolSize: [20, 12],
      zlevel: 2,
      itemStyle: {
        color: function (params:any) {
          //  头部
            var colorList = [ '#4EB4FF', '#FD7E7F', '#4AEFB3', '#FFB175', '#78D8F8'];
            return colorList[params.dataIndex]
        },
      },
    },
    {
      data: [1, 1, 1, 1, 1, 1, 1, 1],
      type: "pictorialBar",
      barMaxWidth: "20",
      barWidth: 20,
      symbol: "diamond",
      symbolOffset: [0, "50%"],
      symbolSize: [20, 10],
      zlevel: -2,
      itemStyle: {
        color: function (params:any) {
            var colorList = [ '#38ADEF', '#58E6B7', '#FA7375', '#FD9341', '#6BD6F8'];
            return colorList[params.dataIndex]
        },
      },
    },
  ],
}
});
onMounted(async () => {
  await currentGET("getBookCount", {}).then((res) => {
    xData.value = res.data.map((item:any)=>item.year)
    yData.value = res.data.map((item:any)=>item.bookCount)
  });
})
</script>
<style lang="scss" scoped>
.category {
  margin-top: 24px;
  height: 300px;
}
.catergory-content {
  padding-top: 4px;
//   padding-bottom: 46px;
  .chart {
    height: 205px;
    width: 100%;
  }
}
</style>
