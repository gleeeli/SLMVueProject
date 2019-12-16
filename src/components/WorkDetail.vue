<template>
	<div>
		<Header />
		<div class="wd-main" id="wdWorkDetail">
			<div class="slm-load-Status" v-if="getLoadStatus() != 1">{{loadStatusText}}</div>
			<!-- <PWorkDetailInfo :info="info" :firstCharptId="getChapterData(0,0).id" :productId="productId" :loadStatus="getLoadStatus()" v-if="isMobile" /> -->
			<PWorkDetailInfo :info="info" :firstCharptId="firstCharptId" :productId="productId" :loadStatus="getLoadStatus()" v-if="isMobile" />
			<PcWorkDetailInfo :info="info" :firstCharptId="firstCharptId" :productId="productId" :loadStatus="getLoadStatus()" v-if="!isMobile" />
			<div class="wd-catalogue-list">
				<div class="wd-catalogue-list-nav">
					<router-link v-bind:class="{'wcl-nav-t-active':curSelColumn==0}" class="wcl-nav-t"  :to="{ path: '/WorkDetail/list', query: { productId: productId,curSelColumn:0}}" >章节列表</router-link>
					<router-link v-bind:class="{'wcl-nav-t-active':curSelColumn==1}" class="wcl-nav-t" :to="{ path: '/WorkDetail/comment', query: { productId: productId,curSelColumn:1  }}" >评论区</router-link>
				</div>
				<router-view :key='key' ></router-view>

			</div>
		</div>
		<Footer />
	</div>

</template>

<script>
	import Header from './pages/Header.vue'
	import Footer from './pages/Footer.vue'
	import PWorkDetailInfo from './phone/PWorkDetailInfo.vue'
	import PcWorkDetailInfo from './pc/PcWorkDetailInfo.vue'
	import HTTPUtil from '../js/HttpUtil.js'

	export default {
		metaInfo() {
			return {
				title: this.info.name + '-' + '在线漫画-神龙漫官方网站',
				meta: [{
					name: 'Keywords',
					content: this.info.name + '漫画,' + this.info.name + '全集,' + this.info.name + '漫画全集,' + this.info.typeName +
						'在线漫画,' + this.info.typeName + ',神龙漫画,神龙漫官方网站'
				}, {
					name: 'Description',
					content: this.info.desciption
				}]
			}
		},
		components: {
			Header,
			Footer,
			PWorkDetailInfo,
			PcWorkDetailInfo
		},
		data() {
			return {
				loadStatusText: '',
				detailStatus: 0,
				productId: 0,
				info: {
					name: "",
					desciption: "",
					thumUrl: "",
					productId: 0
				},
				rows: 0,
				cataloguelist: [],
				isMobile: false,
				curSelColumn:0,
				firstCharptId:0,
			}
		},
		methods: {
			getLoadStatus: function(curRow) {
				if (this.detailStatus == 0) {
					this.loadStatusText = '正在努力加载···'
					return 0; //正在加载
				} else if (this.detailStatus == 1) {
					this.loadStatusText = ''
					return 1; //加载完成
				} else {
					this.loadStatusText = 'o(╥﹏╥)o  加载失败!，请刷新页面'
					return 2; //部分加载完成
				}
			},
			getColums: function(curRow) { //获取某一行有几列

				let needAll = curRow * 4 + 4;
				let interval = needAll - this.cataloguelist.length;
				var colums = interval > 0 ? (4 - interval) : 4;
				if (colums < 0) colums = 0;
				return colums;
			},
			getChapterIndex: function(curRow, curColumn) { //获取是数组的第几个

				let result = curRow * 4 + curColumn;

				return result;
			},
			getChapterData: function(curRow, curColumn) { //获取某个章节信息
				let index = this.$options.methods.getChapterIndex(curRow, curColumn);
				let data = {
					id: 0,
					name: ''
				};
				if (index < this.cataloguelist.length) {
					data = this.cataloguelist[index];
				}

				return data;
			},
			_isMobile() {
				console.log('测试。。。。')
				console.log(navigator.userAgent)
				let flag = navigator.userAgent.match(
					/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
				)
				return flag;
			}
		},
		mounted() {
			let productId = this.$route.query.productId;
			let curSelColumn = this.$route.query.curSelColumn;
			if (productId) {
				this.productId = productId;
			}
			
			if(curSelColumn) {
				this.curSelColumn = curSelColumn;
			}
			console.log('当前选中：'+curSelColumn);

			var params1 = new URLSearchParams();
			if (productId) {
				params1.append('productId', productId);
			}
			//详情
			HTTPUtil.post('product/detail.do', params1)
				.then(response => {
					console.log('详情：' + JSON.stringify(response.data));

					if (response.data.code == 0) {
						let data = response.data.data;
						let info = data.info;
						this.info = info;
						this.detailStatus = 1;
						this.firstCharptId = data.firstCharptId;
						//document.title = this.info.name;
					} else {
						this.detailStatus = -1;
					}
				})
				.catch(function(error) {
					console.log(error);
					this.detailStatus = -1;
				});

			if (this._isMobile()) {
				this.isMobile = true;
				console.log('是手机')
			} else {
				console.log('是PC')
				this.isMobile = false;
			}
		},
		computed:{
			  key(){
				  return this.$router.path  + Math.random();
			  }
		}
	}
</script>

<style>
	@import "../css/WorkDetails.css";
</style>
