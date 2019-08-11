<template>
	<div class="nav-category-list-main">
		<div id="navCategoryList" class="nav-category-list">

			<ul>
				<li v-bind:class="{ lixiexian: index>0,'active': value.type==active }" v-for="(value,index) in sites">
					<router-link :to="toUrl(value.type)"><span>{{value.name}}</span></router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'TopNavCategory',
		data() {
			return {
				active: 0,
				sites: [{
						name: '首页',
						type: '0'
					},
					{
						name: '少年',
						type: '1'
					},
					{
						name: '少女',
						type: '2'
					},
					{
						name: '推荐',
						type: '-3'
					},
					{
						name: '更新',
						type: '-4'
					},
					{
						name: '人气',
						type: '-5'
					}
				]
			}
		},
		methods:{
			toUrl(type){
				if(type != 0){
					return { path: '/CategoryLookMore', query: { type: type }}
				}else {
					return { path: '/'}
				}
			}
		},
		mounted() {
			let type = this.$route.query.type;
			console.log('拿到type:' + type);
			if (type) {
				this.active = type;
				console.log('active:' + this.active);
			}
		}
	}
</script>

<style>
	@import "../css/TopNavCategory.css";
</style>
