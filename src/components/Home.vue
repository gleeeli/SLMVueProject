<template>
	<div>
		<Header />
		<div class="lg_body_wrap" id="homeData">
			<div class="lg_body_content">
				<div class="lg_left">
					<div class="lg_ring">
						<table border="0" cellpadding="0" cellspacing="5" style="line-height: 20px;" v-if="bannerData.length >= 7">
							<tr>
								<td colspan="2">
									<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[0].id }}">
										<div class="container">
											<ul>
												<li style="width:380px; height:170px;">
													<div class="out_box">
														<div class="front_box"><img width="380" :src="''+bannerData[0].thumUrl" height="170"></div>
														<div class="back_box"><img width="380" :src="''+bannerData[0].thumUrl" height="170"></div>
													</div>
												</li>
											</ul>
										</div>
									</router-link></td>
								<td>
									<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[1].id }}">	
										<div class="container">
											<ul>
												<li style="width:190px; height:170px;">

													<div class="out_box">
														<div class="front_box"><img width="190" :src="''+bannerData[1].thumUrl" height="170"></div>
														<div class="back_box"><img width="190" :src="''+bannerData[1].thumUrl" height="170"></div>
													</div>

												</li>
											</ul>
										</div>
									</router-link>
								</td>
								<td rowspan="2">
									<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[2].id }}">
										<div class="container">
											<ul>
												<li style="width:190px; height:340px;">

													<div class="out_box">
														<div class="front_box"><img width="190" :src="''+bannerData[2].thumUrl" height="340"></div>
														<div class="back_box"><img width="190" :src="''+bannerData[2].thumUrl" height="340"></div>
													</div>
												</li>
											</ul>
										</div>
									</router-link>
								</td>

								<td rowspan="2">
									<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[3].id }}">
										<div class="container">
											<ul>
												<li style="width:275px; height:340px;">

													<div class="out_box">
														<div class="front_box"><img width="275" :src="''+bannerData[3].thumUrl" height="340"></div>
														<div class="back_box"><img width="275" :src="''+bannerData[3].thumUrl" height="340"></div>
													</div>

												</li>
											</ul>
										</div>
									</router-link>
								</td>
							</tr>
							<tr>

								<td>
									<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[4].id }}">
										<div class="container">
											<ul>
												<li style="width:190px; height:170px;">

													<div class="out_box">
														<div class="front_box"><img width="190" :src="''+bannerData[4].thumUrl" height="170"></div>
														<div class="back_box"><img width="190" :src="''+bannerData[4].thumUrl" height="170"></div>
													</div>

												</li>
											</ul>
										</div>
									</router-link>
								</td>
								<td>
									<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[5].id }}">
										<div class="container">
											<ul>
												<li style="width:190px; height:170px;">

													<div class="out_box">
														<div class="front_box"><img width="190" :src="''+bannerData[5].thumUrl" height="170"></div>
														<div class="back_box"><img width="190" :src="''+bannerData[5].thumUrl" height="170"></div>
													</div>

												</li>
											</ul>
										</div>
									</router-link>
								</td>
								<td>
									<router-link :to="{ path: '/WorkDetail', query: { productId: bannerData[6].id }}">
										<div class="container">
											<ul>
												<li style="width:190px; height:170px;">

													<div class="out_box">
														<div class="front_box"><img width="190" :src="''+bannerData[6].thumUrl" height="170"></div>
														<div class="back_box"><img width="190" :src="''+bannerData[6].thumUrl" height="170"></div>
													</div>

												</li>
											</ul>
										</div>
									</router-link>
								</td>
							</tr>
						</table>

					</div>
					<div class="lg_levels">
						<div class="lg_s" v-for="item in categoryData" v-if="item.items.length > 0">
							<div class="lg_nav nav_s">
								<router-link class='nav_title' :to="{ path: '/CategoryLookMore', query: { type: item.type }}">{{item.title}}</router-link>
								<div class="nav_s_more"><router-link :to="{ path: '/CategoryLookMore', query: { type: item.type }}">查看更多></router-link></div>
							</div>
							<div class="lg_content">
								<ul data-cid="10" data-seq="1">
									<li v-for="lidata in item.items">
										<router-link :to="{ path: '/WorkDetail', query: { productId: lidata.id }}">
											<img width="104" height="137" :src="lidata.thumUrl" />
										</router-link>
										<div class="lg_title">
											<router-link :to="{ path: '/WorkDetail', query: { productId: lidata.id }}">{{lidata.name}}</router-link>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div class="lg_a"></div>
				</div>
				<div class="lg_shop_nav"></div>
				<div class="lg_shop">
					<ul>
						<li v-for="(value,index) in adData" class="lg-shop-li" v-bind:style="{ marginRight: index==(adData.length-1)?'0':'27px'}">
							<img width="126px" height="80px" :src="value.thumUrl" />
						</li>
						<div class="clear_float"></div>
					</ul>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Header from './pages/Header.vue'
	import Footer from './pages/Footer.vue'
	import HTTPUtil from '../js/HttpUtil.js'

	export default {
		metaInfo:{
			title:'神龙漫',
			meta:[{
				name:'Keywords',
				content:'神龙漫画网首页,神龙漫画网,神龙漫,漫画列表,免费漫画,在线漫画,漫画大全,动漫之家,漫画网,无翻页漫画,少年漫画,热血漫画,少女漫画,搞笑漫画,古风漫画,优质漫画,H漫,摸鱼,漫画教程'
			},{
				name:'Description',
				content:'神龙漫画网站的首页,漫画资源丰富,交互体验俱佳,看漫画一键滑到低,无需翻页,少年少女漫画为广大青年提供优质健康的漫画内容'
			}]
		},
		components: {
			Header,
			Footer
		},
		data() {
			return {
				bannerData: [],
				categoryData: [],
				adData: []
			}
		},
		mounted() {
			HTTPUtil.get('home/getadAndBanner.do', null)
				.then(response => {
					console.log(response.data);
					if (response.data.code == 0) {
						let data = response.data.data;

						this.bannerData = data.banner.items;
						this.adData = data.Ad.items;
						// this.categoryData = data.Category;
						console.log('banner:' + this.bannerData.length);
						// console.log('categoryData:' + JSON.stringify(this.categoryData));
					}
				})
				.catch(function(error) {
					console.log(error);
				});

			// 获取banner
			HTTPUtil.get('home/getProducts.do', null)
				.then(response => {
					console.log('作品列表')
					console.log(response.data);
					if (response.data.code == 0) {
						let data = response.data.data;

						// this.bannerData = data.banner.items;
						// this.adData = data.Ad.items;
						this.categoryData = data.Category;
						// console.log('banner:' + this.bannerData.length);
						console.log('categoryData:' + JSON.stringify(this.categoryData));
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
</script>

<style>
	@import "../css/Home.css";
</style>
