
<template>
    <div class="center">
      <Develop />
      <honor />
    </div>
</template>
<script setup lang="ts">
  import honor from "./honor.vue";
  import Develop from "./develop.vue";
</script>
<style scoped lang="scss">
.center{
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  height:100%;
}
</style>