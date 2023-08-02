<template>
	<div>
		<Map />
    <CenterBottom v-if="current===1"/>
		<Profit v-else/>
	</div>
</template>
<script setup lang="ts">
import { onMounted, watch,inject } from "vue";
import Map from "./map.vue"
import Profit from "./profit.vue"
import CenterBottom from "./center-bottom.vue"
// 接收父组件的进件详细参数
let current : any = inject('current')
watch(
	()=>current.value,
    (newVal)=>{

	},
	{
		deep:true
	}
)
onMounted(()=>{
	
})
</script>