<template>
  <module-wrap title="近7天成交量" :icon="icon3" class="category">
    <template #content>
      <div class="catergory-content">
        <!-- <div class="title">
          <div>
            <span class="colorBlock"></span>
            <span>扫码</span>
          </div>
          <div>
            <span class="colorBlock payColorBlock"></span>
            <span>支付</span>
          </div>
        </div> -->
        <my-charts class="chart" :height="height" :option="option" />
      </div>
    </template>
  </module-wrap>
</template>
<script setup lang="ts">
import { ref,onMounted} from "vue";
import { currentGET } from "@/api";
import {graphic} from "echarts/core"
import icon3 from "@/assets/image/userDeal.svg";

const option = ref({});
const height = ref('180')
const getData = () => {
  currentGET("getFrSvndaysDeal", {}).then((res) => {
    if (res.code == 0) {
      let list:any = res.data || []
      let daysList = list.map((item:any) => item.days)  //  日期
      // let payUsersList = list.map((item:any) => item.payUsers) //  支付
      // let scanUsersList = list.map((item:any) => item.scanUsers) //  支付
      let counts = list.map((item:any) => item.count) //近七日成交量
      setOption(daysList, counts);
    } else {
      window["$message"]({
        text: res.msg,
        type: "warning",
      });
    }
  });
};
const setOption =async (xData:any[], yData:any[], yData2?:any[]) => {
  option.value = {
        xAxis: {
          type: "category",
          data: xData,
          boundaryGap: false, // 不留白，从原点开始
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            // show:false,
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            show: true,
            color: "#7EB7FD",
            fontWeight: "500",
            interval: 0,//使x轴文字显示全
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
        },
        grid: {
          //布局
          show: true,
          left: "0px",
          right: "30px",
          bottom: "10px",
          top: "10px",
          containLabel: true,
          borderColor: "#1F63A3",
        },
        series: [
          {
            data: yData,
            type: "line",
            smooth: true,
            symbol: "none", //去除点
            name: "报警1次数",
            color: "rgba(18,138,222,1)",
            areaStyle: {
                //右，下，左，上
                color: new graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(18,138,222,1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(14,156,255,0)",
                    },
                  ],
                  false
                ),
            },
            markPoint: {
              data: [
                {
                  name: "最大值",
                  type: "max",
                  valueDim: "y",
                  symbol: "rect",
                  show:false,
                  symbolSize: [60, 26],
                  symbolOffset: [0, -20],
                  itemStyle: {
                    color: "rgba(0,0,0,0)",
                  },
                  label: {
                    show:false,
                    color: "#FC9010",
                    backgroundColor: "rgba(252,144,16,0.1)",
                    borderRadius: 6,
                    padding: [7, 14],
                    borderWidth: 0.5,
                    borderColor: "rgba(252,144,16,.5)",
                    formatter: "报警1：{c}",
                  },
                },
                {
                  name: "最大值",
                  type: "max",
                  valueDim: "y",
                  symbol: "circle",
                  symbolSize: 6,
                  show:false,
                  itemStyle: {
                    color: "transtant",
                    shadowColor: "#FC9010",
                    shadowBlur: 8,
                  },
                  label: {
                    formatter: "",
                  },
                },
              ],
            },
          },
          // {
          //   data: yData2,
          //   type: "line",
          //   smooth: true,
          //   symbol: "none", //去除点
          //   name: "报警2次数",
          //   color: "rgba(155,245,237,1)",
          //   areaStyle: {
          //       //右，下，左，上
          //       color: new graphic.LinearGradient(
          //         0,
          //         0,
          //         0,
          //         1,
          //         [
          //           {
          //             offset: 0,
          //             color: "rgba(155,245,237,1)",
          //           },
          //           {
          //             offset: 1,
          //             color: "rgba(9,202,243,.0)",
          //           },
          //         ],
          //         false
          //       ),
          //   },
          //   markPoint: {
          //     data: [
          //       {
          //         name: "最大值",
          //         type: "max",
          //         valueDim: "y",
          //           show:false,

          //         symbol: "rect",
          //         symbolSize: [60, 26],
          //         symbolOffset: [0, -20],
          //         itemStyle: {
          //           color: "rgba(0,0,0,0)",
          //         },
          //         label: {
          //           show:false,
          //           color: "#09CAF3",
          //           backgroundColor: "rgba(9,202,243,0.1)",

          //           borderRadius: 6,
          //           borderColor: "rgba(9,202,243,.5)",
          //           padding: [7, 14],
          //           formatter: "",
          //           borderWidth: 0.5,
          //         },
          //       },
          //       {
          //         name: "最大值",
          //         type: "max",
          //         valueDim: "y",
          //         show:false,
          //         symbol: "circle",
          //         symbolSize: 6,
          //         itemStyle: {
          //           color: "transtant",
          //           shadowColor: "#09CAF3",
          //           shadowBlur: 8,
          //         },
          //         label: {
          //           formatter: "",
          //         },
          //       },
          //     ],
          //   },
          // },
        ],
      };
}
onMounted(()=>{
    getData();

})
</script>
<style lang="scss" scoped>
.category {
  margin-top: 24px;

}
.catergory-content {
  position: relative;
  padding-top: 4px;
//   padding-bottom: 46px;
  .title {
    position: absolute;
    right: -15px;
    top: 30px;
    span {
      vertical-align: middle;
      font-size: 14px;
    }
    .colorBlock {
      display: inline-block;
      background: rgba(155,245,237,1);
      width: 4px;
      height: 4px;
      border-radius: 2px;
      margin-right: 8px;
    }
    .payColorBlock {
      background: rgba(18,138,222,1);
    }
  }
  .chart {
    height: 180px;
    width: 100%;
  }
}
</style>
