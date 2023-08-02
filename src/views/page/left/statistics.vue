<template>
  <module-wrap title="" :icon="icon1" class="container">
    <template #content>
      <div class="itemTop">
        <div class="box">
          <div class="box_top border-transparency">
            <div class="transaction transaction_60">
              <div>近90天交易总额</div>
              <div class="number">
                <count-up :endVal="vData.transactionTotal" :duration="duration"></count-up> 
                <span>万</span>
              </div>
            </div>
            <div class="transaction transaction_40">
              <div>近90天成交量</div>
              <div class="number">
                <count-up :endVal="vData.bookCount" :duration="duration"></count-up> 
                <span>万</span>
              </div>
            </div>
          </div>
          <div class="box_top">
            <div class="transaction transaction_60">
              <div>书籍总印量</div>
              <div class="number">
                <count-up :endVal="vData.bookNum" :duration="duration"></count-up> 
                <span>万</span>
              </div>
            </div>
            <div class="transaction transaction_40">
              <div>出版社入驻数</div>
              <div class="number">
                <count-up :endVal="vData.settleIn" :duration="duration"></count-up>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </template>
  </module-wrap>
</template>
<script setup lang="ts">
import { reactive, ref,onMounted } from "vue";
import { currentGET } from "@/api";

import icon1 from "@/assets/img/stas@2x.png";
const duration = ref(2);

const vData = reactive({
  transactionTotal:0,
  userTurnover:0,
  bookNum:0,
  bookCount: 0,
  settleIn:0,
  platFormObj:{}
})
// const handle = (str) =>{
//   //字符串切割为数组反转再转字符串
//   let strs = str.toString()
//   var reverse_str = strs.split('').reverse().join('');
//   var arr = [];
//   //循环下标
//   for(var i in reverse_str){
//     //与3取模
//     if(i % 3 == 0){
//       //开始进行分割字符串并反转，推入数组
//       arr.push(reverse_str.substr(i,3).split('').reverse().join(''))
//     }
//   }
//   // 返回 反转后三三加入逗号的字符串 
//   return arr.reverse().join(',')
// }
onMounted(() => {
  currentGET("getFrTransPlatform", {}).then((res) => {
    if (res.code == 0) {
      vData.platFormObj = res.data || {}
    } else {
      vData.platFormObj = {}
    }
    vData.transactionTotal = vData.platFormObj.transAmount / 10000
    vData.bookCount = vData.platFormObj.bookCount / 10000
    vData.bookNum = vData.platFormObj.printNum / 10000
    vData.settleIn = vData.platFormObj.publishingNum
  });
})
</script>
<style lang="scss" scoped>
.container {
  height: 266px;
}
.itemTop {
  .box_top {
    // height: 121px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 3px;
    .transaction {
      width: 50%;
      padding: 10px 0;
      color: rgba(255,255,255,1);
      font-size: 20px;
      font-weight: 700;
      .number {
        padding-top: 8px;
        color: #64BAE3;
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        span {
          font-size: 20px;
        }
      }
    }
    .transaction_60 {
      width: 205px;
    }
    .transaction_40 {
      // width: 44%;
    }
  }
}
.countup-wrap {
  float: left;
  margin-right: 5px;
}
</style>
