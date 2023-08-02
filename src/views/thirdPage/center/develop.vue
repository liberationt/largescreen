<template>
  <module-wrap title="RAYS发展历程" :icon="icon">
    <template #content>
      <div class="mainContent">
        <div>
          <ul class="datalist">
						<li class="list-item" v-for="(item,i) in vdata.topList" :key="i">
							<img class="leftImg" src="@/assets/img/topc.png" alt="">
							<div class="item-content">
								<div class="time">{{item.time}}</div>
								<div class="edition">{{item.edition}}</div>
								<div class="content">{{item.content}}</div>
							</div>
						</li>
					</ul>
        </div>
        <div class="xxbg">
          <img class="xxImg" src="@/assets/img/xx.png" alt="">
        </div>
        <div>
					<ul class="datalist datalists">
						<li class="list-item" v-for="(item,i) in vdata.topLists" :key="i">
							<img class="leftImg" src="@/assets/img/bottom.png" alt="">
							<div class="item-content">
								<div class="time">{{item.time}}</div>
								<div class="edition">{{item.edition}}</div>
								<div class="content">{{item.content}}</div>
							</div>
						</li>
					</ul>
				</div>
      </div>
    </template>
  </module-wrap>
</template>
<script setup lang="ts">
import icon from "@/assets/img/fzgc.png"
import {reactive} from "vue"
const vdata = reactive({
	topList:[
		{
			time:'2015.10',
			edition:'RAYS1.0',
			content:'创立 "现代纸书"'
		},
		{
			time:'2017.06',
			edition:'RAYS3.0',
			content:'纸书与读者服务相契合'
		},
		{
			time:'2019.04',
			edition:'RAYS5.0',
			content:'场景化运营纸书'
		},
	],
	topLists:[
		{
			time:'2016.08',
			edition:'RAYS2.0',
			content:'培养读者扫码习惯'
		},
		{
			time:'2018.11',
			edition:'RAYS4.0',
			content:'推出 "主题书"策略'
		},
		{
			time:'2020.03',
			edition:'RAYS6.0',
			content:'书童小睿（智能阅读助手）'
		},
	],
})
</script>
<style scoped lang="scss">
.mainContent{
	height: 346px;
	box-sizing: border-box;
	padding:24px 0;
	position: relative;
	.datalist{
		display: flex;
		padding-left:20px;
		.item-content{
			margin-left: 12px;
			.time{
				font-family: 'YouSheBiaoTiHei';;
				font-style: normal;
				font-weight: 500;
				font-size: 20px;
				line-height: 18px;
				color: #FFFFFF
			}
			.edition{
				margin:16px 0 8px;
				font-style: normal;
				font-weight: 600;
				font-size: 16px;
				line-height: 18px;
				color: #64BAE3;
			}
			.content{
				font-style: normal;
				font-weight: 400;
				font-size: 14px;
				line-height: 18px;
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
	.list-item{
		width:33%;
		display: flex;
	}
	.xxbg{
		position: absolute;
		top:45%;
		transform: translateY(-50%);
		width:100%;
		.xxImg{
			height:64px;
			width:100%;
		}
	}
	.leftImg{
		width:16px;
		height:148px;
	}
}
</style>