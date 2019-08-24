<template>
	<div id="LCAllVue" class="lc-main-wrap" @mousemove="touchmove">
		<div class="top-nav" v-bind:class="{ 'hiddenDiv': isHiddenTopAndBottomNav }">
			<router-link class="logo-top" :to="{ path: '/'}"><img src="../resources/images/show/logo_white.png" height="30" /></router-link>
			<!-- <div class="top-nav-left">
				<router-link :to="{ path: '/'}"><img src="../resources/images/show/logo_white.png" height="30" /></router-link>
			</div> -->
			<router-link class="top-nav-title" :to="{ path: '/WorkDetail', query: { productId: productId }}">{{productName}}</router-link>>{{chapterName}}
		</div>
		<div class="lc-main-content" @click="clickSpaceArea">
			<section class="comic-pic-list-all">
				<ul class="comic-pic-list" data-cid="10" data-seq="1">
					<li class="comic-pic-item pic-loaded" v-for="purl in pictures">
						<div class="comic-pic-pad" data-width="800" data-height="546"></div>
						<div class="comic-pic-box">
							<img class="comic-pic" :src="purl" @load="imgloadHandle">
						</div>
					</li>
				</ul>
			</section>
			<div class="slm-load-Status" v-if="curLoadIndex < resources.length"><span>加载中...</span></div>
		</div>
		<div class="bottom-nav" v-bind:class="{ 'hiddenDiv': isHiddenTopAndBottomNav }">
			<router-link class="logo-bottom" :to="{ path: '/'}"><img src="../resources/images/show/logo_white.png" height="30" /></router-link>
			<div class="bottom-nav-right">
				<a class="b-a" v-on:click="clickChptersBtn()">目录</a>
				<a v-on:click="clickNext()" class="b-a" v-bind:class="{ 'b-a-bad': nextChapterId<=0 }">下一话</a>
				<a v-on:click="clickUp()" class="b-a" v-bind:class="{ 'b-a-bad': upChapterId<=0 }">上一话</a>
			</div>
		</div>
		<div id="wdCatalogueList" class="work-catalogue-list" v-bind:class="{ 'hiddenDiv': isHiddenTopAndBottomNav||isHiddenChapter }">

			<ul>
				<li v-for="(value,index) in cataloguelist">
					<router-link v-bind:class="{ 'active': value.id == activeChapterId }" :to="{ path: '/LookComic', query: {charptId:value.id, productId: productId }}"
					 :title="value.name">[{{ index + 1}}]&nbsp&nbsp&nbsp&nbsp{{ value.name }}</router-link>
					<!-- 	<a v-bind:class="{ 'active': index==active }" :href="'LookComic.html?charptId=' +value.id+'&productId='+productId"
					 :title="value.name">[{{ index }}]&nbsp&nbsp&nbsp&nbsp{{ value.name }}</a> -->
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import HTTPUtil from '../js/HttpUtil.js'
	import SLMUtil from '../js/SLMUtil.js'

	export default {
		metaInfo() {
			return {
				title: '《' + this.productName + '》' + this.chapterName + '-在线漫画-神龙漫官方网站',
				meta: [{
					name: 'Keywords',
					content: this.productName + '漫画,' + this.productName + '全集,' + this.productName + '漫画全集,神龙漫' + this.productName +
						',' + this.chapterName + ',动漫,漫画,在线漫画阅读,神龙漫官方网站'
				}, {
					name: 'Description',
					content: '《' + this.productName + '》《' + this.chapterName + '》在线阅读，漫画《' + this.productName + '》'
				}]
			}
		},
		data() {
			return {
				productId: 0,
				isHiddenChapter: true,
				isHiddenTopAndBottomNav: false,
				activeChapterId: 0,
				pictures: [],
				resources: [],
				cataloguelist: [],
				nextChapterId: -1,
				upChapterId: -1,
				productName: '',
				chapterName: '',
				curLoadIndex: 0,
				isEnterNavScope: false,
				// windowHeight:document.body.clientHeight 
			}
		},
		methods: {
			clickSpaceArea: function(event) {
				this.isHiddenTopAndBottomNav = !this.isHiddenTopAndBottomNav;
				console.log('点击space')
				if (!this.isHiddenTopAndBottomNav) { //用户要求必须显示
					this.isUserMustShowNav = true;
				} else {
					this.isUserMustShowNav = false;
				}

			},
			clickNext: function() {
				if (this.nextChapterId > 0) {
					this.$router.push({
						path: '/LookComic',
						query: {
							charptId: this.nextChapterId,
							productId: this.productId
						}
					})
					// window.location.href = 'LookComic.html?charptId=' + this.nextChapterId + '&productId=' + this.productId;
				}
			},
			clickUp: function() {
				if (this.upChapterId > 0) {
					this.$router.push({
						path: '/LookComic',
						query: {
							charptId: this.upChapterId,
							productId: this.productId
						}
					})
					// window.location.href = 'LookComic.html?charptId=' + this.upChapterId + '&productId=' + this.productId
				}
			},
			clickChptersBtn: function() {
				console.log('点击chapter');
				this.isHiddenChapter = !this.isHiddenChapter;

				var params = new URLSearchParams();
				params.append('productId', this.productId);
				params.append('pageNumber', '1');
				params.append('pageSize', '100');

				if (this.cataloguelist.length > 0) { //已经有目录数据
					return;
				}

				HTTPUtil.post('product/chapter/list.do', params)
					.then(response => {
						console.log(JSON.stringify(response.data));

						if (response.data.code == 0) {
							let data = response.data.data;
							let list = data.list;
							this.cataloguelist = list;
							console.log('长度：' + list.length + '\n' + list);

						}
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			handleScroll(e) {
				//变量scrollTop是滚动条滚动时，距离顶部的距离
				var scrollTop = e.target.documentElement.scrollTop || document.documentElement.scrollTop || window.pageYOffset ||
					document.body.scrollTop;
				//变量windowHeight是可视区的高度
				var windowHeight = e.target.documentElement.clientHeight;
				//变量scrollHeight是滚动条的总高度
				var scrollHeight = e.target.documentElement.scrollHeight;
				//滚动条到底部的条件
				if (scrollTop + windowHeight == scrollHeight) {
					//
					this.isHiddenTopAndBottomNav = false;
					//console.log('到达底部')
				} else if (scrollTop == 0) {
					this.isHiddenTopAndBottomNav = false;
				} else if (scrollTop > 0) {
					this.isHiddenTopAndBottomNav = true;
				}
			},
			imgloadHandle(e) {

				this.curLoadIndex++;
				if (this.curLoadIndex < this.resources.length) {
					console.log('加载第' + this.curLoadIndex + '张')
					this.pictures.push(this.resources[this.curLoadIndex]);
				}
			},
			// 当鼠标移动时触发
			touchmove(e) {
				// 获取y 坐标
				// let mY = event.offsetY
				let mY = event.clientY;

				var windowHeight = SLMUtil.getClientHeight()
				if (mY < 50 || mY >= windowHeight - 50) { //进入范围
					this.isHiddenTopAndBottomNav = false;
					this.isEnterNavScope = true;
				} else { //鼠标离开导航栏
					//用户没要求显示，且当前滚动条非滑到顶部或者底部则隐藏
					if (this.isEnterNavScope) {
						this.isEnterNavScope = false;
						this.isHiddenTopAndBottomNav = true;
					}
				}
			}
		},
		mounted() {
			let productId = this.$route.query.productId;
			// let productId = getQueryVariable('productId');
			this.productId = productId;
			//获取本话所有图片
			let charptId = this.$route.query.charptId;
			// let charptId = getQueryVariable('charptId');
			this.activeChapterId = charptId;

			var params = new URLSearchParams();
			if (productId) {
				params.append('productId', productId);
			}
			if (charptId) {
				params.append('chapterId', charptId);
			}
			params.append('pageNumber', '1');
			params.append('pageSize', '200');

			console.log('请求参数：' + charptId + 'pid:' + productId)
			HTTPUtil.post('product/getChapter.do', params)
				.then(response => {
					// console.log('图片s：' + JSON.stringify(response.data));

					if (response.data.code == 0) {
						let Chapt = response.data.data.Chapter;
						let info = Chapt.episodeVos[0];

						this.resources = info.resources;
						if (this.resources.length > 0) {
							this.curLoadIndex = 0;
							this.pictures.push(this.resources[this.curLoadIndex]);
						}
						this.nextChapterId = Chapt.nextChapterId;
						this.upChapterId = Chapt.upChapterId;
						this.chapterName = Chapt.name;
						console.log('长度：' + this.pictures[0] + '\n');
						this.productName = Chapt.productName;
						document.title = this.productName;
					}
				})
				.catch(function(error) {
					console.log(error);
				});

			let content = document.getElementById("wdCatalogueList")
			content.style.height = window.innerHeight - 140 + "px"
			window.onresize = function() {
				let content = document.getElementById("wdCatalogueList")
				content.style.height = window.innerHeight - 140 + "px"
			}
			console.log('*****监听滚动到底');
			//监听滚动到底
			window.addEventListener('scroll', this.handleScroll, true);
		}
	}
</script>

<style>
	@import "../css/LookComic.css";
	@import "../css/SLMComm.css";
</style>
