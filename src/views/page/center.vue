<template>
  <div class="main">
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
		  <ul>
				<li class="item_list" v-for="(item,i) in state.dataOption" :key="i">{{ item.census }}</li>
			</ul>
		</SeamlessScroll>
  </div>
	<div :class="['animate','animate__animated', state.type==1?'animate__zoomIn':'' ]">
		<!-- animate__zoomIn -->
	</div>
</template>
<script setup lang="ts">
// import { reactive } from "vue";
import SeamlessScroll from "../../components/seamless-scroll";
import { computed, onMounted, reactive } from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 300,
    limitScrollNum: 6,
		singleWaitTime:0,
    // step:3
  },
	type:1,
  scroll: true,
	dataOption: [
    {
      census: "今天礼拜一的生活吧",
    },
		{
      census: "今天礼拜二的生活吧",
    },
		{
      census: "今天礼拜三的生活吧",
    },
		{
      census: "今天礼拜四的生活吧",
    },
		{
      census: "今天礼拜五的生活吧",
    },
		{
      census: "今天礼拜六的生活吧",
    },
		{
      census: "今天礼拜七的生活吧",
    },
		{
      census: "今天礼拜八的生活吧",
    },
		{
      census: "今天礼拜九的生活吧",
    },
  ],

});
const comName = computed(() => {
    return SeamlessScroll;
  // if (indexConfig.value.rightBottomSwiper) {
  //   return SeamlessScroll;
  // } else {
  //   return EmptyCom;
  // }
});
onMounted(()=>{
	setInterval(()=>{
		state.type = state.type==1?0:1
	},3000)
})
</script>
<style lang="scss" scoped>
.main{
	height:300px;
	background: yellow;
	overflow: hidden;
	.item_list{
		line-height: 40px;
	}
}
.animate{
	width:200px;
	height:100px;
	background: blue;
	transition: all 10s;
}
</style>