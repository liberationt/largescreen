<template>
  <scale-screen
    width="1920"
    height="1080"
    :delay="500"
    :fullScreen="false"
    :boxStyle="{
      background: '#03050C',
      overflow: isScale ? 'hidden' : 'auto',
    }"
    :wrapperStyle="wrapperStyle"
    :autoScale="isScale"
  >
    <div class="content_wrap">
      <Headers />
      <div class="index-box">
        <div class="contetn_left">
          <component :is="state.dynamicComponents[state.index].left"></component>
        </div>
        <div class="contetn_center">
          <component :is="state.dynamicComponents[state.index].center"></component>
        </div>
        <div class="contetn_right">
          <component :is="state.dynamicComponents[state.index].right"></component>
        </div>
      </div>

      
    </div>
    
  </scale-screen>
  <div class="left" @click="left">

  </div>
  <div class="right" @click="right">
    
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted,provide,computed,markRaw} from "vue";
import { storeToRefs } from "pinia";
import { useSettingStore } from "@/stores/index";
import Headers from "./page/header.vue";
import CenterContent1 from "./page/center/index.vue";
import CenterContent2 from "./page/center/index.vue";
import CenterContent3 from "./thirdPage/center/index.vue";
import RightContent1 from "./page/right/index.vue";
import RightContent2 from "./secondPage/right/index.vue";
import RightContent3 from "./thirdPage/right/index.vue";
import LeftContent1 from "./page/left/index.vue";
import LeftContent2 from "./secondPage/left/index.vue";
import LeftContent3 from "./thirdPage/left/index.vue";


type componentType = {
  left: any,
  center: any,
  right: any,

}
type stateType = {
  dynamicComponents: componentType[],
  index: number, // 大屏幕索引
  time: number
}
// import statisticsLeft from '@/components/statisticsLeft.vue'
const settingStore = useSettingStore();
const { isScale } = storeToRefs(settingStore);
const wrapperStyle = {};
const left = ()=>{
  state.index-=1
  if(state.index<0){
    state.index=2
  }
}
const right = ()=>{
  state.index+=1
  if(state.index>2){
    state.index=0
  }
}
const state = reactive<stateType>({
  dynamicComponents: [
    {
      left: markRaw(LeftContent3),
      right: markRaw(RightContent3),
      center: markRaw(CenterContent3)
    },
    {
      left: markRaw(LeftContent1),
      right: markRaw(RightContent1),
      center: markRaw(CenterContent1)
    },
    {
      left: markRaw(LeftContent2),
      right: markRaw(RightContent2),
      center: markRaw(CenterContent2)
    },

  ],
  index: 0,
  time: 90000
})

const dealTime = () => {
  let timer = setInterval(() => {
    state.index += 1
    if(state.index === 1) {
      state.time = 40000
      clearInterval(timer)
      dealTime()
    }
    if(state.index > 2){
      state.index = 0
      state.time = 90000
      clearInterval(timer)
      dealTime()
    }
  },state.time)
}
provide('current', computed( ()=>state.index ) )
onMounted(() => {
  dealTime()
})
</script>
<style lang="scss" scoped>
.main{
  position: relative;
}
.content_wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url("@/assets/img/bg_content_blue.png") no-repeat center;
  background-size: 100% 100%;
  position: relative;
}
.index-box {
  width: 100%;
  display: flex;
  height: calc(100% - 122px);
  justify-content: space-between;
  padding: 36px 0;
  box-sizing: border-box;
}
//左边 右边 结构一样
.contetn_left,
.contetn_right {
  position: relative;
  width: 510px;
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 0 40px;
}
.contetn_center {
  flex: 1;
  box-sizing: border-box;
}
.left,.right{
  width:200px;
  height:100%;
  position: fixed;
  z-index: 100;
  top:0;
}
.left{
  left: 0;
}
.right{
  right: 0;
}
</style>
