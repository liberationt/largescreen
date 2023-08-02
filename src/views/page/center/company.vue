<template>
  <div class="company">
    <module-wrap title="公司荣誉" :icon="icon2" class="publiser">
      <template #content>
        <div class="publish-content">
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
				<ul class="list">
					<li class="item_list" v-for="(item,i) in state.dataOption" :key="i">
						<span>{{ item.value }}</span>
						<!-- <span>{{ item.value }}</span> -->
					</li>
				</ul>
			</SeamlessScroll>
        </div>
      </template>
    </module-wrap>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
import { currentGET } from "@/api"
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import icon2 from "@/assets/img/ry.png"
const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 350,
    limitScrollNum: 6,
    singleWaitTime: 0,
    // step:3
  },
  type: 1,
  scroll: true,
  dataOption: [],
});
onMounted(()=>{
  currentGET('companyHonors',{}).then(res=>{
    // console.log(res.data)
    // state.dataOption = res.data
    for(let i=0;i<res.data.length;i++){
     if(i%2==0){
      state.dataOption.push(res.data[i])
     }
    }
  })
})
</script>
<style scoped lang="scss">
.company{
  height:269px;
}
.publiser{
  height:269px;
}
.publish-content{
	height:180px;
	padding-top: 4px;
  	overflow: hidden;
}
.list {
    height: 180px;
    font-size: 16px;
    color: rgba(100, 186, 227, 1);
    padding-left: 16px;
  }
  .item_list {
    margin-bottom: 12px;
    display: flex;
    // span {
    //   // width: 50%;
    //   flex-shrink: 0;
    // }
  }
</style>
