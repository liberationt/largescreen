<template>
  <module-wrap title="资源营收TOP5" :icon="icon3" class="category">
    <template #content>
      <div class="catergory-content">
        <my-charts :autoPlays="false" class="chart" :height="height" :option="option" />
      </div>
    </template>
  </module-wrap>
</template>
<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import icon3 from "@/assets/image/revenue.svg";
import * as echarts from "echarts";
import { currentPOST } from "@/api";

const vData = reactive({
    list:[]
});
const option = ref({});
const height = ref('200')

var charts = {
  // 按顺序排列从大到小
  cityList: [],
  cityData: [],
};
onMounted(async () => {
  await currentPOST("getFrTopBook", {type:'2'}).then((res) => {
    if (res.code == 0) {
      vData.list = res.data || []
    } else {
      vData.list = []
    }
    charts.cityList = res.data.map((item:any) => item.bookName)
    charts.cityData = res.data.map((item:any) => item.gmv)
    setOption(res.data);
  });
})
const setOption =async (newData: any) => {
  let dataList = [
    charts.cityList,
    charts.cityData,
  ];

let barWidth = 20;
let labelPositionY = -60;

let colors = [
['#38ADEF','#38ADEF','#38ADEF','#38ADEF'],
['#53E9B3','#53E9B3','#53E9B3','#53E9B3'],
['#FF8A8A','#FF8A8A','#FF8A8A','#FF8A8A'],
['#FFB175','#FFB175','#FFB175','#FFB175'],
['#78D8F8','#78D8F8','#78D8F8','#78D8F8'],
];

let seriesDatas:any = [];
let seriesDatasLeft:any = [];
let seriesDatasRight:any = [];
dataList[0].forEach((item,index)=>{
    let color = colors[index]
    let itemStyleColor = {
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      type: 'linear',
      global: false,
      colorStops: [
        {
          offset: 0,
          color: color[0],
        },
        {
          offset: 0.5,
          color: color[1],
        },
        {
          offset: 0.5,
          color: color[2],
        },
        {
          offset: 1,
          color: color[3],
        },
      ]
    };
    let data = {
        name:item,
        value:dataList[1][index],
        itemStyle: {
            color: itemStyleColor
        },
        label: {
            rich: {
                cc:{
                    color:color[3]
                }
            },
        }
    };
    let dataLeft = {
        name:item,
        value:1,
        itemStyle: {
            color: itemStyleColor
        }
    };
    let dataRight = {
        name:item,
        value:dataList[1][index],
        itemStyle: {
             color: color[3]
        }
    };
    seriesDatas.push(data);
    seriesDatasLeft.push(dataLeft);
    seriesDatasRight.push(dataRight);
})


option.value = {
  backgroundColor: '',
  grid: {
    borderWidth: 0,
    top: "10px",
    left: "10px",
    right: "25%",
    bottom: "0%",
  },
  xAxis: [
    {
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#B5B5B5',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#5c6368'],
          width: 2,
          type: 'dotted',
        },
      },
      axisLabel: {
        show: false,
        fontFamily: 'agencyr',
        color: '#FFF',
        fontSize: 12,
      },
    },
  ],
  yAxis: [
      {
        type: "category",
        inverse: true,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          inside: false,
        },
        data: dataList[1],
      },
      {
        type: "category",
        inverse: true,
        axisTick: "none",
        axisLine: "none",
        show: true,
        axisLabel: {
          color: "#ffffff",
          fontSize: "16",
          fontWeight:700,
         
          formatter: function (val:any) {
            return `${val}万`;
          },
        },
        data: dataList[1],
      },
    ],
  series: [
    {
      name: '柱1',
      type: 'bar',
      barWidth: barWidth,
      z: 11,
      label: {
        show: true,
        color:'#fff',
        position: [0, "-24px"],
        formatter:['{bb|{b}  }'].join(''),
        rich:{
            bb:{
                color:'#fff',
                fontSize: 12,
                fontFamily: 'agencyr',
                fontWeight:600
            },
        }
      },
      data: seriesDatas,
    },
    {
      name: '顶1',
      type: 'pictorialBar',
      symbol: 'diamond',
      symbolSize: [barWidth / 2, barWidth],
      symbolOffset: [barWidth / 4, 0],
      symbolPosition: 'end',
      z: 12,
      data: seriesDatasRight,
    },
    {
      name: '底',
      type: 'pictorialBar',
      symbol: 'diamond',
      symbolSize: [barWidth / 2, barWidth],
      symbolOffset: [-barWidth / 4, 0],
      z: 1,
      data: seriesDatasLeft,
    },
  ],
};

}

</script>
<style lang="scss" scoped>
.catergory-content {
  padding-top: 4px;
  .chart {
    width: 100%;
    height: 340px;
  }
}
</style>
