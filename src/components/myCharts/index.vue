<template>
  <div
    :class="className"
    ref="chartDom"
    :style="{ height: height, width: width }"
  />
</template>
<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, watch, reactive, ref } from "vue";
const props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  width: {
    type: String,
    default: "100%",
  },
  isClick: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "360px",
  },
  option: {
    type: Object,
    required: true,
  },
  clickIt: {
    type: Boolean,
    default: false,
  },
  toMethod: {
    type: Function,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  autoPlays: {
    type: Boolean,
    default: false,
  },
  mapPlay: {
    type: Boolean,
    default: false,
  },
});
const chartDom = ref();
const vdata: any = reactive({
  chart: null,
});
const initChart = () => {
  vdata.chart = echarts.init(chartDom.value, "walden");
  vdata.chart.setOption(props.option, true);
  if (props.autoPlay) {
    var index = 0; //播放所在下标
    var mTime = setInterval(function () {
      vdata.chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      if (index >= props.option.series[0].data.length) {
        index = 0;
      }
    }, 2000);
  }
  if (props.autoPlays) {
    var index = 0; //播放所在下标
	// var dataLen = props.option.series[0].data.length
    // myChart.dispatchAction({type: 'downplay',seriesIndex: 0,dataIndex: curIndex});
    // curIndex = (curIndex + 1) % dataLen
    // myChart.dispatchAction({
    // 	type: 'highlight',seriesIndex: 0,dataIndex: curIndex
    // });

    var mTime = setInterval(function () {
	    vdata.chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index == 0 ? props.option.series[0].data.length-1 : index-1,
      });
      vdata.chart.dispatchAction({
    	  type: 'highlight',seriesIndex: 0,dataIndex: index
      });
	    index+=1;
      if (index >= props.option.series[0].data.length) {
        index = 0;
      }
    }, 2000);
  }
};
onMounted(() => {
  initChart();
});
watch(
  () => props.option,
  (newVal) => {
    vdata.chart.setOption(newVal, true);
  },
  {
    deep: true,
  }
);
// export default {
//   watch: {
//     option: {
//       deep: true,
//       handler(val) {
//         this.chart.setOption(val, true);
//       },
//     },
//   },
//   mounted() {
//     this.initChart();
//     if (this.isClick) {
//       let that = this;
//       this.chart.on("click", function (params) {
//         that.$emit("showAgeToast", params);
//       });
//     }
//   },
//   beforeDestroy() {
//     if (!this.chart) {
//       return;
//     }
//     this.chart.dispose();
//     this.chart = null;
//   },
//   methods: {
//     initChart() {
//       this.chart = echarts.init(this.$el, "walden");
//       this.chart.setOption(this.option);
//       if (this.clickIt === true) {
//         this.chart.on("click", (data) => {
//           this.toMethod(data);
//         });
//       }
//       if (this.mapPlay && this.mapPlay == true) {
//         let index = -1;
//         let that = this;
//         var timer = setInterval(function () {
//           that.chart.dispatchAction({
//             type: "hideTip",
//             seriesIndex: 0,
//             dataIndex: index,
//           });
//           // 显示提示框
//           that.chart.dispatchAction({
//             type: "showTip",
//             seriesIndex: 0,
//             dataIndex: index + 1,
//           });
//           // 取消高亮指定的数据图形
//           that.chart.dispatchAction({
//             type: "downplay",
//             seriesIndex: 0,
//             dataIndex: index,
//           });
//           that.chart.dispatchAction({
//             type: "highlight",
//             seriesIndex: 0,
//             dataIndex: index + 1,
//           });
//           index++;
//           if (index > that.option.series[0].data.length - 1) {
//             index = -1;
//           }
//         }, 10000);
//       }
//     },
//   },
// };
</script>