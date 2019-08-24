<template>
	<table border="0" cellpadding="0" cellspacing="0" style="line-height: 20px;" v-if="bannerData.length >= 7">
		<tr>
			<td colspan="2">
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[0].id }}">
					<img :width="getImgsLayout(0).width" :height="getImgsLayout(0).height" :src="''+bannerData[0].thumUrl" >
				</router-link>
			</td>
		</tr>
		<tr>
			<td>
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[4].id }}">
					<img :width="getImgsLayout(1).width" :height="getImgsLayout(1).height" :src="''+bannerData[4].thumUrl" >
				</router-link>
			</td>
			<td>
				<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[5].id }}">
					<img :width="getImgsLayout(2).width" :height="getImgsLayout(2).height" :src="''+bannerData[5].thumUrl">
				</router-link>
			</td>
		</tr>
	</table>
</template>

<script>
	//父组件传值过来
	export default {
		name: 'BannerPhone',
		props: ["bannerData"],
		data() {
			return {
				windowWidth: 320,
			}
		},
		methods: {
			getImgsLayout(index) {
				var widht = 190;
				var height = 170;
				if(index ==0) {
					widht = this.windowWidth;
					let scale =widht / 380;
					height = 170 * scale;
				}else {
					widht = (this.windowWidth -  1) * 0.5;
					let scale = widht / 190;
					height = 170 * scale;
				}
				return {width:widht,height:height};
			}
		},
		mounted() {
			this.windowWidth = document.documentElement.clientWidth;
		}
	}
</script>

<style>
	table img {
		vertical-align: top;
	}
/* 	.container ul li {
		margin: auto;
		display: inline;
		-webkit-perspective: 1000px;
		-moz-perspective: 1000px;
		float: left;
	} */

/* 	.container img {
		vertical-align: top;
	} */

	.lg_relative {
		position: relative;
	}
</style>
