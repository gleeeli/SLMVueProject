<template>
	<div id="LCAllVue" class="lc-main-wrap">
		<div class="top-nav" v-bind:class="{ 'hiddenDiv': isHiddenTopAndBottomNav }">
			<div class="top-nav-left">
				<router-link :to="{ path: '/'}">神龙漫</router-link>
				</div>
				<router-link :to="{ path: '/WorkDetail', query: { productId: productId }}">{{productName}}</router-link>>{{chapterName}}
		</div>
		<div class="lc-main-content" @click="clickSpaceArea">
			<section class="comic-pic-list-all">
				<ul class="comic-pic-list" data-cid="10" data-seq="1">
					<li class="comic-pic-item pic-loaded" v-for="purl in pictures">
						<div class="comic-pic-pad" data-width="800" data-height="546"></div>
						<div class="comic-pic-box">
							<img class="comic-pic" :src="purl">
						</div>
					</li>
				</ul>
			</section>

		</div>
		<div class="bottom-nav" v-bind:class="{ 'hiddenDiv': isHiddenTopAndBottomNav }">
			<a class="b-a" v-on:click="clickChptersBtn()">目录</a>
			<a v-on:click="clickNext()" class="b-a" v-bind:class="{ 'b-a-bad': nextChapterId<=0 }">下一话</a>
			<a v-on:click="clickUp()" class="b-a" v-bind:class="{ 'b-a-bad': upChapterId<=0 }">上一话</a>
		</div>
		<div id="wdCatalogueList" class="work-catalogue-list" v-bind:class="{ 'hiddenDiv': isHiddenTopAndBottomNav||isHiddenChapter }">

			<ul>
				<li v-for="(value,index) in cataloguelist">
					<router-link v-bind:class="{ 'active': value.id == activeChapterId }" :to="{ path: '/LookComic', query: {charptId:value.id, productId: productId }}" :title="value.name">[{{ index + 1}}]&nbsp&nbsp&nbsp&nbsp{{ value.name }}</router-link>
				<!-- 	<a v-bind:class="{ 'active': index==active }" :href="'LookComic.html?charptId=' +value.id+'&productId='+productId"
					 :title="value.name">[{{ index }}]&nbsp&nbsp&nbsp&nbsp{{ value.name }}</a> -->
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import HTTPUtil from '../js/HttpUtil.js'
	
	export default {
		metaInfo(){
			return {
				title:'《'+this.productName+'》'+this.chapterName+'-在线漫画-神龙漫官方网站',
				meta:[{
					name:'Keywords',
					content:this.productName+'漫画,'+this.productName+'全集,'+this.productName+'漫画全集,神龙漫'+this.productName+','+this.chapterName+',动漫,漫画,在线漫画阅读,神龙漫官方网站'
				},{
					name:'Description',
					content:'《'+this.productName+'》《'+this.chapterName+'》在线阅读，漫画《'+this.productName+'》'
				}]
			}
		},
		data() {
			return {
				productId: 0,
				isHiddenChapter: true,
				isHiddenTopAndBottomNav: true,
				activeChapterId: 0,
				pictures: [],
				cataloguelist: [],
				nextChapterId: -1,
				upChapterId: -1,
				productName: '',
				chapterName: ''
				// windowHeight:document.body.clientHeight 
			}
		},
		methods: {
			clickSpaceArea: function(event) {
				this.isHiddenTopAndBottomNav = !this.isHiddenTopAndBottomNav;
				console.log('点击space')
			},
			clickNext: function() {
				if (this.nextChapterId > 0) {
					this.$router.push({ path: '/LookComic', query: {charptId:this.nextChapterId, productId: this.productId }})
					// window.location.href = 'LookComic.html?charptId=' + this.nextChapterId + '&productId=' + this.productId;
				}
			},
			clickUp: function() {
				if (this.upChapterId > 0) {
					this.$router.push({ path: '/LookComic', query: {charptId:this.upChapterId, productId: this.productId }})
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
					console.log('图片s：' + JSON.stringify(response.data));

					if (response.data.code == 0) {
						let Chapt = response.data.data.Chapter;
						let info = Chapt.episodeVos[0];
						this.pictures = info.resources;
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
		}
	}
	
</script>

<style>
	@import "../css/LookComic.css";
</style>
