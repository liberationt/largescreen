<template>
  <module-wrap title="公司荣誉" :icon="icon">
    <template #content>
      <div class="mainContent">
        <SeamlessScroll 
          :list="state.dataOption"
          v-model="state.scroll"
          :singleHeight="state.defaultOption.singleHeight"
          :step="state.defaultOption.step"
          :limitScrollNum="state.defaultOption.limitScrollNum"
          :hover="state.defaultOption.hover"
          :singleWaitTime="state.defaultOption.singleWaitTime"
          :wheel="state.defaultOption.wheel"
          direction="left"
        >
        <div class="scroll">
          <ul class="datalist">
						<li v-for="(item,i) in state.dataOption" :key="i">
              <div class="list-item" v-if="i%2==0">
                <img class="leftImg" src="@/assets/img/topc.png" alt="">
                <div class="item-content">
                  <div class="time">{{item.dateStr}}</div>
                  <div class="content">{{item.content}}</div>
                </div>
              </div>
						</li>
					</ul>
          <ul class="datalist datalists">
						<li v-for="(item,i) in state.dataOption" :key="i">
              <div class="list-item" v-if="i%2==1">
                <img class="leftImg" src="@/assets/img/bottom.png" alt="">
                <div class="item-content">
                  <div class="time">{{item.dateStr}}</div>
                  <div class="content">{{item.content}}</div>
                </div>
              </div>
						</li>
					</ul>
        </div>
        </SeamlessScroll>
        <div class="bgColor"></div>
      </div>
    </template>
  </module-wrap>
</template>
<script setup lang="ts">
import icon from "@/assets/img/ry.png"
import { computed, onMounted, reactive } from "vue";
import { currentGET } from "@/api"
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 350,
    limitScrollNum: 6,
    singleWaitTime: 0,
    direction:'left'
    // step:3
  },
  type: 1,
  scroll: true,
  dataOption: [],
});
onMounted(()=>{
  currentGET('companyHonors',{}).then(res=>{
    state.dataOption = res.data
  })
})
</script>
<style scoped lang="scss">
.mainContent{
    height: 346px;
    overflow: hidden;
    width:830px;
    padding:24px 0;
    box-sizing: border-box;
    position: relative;
    .datalist{
      display: flex;
      padding-left:20px;
      box-sizing: border-box;
      flex-wrap: nowrap;
    .list-item{
      display: flex;
      width:260px;
      margin-right: 30px;
    }
		.item-content{
			margin-left: 12px;
			.time{
				font-family: 'YouSheBiaoTiHei';;
				font-style: normal;
				font-weight: 500;
				font-size: 20px;
				line-height: 18px;
				color: #FFFFFF;
        margin-bottom: 12px;
			}
			.content{
				font-style: normal;
				font-weight: 400;
				font-size: 14px;
				line-height: 24px;
				color: #64BAE3;
			}
		}
	}
  .datalists{
		padding-left: 60px;
		.item-content{
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
		}
	}
  .bgColor{
    height:8px;
    background: #70F0FF;
    border-radius: 10px;
    width:100%;
    top:50%;
    position: absolute;
  }
	.leftImg{
		width:16px;
		height:148px;
	}
}
</style>
