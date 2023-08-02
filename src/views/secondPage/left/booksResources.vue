<template>
  <module-wrap title="" class="category">
    <template #content>
      <!-- <div class="catergory-content">
        <my-charts :autoPlays="false" class="chart" :height="height" :option="option" />
      </div> -->
      <div class="catergory-content">
        <div class="module-title title1 border-transparency">
          <div class="icon">
            <img src="@/assets/img/icon_p@2x.png" alt="" />
          </div>
          <div class="title-text">出版融合业务</div>
        </div>
        <div class="module-content module-content1">
          <div
            class="module-con-item"
            v-for="(item, index) in vData.list"
            :key="`pu${index}`"
          >
            <div class="module-item-title">{{ item.title }}</div>
            <div class="module-item-img">
              <img :src="item.imageUrl" />
            </div>
            <div class="module-item-conent">
              {{ item.content }}
            </div>
          </div>
        </div>
        <div class="module-title title2 border-transparency">
          <div class="icon">
            <img src="@/assets/img/icon_me@2x.png" alt="" />
          </div>
          <div class="title-text">元宇宙出版业务</div>
        </div>
        <div class="module-content module-content2">
          <div
            class="module-con-item"
            v-for="(item, index) in vData.list1"
            :key="`pu${index}`"
          >
            <div class="module-item-title">{{ item.title }}</div>
            <div class="module-item-bottom">
              <div class="module-item-img">
                <img :src="item.imageUrl" />
              </div>
              <div class="module-item-conent">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </module-wrap>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
// import icon3 from "@/assets/image/Union.svg";
import { currentGET } from "@/api";

const vData = reactive({
  list: [],
  list1: [],
});
const option = ref({});
const height = ref("200");
var charts = {
  // 按顺序排列从大到小
  cityList: [],
  cityData: [],
};
onMounted(async () => {
  currentGET("getMediaCoverage", { type: 2 }).then((res) => {
    vData.list = res.data ? res.data.slice(0, 2) : [];
  });
  currentGET("getMediaCoverage", { type: 3 }).then((res) => {
    vData.list1 = res.data ? res.data.slice(0, 3) : [];
  });
  // await currentGET("getFrTopBook").then((res) => {
  //   if (res.code == 0) {
  //     vData.list = res.data || []
  //     console.log(vData.list,'vData.list=======')
  //   } else {
  //     vData.list = []
  //   }
  //   charts.cityList = res.data.map((item:any) => item.province)
  //   charts.cityData = res.data.map((item:any) => item.count)
  //   setOption(res.data);
  // });
});
const setOption = async (newData: any) => {
  let dataList = [charts.cityList, charts.cityData];
  console.log(dataList, "dataList============44");

  let barWidth = 20;
  let labelPositionY = -60;

  let colors = [
    ["#38ADEF", "#38ADEF", "#1286C7", "#38ADEF", "#1574AB"],
    ["#53E9B3", "#53E9B3", "#34BE8C", "#53E9B3", "#229B6F"],
    ["#FF8A8A", "#FF8A8A", "#F66060", "#FF8A8A", "#D64646"],
    ["#FFB175", "#FFB175", "#FD9442", "#FFB175", "#E18741"],
    ["#78D8F8", "#78D8F8", "#34C3F2", "#78D8F8", "#27AEDA"],
    ["#38ADEF", "#38ADEF", "#1286C7", "#38ADEF", "#1574AB"],
    ["#53E9B3", "#53E9B3", "#34BE8C", "#53E9B3", "#229B6F"],
    ["#FF8A8A", "#FF8A8A", "#F66060", "#FF8A8A", "#D64646"],
    ["#FFB175", "#FFB175", "#FD9442", "#FFB175", "#E18741"],
    ["#78D8F8", "#78D8F8", "#34C3F2", "#78D8F8", "#27AEDA"],
  ];

  let seriesDatas: any = [];
  let seriesDatasLeft: any = [];
  let seriesDatasRight: any = [];
  dataList[0].forEach((item, index) => {
    let color = colors[index];
    let itemStyleColor = {
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      type: "linear",
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
          offset: 0.8,
          color: color[3],
        },
      ],
    };
    let data = {
      name: item,
      value: dataList[1][index],
      itemStyle: {
        color: itemStyleColor,
      },
      label: {
        rich: {
          cc: {
            color: color[3],
          },
        },
      },
    };
    let dataLeft = {
      name: item,
      value: 1,
      itemStyle: {
        color: itemStyleColor,
      },
    };
    let dataRight = {
      name: item,
      value: dataList[1][index],
      itemStyle: {
        color: color[4],
      },
    };
    seriesDatas.push(data);
    seriesDatasLeft.push(dataLeft);
    seriesDatasRight.push(dataRight);
  });

  option.value = {
    backgroundColor: "",
    grid: {
      borderWidth: 0,
      top: "10px",
      left: "10px",
      right: "20%",
      bottom: "0%",
    },
    xAxis: [
      {
        type: "value",
        axisLine: {
          show: false,
          lineStyle: {
            color: "#B5B5B5",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ["#5c6368"],
            width: 2,
            type: "dotted",
          },
        },
        axisLabel: {
          show: false,
          fontFamily: "agencyr",
          color: "#FFF",
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
          fontWeight: 700,

          formatter: function (val: any) {
            return `${val}`;
          },
        },
        data: dataList[1],
      },
    ],
    series: [
      {
        name: "柱1",
        type: "bar",
        barWidth: barWidth,
        z: 11,
        label: {
          show: true,
          color: "#fff",
          position: [0, "-24px"],
          formatter: ["{bb|{b}  }"].join(""),
          rich: {
            bb: {
              color: "#fff",
              fontSize: 12,
              fontFamily: "'Microsoft YaHei' , 'PingFang SC'",
              fontWeight: 600,
            },
          },
        },
        data: seriesDatas,
      },
      {
        name: "顶1",
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth / 2, barWidth],
        symbolOffset: [barWidth / 4, 0],
        symbolPosition: "end",
        z: 12,
        data: seriesDatasRight,
      },
      {
        name: "底",
        type: "pictorialBar",
        symbol: "diamond",
        symbolSize: [barWidth / 2, barWidth],
        symbolOffset: [-barWidth / 4, 0],
        z: 1,
        data: seriesDatasLeft,
      },
    ],
  };
};
</script>
<style lang="scss" scoped>
.category {
  // margin-bottom: 24px;
  height: 880px;
  box-sizing: border-box;
}

.catergory-content {
 padding: 0 0 30px 0;
}
.module-title {
  padding: 16px 0;
  display: flex;
  align-items: center;
&.title2 {
  margin-top: 12px;
}
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
  .module-con-item {
    margin-top: 16px;
    .module-item-title {
      font-weight: 700;
      font-size: 16px;
      line-height: 21px;

      color: #ffffff;
    }

    .module-item-img {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: 4px;
      }
    }
    .module-item-conent {
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;

      color: rgba(255, 255, 255, 0.6);
    }
  }
  &.module-content1 {
    display: flex;
    justify-content: space-between;
    .module-con-item {
      width: 173px;
      .module-item-img {
        margin-top: 8px;
        width: 173px;
        height: 97px;
      }
      .module-item-conent {
        margin-top: 8px;
      }
    }
  }
  &.module-content2 {
    .module-con-item {
      .module-item-img {
        width: 160px;
        height: 90px;
      }
      .module-item-bottom {
        margin-top: 8px;
        display: flex;
        .module-item-conent {
          margin-left: 16px;
          flex: 1;
        }
      }
    }
  }
}
</style>
