<template>
	<div class="wd-main" id="wdWorkDetail">
		<div class="slm-load-Status" v-if="getLoadStatus() != 1">{{loadStatusText}}</div>
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
				<div class="wd-info-right-bottom" v-if="getLoadStatus() == 1">
					<a class="works-intro-view" :title="'开始阅读'+info.name" :href="'LookComic.html?charptId='+getChapterData(0,0).id+'&productId='+productId">开始阅读</a>
	
				</div>
			</div>
		</div>
		<div class="wd-catalogue-list">
			<div class="wd-catalogue-list-nav">
				<label class="wcl-nav-t">章节列表</label>
			</div>
			<div class="works-chapter-list-wr">
				<ol class="works-chapter-list">
					<li v-for="row in rows">
						<p>
							<span class="works-chapter-item" v-for="column in getColums(row -1)">
								<a target="_blank" :title="column" :href="'LookComic.html?charptId='+getChapterData(row-1,column-1).id+'&productId='+productId">
									{{getChapterData(row-1,column-1).name}}
								</a>
							</span>
						</p>
					</li>
				</ol>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from './Header.vue'
	import HTTPUtil from '../js/HttpUtil.js'
	
	export default {
	  data() {
	  	return {
	  		loadStatusText:'',
	  		detailStatus:0,
	  		catelistStatus:0,
	  		productId:0,
	  		info: {
	  			name: "",
	  			desciption: "",
	  			thumUrl: "",
	  			productId:0
	  		},
	  		rows: 0,
	  		cataloguelist: []
	  	}
	  },
	  methods: {
	  	getLoadStatus: function(curRow) {
	  		if (this.detailStatus==0 || this.catelistStatus == 0){
	  			this.loadStatusText = '正在努力加载···'
	  			return 0;//正在加载
	  		}else if (this.detailStatus==1 && this.catelistStatus == 1){
	  			this.loadStatusText = ''
	  			return 1;//加载完成
	  		}else {
	  			this.loadStatusText = 'o(╥﹏╥)o  加载失败!，请刷新页面'
	  			return 2;//部分加载完成
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
	  		let data = {id:0,name:''};
	  		if(index< this.cataloguelist.length){
	  			data = this.cataloguelist[index];
	  		}
	  		
	  		return data;
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
	  			}else {
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
	  				document.title = this.info.name;
	  			}else {
	  				this.detailStatus = -1;
	  			}
	  		})
	  		.catch(function(error) {
	  			console.log(error);
	  			this.detailStatus = -1;
	  		});
	  }
	}
</script>

<style>
	@import "../css/WorkDetails.css";
</style>
