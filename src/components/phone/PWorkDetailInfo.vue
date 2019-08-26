<template>
	<div class="pcontainer">
		<div class="pwork-info">
			<div class="pwd-info-left">
				<div class="pwd-info-left-img">
					<img :width="getImgsLayout(0).width" :height="getImgsLayout(0).height" :src="info.thumUrl" />
				</div>
				
			</div>
			<div class="pwd-info-right">
				<div class="pwd-info-right-top">
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
				
			</div>
			
		</div>
		<div class="pstart-read" v-if="loadStatus== 1">
			<router-link class="pworks-intro-view" :title="'开始阅读'+info.name" :to="{ path: '/LookComic', query: {charptId:firstCharptId, productId: productId }}">开始阅读</router-link>
			
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
		methods: {
			getImgsLayout(index) {
				var widht = 210;
				var height = 280;
				widht = 150;
				let scale =widht / 210;
				height = 280 * scale;
				return {width:widht,height:height};
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
	.pcontainer {
		border: 1px solid #cec7bd;
	}
	.pwork-info {
		width: 100%;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
		margin-top: 10px;
		flex-direction: row;
		display: flex;
		align-items: stretch;
	}
	
	.pwd-info-left {
		/* width: 20%; */
	}
	
	.pwd-info-left-img {
		/* margin: 34px 20px 0px 20px; */
	/* 	width: 210px;
		height: 280px; */
		background-color: #f3f3f3;
	}
	
	.pwd-info-right {
		/* width: 80%; */
		/* height: 332px; */
		/* float: left; */
		flex: 1;
		padding-left: 5px;
	}
	
	.pwd-info-right-top {
		border-bottom: 1px dashed #999;
		margin: 34px 10px 2p0px 10px;
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
	
	.pstart-read {
		clear: both;
		height: 45px;
	}
	
	.pworks-intro-view {
		/*阅读按钮*/
		float: left;
		width: 100%;
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
