<template>
  <div>
    <div v-if="vData.show">
      <booksResources />
    </div>
    <!-- <div v-else>
      <scanningCode />
      <resourceScanningCode />
    </div> -->
    <!-- <movablePin />
    <company /> -->
  </div>
</template>
<script setup lang="ts">
import booksResources from "./booksResources.vue";
import resources from "./resources.vue";
import scanningCode from "./scanningCode.vue";
import resourceScanningCode from "./resourceScanningCode.vue";
import { reactive , onMounted} from "vue";

const vData = reactive({
  show:true
})
onMounted(() => {
  // setInterval(function () {
  //   vData.show = !vData.show
  // }, 5000);
})

// import company from "./company.vue";
// import movablePin  from "./movablePin.vue";

</script>
<style lang="scss" scoped></style>
