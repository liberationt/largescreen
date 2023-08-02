<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import icon2 from "@/assets/img/publisher@2x.png";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import { currentGET } from "@/api";
//  publisherList
const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);

type itemType = {
  agentId: number,
  name: String
}

type stateType = {
  defaultOption: any,
  scroll: Boolean,
  list: itemType[]
}

const state = reactive<stateType>({
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 99,
    limitScrollNum: 3,
    // step:3
  },
  scroll: true,
  list: [],
});

onMounted(async () => {
  const res = await currentGET("publisherList", {});
  const { data, code } = res;
  if (code === 0) {
    state.list = data;
  }
});
</script>
<template>
  <module-wrap title="合作出版社" :icon="icon2" class="publiser">
    <template #content>
      <div class="publish-content">
        <seamless-scroll
          v-model="state.scroll"
          :list="state.list"
          :singleHeight="state.defaultOption.singleHeight"
          :step="state.defaultOption.step"
          :limitScrollNum="state.defaultOption.limitScrollNum"
          :hover="state.defaultOption.hover"
          :singleWaitTime="state.defaultOption.singleWaitTime"
          :wheel="state.defaultOption.wheel"
        >
          <div class="publish-content-wrap">
            <div
              class="publish-content-item"
              v-for="(item, index) in state.list"
              :key="item.agentId"
            >
              {{ item.name }}
            </div>
          </div>
        </seamless-scroll>
      </div>
    </template>
  </module-wrap>
</template>
<style lang="scss" scoped>
.publiser {
  // margin-top: 24px;
}

::v-deep(.module-content) {
  padding-bottom: 16px !important;
}
.publish-content {
  padding-top: 2px;
  overflow: hidden;
  height: 454px;
  box-sizing: border-box;
  .publish-content-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .publish-content-item {
    box-sizing: border-box;
    margin-top: 12px;
    width: 50%;
    line-height: 21px;
    color: rgba(100, 186, 227, 1);
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:nth-child(2n + 1) {
      padding-right: 6px;
    }
  }
}
</style>
