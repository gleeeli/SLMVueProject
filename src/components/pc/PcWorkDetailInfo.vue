<template>
	<div class="work-info">
		<div class="wd-info-left">
			<div class="wd-info-left-img">
				<img width="210px" height="280px" :src="info.thumUrl" />
			</div>
		</div>
		<div class="wd-info-right">
			<div class="wd-info-right-top">
				<p class="works-intro-title">
					<label>{{info.name}}</label>
				</p>
				<p class="works-intro-digi">
					<label>作者：{{info.author}} 人气：{{info.clickCount}}</label>
				</p>
				<p class="works-intro-short">
					<label>{{info.desciption}}</label>
				</p>
	
			</div>
			<div class="wd-info-right-bottom" v-if="loadStatus == 1">
				<router-link class="works-intro-view" :title="'开始阅读'+info.name" :to="{ path: '/LookComic', query: {charptId:firstCharptId, productId: productId }}">开始阅读</router-link>
	
			</div>
		</div>
	</div>
</template>

<script>
	//父组件传值过来
	export default {
		props: ["info","firstCharptId","productId","loadStatus"],
		data() {
			return {
				// windowWidth: 320,
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
	.work-info {
		width: 100%;
		height: 332px;
		/* clear: both; */
	
		border: 1px solid #cec7bd;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
		margin-top: 10px;
		flex-direction: row;
		display: flex;
		align-items: stretch;
	}
	
	.wd-info-left {
		width: 250px;
	
		/* float: left; */
	
	
	}
	
	.wd-info-left-img {
		margin: 34px 20px 0px 20px;
		width: 210px;
		height: 280px;
		background-color: #f3f3f3;
	}
	
	.wd-info-right {
		/* width: 80%; */
		height: 332px;
		/* float: left; */
		flex: 1;
	}
	
	.wd-info-right-top {
		border-bottom: 1px dashed #999;
		margin: 34px 10px 20px 10px;
		padding-bottom: 20px;
		text-align: -webkit-left;
	}
	
	.works-intro-title {
		/*作品名*/
		padding-bottom: 10px;
		margin-right: 10px;
	}
	
	.works-intro-title label {
		font-size: 32px;
	}
	
	.works-intro-digi {
		/*作者人气*/
		padding: 20px 0 10px 0;
		font-size: 12px;
	}
	
	.works-intro-short {
		/*简介*/
		width: 100%;
		height: 54px;
		overflow: hidden;
		font-size: 12px;
	}
	
	.wd-info-right-bottom {
		clear: both;
	}
	
	.works-intro-view {
		/*阅读按钮*/
		float: left;
		width: 112px;
		height: 45px;
		line-height: 45px;
		text-align: center;
		font-size: 18px;
		text-shadow: 0 0 0 #fff;
		margin-right: 10px;
		background: #f89157;
		box-shadow: 0 0 1px rgba(255, 255, 255, 0.5) inset;
		border: 1px solid #ec7d4d;
		color: #fff;
		border-radius: 3px;
		text-decoration: none;
	}
	
</style>
