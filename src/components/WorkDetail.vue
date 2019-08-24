<template>
	<div>
		<Header />
		<div class="wd-main" id="wdWorkDetail">
			<div class="slm-load-Status" v-if="getLoadStatus() != 1">{{loadStatusText}}</div>
			<PWorkDetailInfo :info="info" :firstCharptId="getChapterData(0,0).id" :productId="productId" :loadStatus="getLoadStatus()" v-if="isMobile" />
			<PcWorkDetailInfo :info="info" :firstCharptId="getChapterData(0,0).id" :productId="productId" :loadStatus="getLoadStatus()" v-if="!isMobile" />
			<div class="wd-catalogue-list">
				<div class="wd-catalogue-list-nav">
					<label class="wcl-nav-t">章节列表</label>
				</div>
				<div class="works-chapter-list-wr">
					<ol class="works-chapter-list">
						<li v-for="row in rows">
							<p>
								<span class="works-chapter-item" v-for="column in getColums(row -1)">
									<router-link :title="'开始阅读'+info.name" :to="{ path: '/LookComic', query: {charptId:getChapterData(row-1,column-1).id, productId: productId }}">
										{{getChapterData(row-1,column-1).name}}
									</router-link>
								</span>
							</p>
						</li>
					</ol>
				</div>
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
				catelistStatus: 0,
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
			}
		},
		methods: {
			getLoadStatus: function(curRow) {
				if (this.detailStatus == 0 || this.catelistStatus == 0) {
					this.loadStatusText = '正在努力加载···'
					return 0; //正在加载
				} else if (this.detailStatus == 1 && this.catelistStatus == 1) {
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
			var params = new URLSearchParams();
			if (productId) {
				this.productId = productId;
				params.append('productId', productId);
			}

			params.append('pageNumber', '1');
			params.append('pageSize', '10000');

			HTTPUtil.post('product/chapter/list.do', params)
				.then(response => {
					console.log(response.data);

					if (response.data.code == 0) {
						let data = response.data.data;
						let list = data.list;
						let rows = Math.ceil(list.length / 4.0);
						this.rows = rows;
						this.cataloguelist = list;
						console.log('行数:' + this.rows + '长度：' + list.length + '\n');
						this.catelistStatus = 1;
					} else {
						this.catelistStatus = -1;
					}
				})
				.catch(function(error) {
					console.log(error);
					this.catelistStatus = -1;
				});

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
		}
	}
</script>

<style>
	@import "../css/WorkDetails.css";
</style>
