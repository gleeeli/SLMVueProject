<template>
	<div class="ALpage-content">
		<ul>
			<li>作品列表</li>
		</ul>
		<div class="layui-card-body ">
			<table class="layui-table layui-form">
				<thead>
					<tr style="height: 39px;">
						<th> 
						<input style="width: 25px;height: 25px;" type="checkbox" name="" lay-skin="primary">
						</th>
						<th v-for="item in colnums">
							{{item.name}}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in products">
						<td>
							<input style="width: 25px;height: 25px;" type="checkbox" :checked="item.isSelect" name="" lay-skin="primary">
						</td>
						<td>{{item.name}}</td>
						<td>{{item.author}}</td>
						<td>
						{{item.status==1?"连载中":"完结"}}</td>
						<td>
							<div v-if="item.audit == 0">
								未审核
							</div>
							<div v-else-if="item.audit == 1">
								审核通过
							</div>
							<div v-else>
								审核未通过
							</div>
						</td>
						<td>
							<button class="ALauditButton" v-if="item.audit == 0 || item.audit == 2" @click="allowAudit(item)">
								允许通过
							</button>
							<button class="ALauditButton" style="position: relative; left: 10px;" v-if="item.audit == 1 || item.audit == 0" 
							@click="refuseAudit(item)">
								拒绝通过
							</button>
							
						</td>
					</tr>
				</tbody>
			</table>
			<div class="layui-card-body ">
				<div class="page">
					<button @click="upPageAction()"> << </button>
					<button v-bind:class='{current:(currentIndex-1)==index}'  v-for="(item,index) in pages"
					 @click="jumpPageAction(item,index)">{{item.name}}</button>
					 <button @click="nextPageAction()"> >> </button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HTTPUtil from '../../js/HttpUtil.js'
	
	 export default {
		data() {
			return {
				currentIndex: 1,
				pageInfo:{lastPage: true,nextPage: 1,prePage: 1,totalPage: 1},
				pages: [{name:'test'}],
				colnums: [{name:'作品名称'},{name:'作者'},{name:'是否连载'},{name:'审核状态'},{name:'操作'}],
				products: [{isSelect:true,name:'第一个作品',author:'luoluo',status:1,audit:0}]
				
			}
		},
		methods: {
			allowAudit:function(item){
				console.log(item.name);
				//1通过审核
				this.setAuditAction(item,1);
			},
			refuseAudit:function(item){
				console.log(item.name);
				//2代表拒绝通过
				this.setAuditAction(item,2);
			},
			upPageAction:function(){
					this.currentIndex = this.pageInfo.prePage;
					this.getProductListIndex();
				
			},
			nextPageAction:function(){
				this.currentIndex = this.pageInfo.nextPage;
				this.getProductListIndex();
			},
			jumpPageAction:function(item,index){
				console.log(item.name);
				this.currentIndex = index+1;
				this.getProductListIndex();
				
			},
			setAuditAction:function(item,audit){
				var params = new URLSearchParams();
				params.append('productId', item.id);
				params.append('audit', audit);
				HTTPUtil.post('product/setAudit.do', params)
					.then(response => {
						console.log('图片s：' + JSON.stringify(response.data));
				
						if (response.data.code == 0) {
							//修改成功
							item.audit = audit;
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			getProductListIndex:function(){
				var params = new URLSearchParams();
				params.append('pageNumber', this.currentIndex);
				params.append('pageSize', '12');
				HTTPUtil.post('product/list.do', params)
					.then(response => {
						console.log('图片s：' + JSON.stringify(response.data));
				
						if (response.data.code == 0) {
							let list = response.data.data.list;
							for (let s of list) {
								s.isSelect = false
							}
							this.products = list;
							let paginationVo = response.data.data.paginationVo;
							this.pageInfo = paginationVo;
							this.pages = [];
							for(var i = 0;i<this.pageInfo.totalPage;i++){
								var object = {};
								object.name = i+1;
								this.pages.push(object);
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		},
		mounted() {
			this.getProductListIndex();
		}
	}
</script>

<style>
	@import "../css/AHome.css";
</style>
