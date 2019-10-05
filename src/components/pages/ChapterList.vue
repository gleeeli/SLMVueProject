<template>
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
</template>

<script>
	import HTTPUtil from '../../js/HttpUtil.js'

	export default {
		data() {
			return {
				loadStatusText: '',
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
				if (this.catelistStatus == 0) {
					this.loadStatusText = '正在努力加载···'
					return 0; //正在加载
				} else if (this.catelistStatus == 1) {
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
	@import "../../css/ChapterList.css";
</style>
