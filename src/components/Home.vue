<template>
	<div>
		<Header />
		<div class="lg_body_wrap" id="homeData">
			<div class="lg_body_content">
				<div class="lg_left">
					<div class="lg_ring">
						<BannerPhone :bannerData="bannerData" v-if="isMobile" />
						<BannerPc :bannerData="bannerData" v-if="!isMobile" />
					</div>
					<div class="lg_levels">
						<div class="lg_s" v-for="item in categoryData" v-if="item.items.length > 0">
							<div class="lg_nav nav_s">
								<router-link class='nav_title' :to="{ path: '/CategoryLookMore', query: { type: item.type }}">{{item.title}}</router-link>
								<div class="nav_s_more">
									<router-link :to="{ path: '/CategoryLookMore', query: { type: item.type }}">查看更多></router-link>
								</div>
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
	import BannerPc from './BannerPc.vue'
	import BannerPhone from './BannerPhone.vue'
	import HTTPUtil from '../js/HttpUtil.js'
	import CookieUtil from '../js/CookieUtil.js'

	export default {
		metaInfo: {
			title: '神龙漫',
			meta: [{
				name: 'Keywords',
				content: '神龙漫画网首页,神龙漫画网,神龙漫,漫画列表,免费漫画,在线漫画,漫画大全,动漫之家,漫画网,无翻页漫画,少年漫画,热血漫画,少女漫画,搞笑漫画,古风漫画,优质漫画,H漫,摸鱼,漫画教程'
			}, {
				name: 'Description',
				content: '神龙漫画网站的首页,漫画资源丰富,交互体验俱佳,看漫画一键滑到低,无需翻页,少年少女漫画为广大青年提供优质健康的漫画内容'
			}]
		},
		components: {
			Header,
			Footer,
			BannerPc,
			BannerPhone
		},
		data() {
			return {
				bannerData: [],
				categoryData: [],
				adData: [],
				isMobile:false,
			}
		},
		methods: {
			_isMobile() {
				console.log('测试。。。。')
				console.log(navigator.userAgent)
				let flag = navigator.userAgent.match(
					/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
				)
				return flag;
			},
			addVistoryUser(){
							//添加游客
							var params = new URLSearchParams();
							params.append(CookieUtil.sessionKey, CookieUtil.getBrowserIdentify());
							console.log("sessionKey is ");
							console.log(CookieUtil.getBrowserIdentify());
							HTTPUtil.post('user/visitor/add.do', params)
								.then(response => {
									console.log(response.data);
									if (response.data.code == 0 || response.data.code == -2) {
										CookieUtil.set(CookieUtil.sessionKey,CookieUtil.getBrowserIdentify());
									}
								})
								.catch(function(error) {
									console.log(error);
								});
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
						console.log('categoryData:' + JSON.stringify(this.bannerData));
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
						this.categoryData = data.Category;
						// console.log('banner:' + this.bannerData.length);
						// console.log('categoryData:' + JSON.stringify(this.categoryData));
					}
				})
				.catch(function(error) {
					console.log(error);
				});
				
				//添加游客信息
				var sessionKey = CookieUtil.get("sessionKey");
				if(sessionKey == null){
					//添加游客
					console.log('需要添加游客');
									this.addVistoryUser();
				}else{
					console.log('sessionKey='+sessionKey);
					//判断用户是否已经存在了
										var params = new URLSearchParams();
										params.append(CookieUtil.sessionKey, sessionKey);
										HTTPUtil.post('user/getDetail.do', params)
											.then(response => {
												console.log(response.data);
												if (response.data.code != 0) {
													// CookieUtil.set(CookieUtil.sessionKey,CookieUtil.getBrowserIdentify());
													//不存在则添加游客
													this.addVistoryUser();
												}
											})
											.catch(function(error) {
												console.log(error);
											});
				}

				
				if(this._isMobile()){
					this.isMobile = true;
					console.log('是手机')
				}else {
					console.log('是PC')
					this.isMobile = false;
				}
		}
	}
</script>

<style>
	@import "../css/Home.css";
</style>
