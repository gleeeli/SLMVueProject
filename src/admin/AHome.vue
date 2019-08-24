<template>
	<div>
			<div class="AHcontainer">
				<div class="logo">
					<router-link :to="{ path: '/admin/home'}" replace>神龙漫管理后台</router-link>
					</div>
			</div>
			<div class="AHleft-nav">
				<div id="side-nav">
					<ul id="nav">
						<li v-bind:class='{titleCurrent:currentIndex==index}' v-for="(item,index) in titles">
							<!-- <a @click="setCurrentPage(item,index)">{{item.name}}</a> -->
							<router-link @click.native="setCurrentPage(item,index)" :to="{ path: item.path}" replace>{{item.name}}</router-link>

						</li>
					</ul>
				</div>
			</div>
			
			<router-view :key='key' />
			
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex:0,
				titles: [{name:'作品管理',path:'/admin/home/product/list'},{name:'用户管理',path:'/admin/home/user/userList'}],
				
			}
		},
		methods: {
			setCurrentPage:function(item,index){
				console.log(index);
				this.currentIndex = index;
				
				
			}
		},mounted() {
			console.log("currentIndex="+this.currentIndex);
		},
		computed:{
			  key(){
				  return this.$router.path +  Math.random();
			  }
		}
	}
</script>

<style>
	@import "./css/AHome.css";
</style>
