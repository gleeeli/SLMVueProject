<template>
	<div>
	<div id="header">
		<div class="header_title">
			<span class="title_con">神龙漫管理系统</span>
		</div>
	</div>
	<div id="content">
		<center>
			<div class="con">
			<div class="con_title">
				<span class="con_title_sp">欢迎登录神龙漫管理系统</span>
			</div>
			<div class="con_panel">
				<div class="con_input">
					<span>用户名：</span><input type="text" placeholder="请输入用户呢称" v-model="userName">
				</div>
				<div class="con_input">
					<span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span><input type="text" placeholder="密码" v-model="password">
				</div>
				<div class="con_select">
					<input type="radio" name="t1" value="管理员" checked="checked">管理员
				</div>
				<button type="submit"  class="submit-btn" @click="startLogin()">
					登 录
				</button>
			</div>
		</div>
		</center>
	</div>
	</div>
</template>

<script>
	import HTTPUtil from '../js/HttpUtil.js'
	import CookieUtil from '../js/CookieUtil.js'
	
	export default {
		data() {
			return {
				userName:'admin',
				password:''
				
			}
		},
		methods:{
			 startLogin:function(){
				 console.log("startLogin2");
				 console.log("password:"+this.password)
				 var params = new URLSearchParams();
				 params.append('username', this.userName);
				 params.append('password', this.password);
				 HTTPUtil.post('admin/login.do', params)
				 	.then(response => {
				 		console.log(response.data);
				 		if (response.data.code == 0) {
				 			this.$AdminDefined.user = response.data.data;
							console.log("sessionKey="+this.$AdminDefined.user.userExt.sessionKey);
							CookieUtil.set(CookieUtil.sessionKey,this.$AdminDefined.user.userExt.sessionKey);
				 			this.$router.push({path:'/admin/home'})
				 		}
				 	})
				 	.catch(function(error) {
				 		console.log(error);
				 	});
			 }
		},
		mounted() {
			
		}
	}
</script>

<style>
	@import "./css/ALogin.css";
</style>
