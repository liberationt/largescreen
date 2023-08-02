<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { currentGET } from "@/api";
const state = reactive({});

const option = ref({});

const setOption = (sourceList: any[]) => {
  option.value = {
    tooltip: {
      trigger: "item",
      show: false,
    },
    legend: {
      orient: "vertical",
      top: 40,
      left: 200,
      itemWidth: 4,
      itemHeight: 4,
      itemGap: 1,
      formatter: function (name: any) {
        let data = sourceList; //获取series中的data
        let total = 0;
        let tarValue: any;
        for (let i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name == name) {
            tarValue = data[i].value;
          }
        }
        let p = (tarValue / total) * 100;
        return `  {name|${name}}   {per|${p.toFixed(2)}%}`;
      },
      itemStyle: {},
      textStyle: {
        color: "rgba(255,255,255,0.6)",
        fontSize: 16,
        lineHeight: 18,
        rich: {
          name: {},
          per: {},
        },
      },
    },
    series: [
      {
        name: "合作图书品类",
        type: "pie",
        left: -220,
        top: 0,
        radius: ["47%", "60%"],
        color: [
          "#3898FF",
          "#45C7FF",
          "#FBDA80",
          "#F6834A",
          "#7ED095",
          "#39B87C",
          "#9BCBE6",
          "#3F84E7",
          "#6D8BB9",
        ],
        avoidLabelOverlap: false,
        itemStyle: {},
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
            color: "#FFFFFF",
            formatter: ["{name|{d}%}", "{per|{b}}"].join("\n"),
            rich: {
              name: {
                fontWeight: 600,
                fontSize: 20,
                lineHeight: 24,
                color: "#fff",
              },
              per: {
                fontSize: 12,
                lineHeight: 16,
                color: "rgba(255,255,255,0.6)",
              },
            },
          },
        },

        labelLine: {
          show: false,
        },
        select: {
          radius: ["45%", "50%"],
        },
        data: sourceList,
      },
    ],
  };
};
onMounted(async () => {
  const res = await currentGET("getFrAdviserGmv", {});
  const { code, data } = res;
  if (code === 0) {
    setOption(data);
  }
});
</script>
<template>
  <div class="catergory-content">
    <my-charts
      v-if="JSON.stringify(option) != '{}'"
      class="chart"
      :option="option"
      :autoPlays="true"
      height="184px"
    />
    <img src="@/assets/img/cirle_bg@2x.png" alt="" class="circle-img" />
  </div>
</template>
<style lang="scss" scoped>
.category {
  margin-top: 24px;
}
.catergory-content {
  box-sizing: border-box;
  position: relative;
  padding-top: 14px;
  height: 214px;
  .circle-img {
    position: absolute;
    top: 25px;
    left: 18px;
    width: 162px;
    height: 162px;
  }
}
</style>
