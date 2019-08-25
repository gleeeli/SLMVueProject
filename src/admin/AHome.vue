<template>
	<div>
			<div class="AHcontainer">
				<div class="logo">
					<router-link :to="{ path: '/admin/home'}" replace>神龙漫管理后台</router-link>
					<img class="AHheader" :src="headerUrl"> </img>
					<span>{{userName}}</span>
					</div>
			</div>
			<div class="AHleft-nav">
				<div id="side-nav">
					<ul id="nav">
						<li v-bind:class='{titleCurrent:currentIndex==index}' v-for="(item,index) in titles">
							<!-- <a @click="setCurrentPage(item,index)">{{item.name}}</a> -->
							<!-- <router-link @click.native="setCurrentPage(item,index)" :to="{ path: item.path}" replace>
							{{item.name}}</router-link> -->
							<a v-on:click="jumptoRouter(item,index)">{{item.name}}</a>
						</li>
					</ul>
				</div>
			</div>
			
			<router-view :key='key' />
			
	</div>
</template>

<script>
	import HTTPUtil from '../js/HttpUtil.js'
	import CookieUtil from '../js/CookieUtil.js'
	export default {
		data() {
			return {
				headerUrl:this.$AdminDefined.user.headUrl,
				userName:this.$AdminDefined.user.username,
				currentIndex:this.$AdminDefined.homeCurrentTitleIndex,
				titles: [{name:'作品管理',path:'/admin/home/product/list'},{name:'用户管理',path:'/admin/home/user/userList'}],
				
			}
		},
		methods: {
			jumptoRouter:function(item,index){
				this.$AdminDefined.homeCurrentTitleIndex = index;
				this.currentIndex = index;
				console.log("将要跳转:"+item.path+'index:'+index);
				this.$router.push({path:item.path})
			}
		},mounted() {
			console.log("currentIndex="+this.currentIndex);
			// console.log("headUrl="+this.$AdminDefined.user.headUrl);
			// console.log("sessionKey2="+this.$AdminDefined.user.userExt.sessionKey);
			
			var params = new URLSearchParams();
			params.append(CookieUtil.sessionKey, CookieUtil.get("sessionKey"));
			HTTPUtil.post('admin/userDetail.do', params)
				.then(response => {
					console.log("userDetail="+response.data);
					if (response.data.code == 0) {
						this.headerUrl = response.data.data.user.headUrl;
						this.userName = response.data.data.user.username;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
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
