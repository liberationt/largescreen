<template>
	<div class="mainContent">
		<!-- <div class="hlef">
			<module-wrap title="收益类型占比" :icon="icon2">
				<template #content>
					<div class="catergory-content">
						<my-charts :height="200" class="charts" :width="400" :option="vData.option" />
					</div>
				</template>
			</module-wrap>
		</div>
		<div class="hlef">
			<module-wrap title="排名" :icon="icon2">
				<template #content>
					<div class="catergory-content">
						<my-charts :height="200" class="charts" :width="400" :option="vData.option" />
					</div>
				</template>
			</module-wrap>
		</div> -->
		<module-wrap title="" class="my-module-wrap">
    <template #content>
      <div class="title border-transparency">
        <div class="module-title title1">
          <div class="icon">
            <img src="@/assets/img/datav.png" alt="" />
          </div>
          <div class="title-text">近六月活跃用户数</div>
        </div>
        <div class="module-title title2">
          <div class="icon">
            <img src="@/assets/img/datav.png" alt="" />
          </div>
          <div class="title-text">近六月扫码用户数</div>
        </div>
      </div>
      <div class="my-content">
				<my-charts height="184px" width="510px" :autoPlay="true" :option="vData.option"/>
				<my-charts height="184px" width="510px" :autoPlay="true" :option="vData.optionCode"/>
      </div>
    </template>
  </module-wrap>
	</div>
</template>
<script setup lang="ts">
import icon2 from "@/assets/img/ry.png"
import { onMounted, reactive, ref } from "vue";
import * as echarts from "echarts";
import { currentGET } from "@/api";
const xData = ref()
const yData = ref()
const lData = ref()
const codexData = ref()
const codeyData = ref()
const codelData = ref()
var centerColorList = [ '#3BA1ED', '#F67071', '#3FDAA2', '#FD9442', '#78D8F8','#3BA1ED'];
var centerCgradientList = [ '#2695E7', '#EA5A5B', '#36C08E', '#E18741', '#27AEDA','#2695E7'];
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
          show: false,
        },
        data:xData,
        type: "category",
      },
      yAxis: [{
            type: 'value',
            show:false,
            axisLine: {
                show: true,
                lineStyle: {
                  color:"rgba(255,255,255,0.25)"
                }
            },
            splitLine: {
                show: false
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
      {
          type: "value",
          // name: "%",
          nameTextStyle: {
            fontSize: 15,
          },
          color: 'red',
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show:false,
            formatter: "{value}%",
            color: '#64BAE3',
            fontSize: 15,
          },
          axisLine: {
            show:false,
            lineStyle: {
              color: 'pink',
            },
          },
        },
      ],
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
            if (params.dataIndex > 5) return
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
              var colorList = [ '#4EB4FF', '#FD7E7F', '#4AEFB3', '#FFB175', '#78D8F8','#4EB4FF'];
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
                var colorList = [ '#2293E8', '#58E6B7', '#FA7375', '#FD9341', '#6BD6F8'];
                return colorList[params.dataIndex]
            },
          },
        },
        // {
        //   name: '',
        //   type: "line",
        //   symbolSize: 5,
        //   symbol: "circle",
        //   yAxisIndex: 1,
        //   z: 22,
        //   // symbol:"roundRect",
        //   // symbolSize:8,
        //   itemStyle: {
        //     color: "#9BF5ED",
        //   },
        //   label: {
        //     show: false,
        //     position: "top",
        //     formatter: "C",
        //     color: "#F1B145",
        //     fontSize: 16,
        //   },
        //   lineStyle: {
        //     width: 2,
        //     color: "#9BF5ED",
        //   },
        //   data: lData,
        // },
      ],
  },
  optionCode:{
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
          show: false,
        },
        data:codexData,
        type: "category",
      },
      yAxis: [{
            type: 'value',
            show:false,
      },
      {
          type: "value",
          // name: "%",
          nameTextStyle: {
            fontSize: 15,
          },
          color: 'red',
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show:false,
            formatter: "{value}%",
            color: '#64BAE3',
            fontSize: 15,
          },
          axisLine: {
            show:false,
            lineStyle: {
              color: 'pink',
            },
          },
        },
      ],
      series: [
        {
          data: codeyData,
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
            if (params.dataIndex > 5) return
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
          data: codeyData,
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
              var colorList = [ '#4EB4FF', '#FD7E7F', '#4AEFB3', '#FFB175', '#78D8F8','#4EB4FF'];
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
                var colorList = [ '#2293E8', '#58E6B7', '#FA7375', '#FD9341', '#6BD6F8'];
                return colorList[params.dataIndex]
            },
          },
        },
        // {
        //   name: '',
        //   type: "line",
        //   symbolSize: 5,
        //   symbol: "circle",
        //   yAxisIndex: 1,
        //   z: 22,
        //   // symbol:"roundRect",
        //   // symbolSize:8,
        //   itemStyle: {
        //     color: "#9BF5ED",
        //   },
        //   label: {
        //     show: false,
        //     position: "top",
        //     formatter: "C",
        //     color: "#F1B145",
        //     fontSize: 16,
        //   },
        //   lineStyle: {
        //     width: 2,
        //     color: "#9BF5ED",
        //   },
        //   data: codelData,
        // },
      ],
  }
});
onMounted(async () => {
  await currentGET("getfrActiveUser", {}).then((res) => {
		res.data.reverse()
    xData.value = res.data.map((item:any)=>item.month + '月')
    yData.value = res.data.map((item:any)=>item.activeUsers)
		lData.value = res.data.map((item:any)=>item.yearOnYearGrowth*100)
  });
	await currentGET("getFrScanUserList", {}).then((res) => {
		vData.list = res.data
    res.data.reverse()
    codexData.value = res.data.map((item:any)=>item.month + '月')
    codeyData.value = res.data.map((item:any)=>item.scanUsers)
		codelData.value = res.data.map((item:any)=>item.yearOnYearGrowth*100)
  });
})
</script>
<style lang="scss" scoped>
.my-module-wrap {
  margin-top: 63px;
}
.mainContent{
	
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
.title1{
  width:50%;
  padding-left: 75px;
}
.title2{
  flex:1;
  padding-left: 44px;
}
.my-content {
  width: 836px;
  display: flex;
  box-sizing: border-box;
	justify-content: space-between;
  padding-right: 50px;
  .pie {
		height:184px;
		flex-shrink: 0;
  }
	.prv{
    flex: 1;
		box-sizing: border-box;
		padding:15px 0;
		.list{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height:100%;
		}
		.list_item{
			display: flex;
			.other{
				width:24px;
				height:24px;
				box-sizing: border-box;
				text-align: center;
				font-size: 14px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 18px;
				border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        color:#fff;
			}
			.one{
				background: linear-gradient(333deg, #FFE279 18.24%, #FFB500 81.41%);
			}
			.two{
					background: linear-gradient(333deg, #DFDFDF 18.24%, #CECECE 81.41%);
			}
			.three{
					background: linear-gradient(333deg, #F5C892 18.24%, #D9AE7C 81.41%);
			}
			.city{
				width:160px;
				font-size: 16px;
			}
			.number{
				font-size: 16px;
				color:#64BAE3
			}
		}
	}
}
}
</style>