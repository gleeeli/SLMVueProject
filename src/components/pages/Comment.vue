<template>
	<div class="comment-main">
		<div class="slm-load-Status" v-if="getLoadStatus() != 1">{{loadStatusText}}</div>
		<div class="comment-list-wr">
			<ol class="comment-list">
				<li v-for="(value,index) in commentlist">
					<div class="comment-content-left">
						<img src="../../resources/images/show/logo_icon.png" :width="50" :height="50" />
						<label class="user-name">游客{{value.id}}</label>
						</div>
					<div class="comment-content-right">
						<p>{{value.content}}</p>
						<div class="comment-cr-bottom">
							<label class="comment-floor">第{{index}}楼</label>
							<label>{{value.createTime}}</label>
						</div>
					</div>
				</li>
			</ol>
		</div>
		<div class="comment-make">
			<label class="comment-make-title">发表评论:</label>
			<textarea class="comment-textarea" placeholder="请输入评论内容" rows="5" v-on:input="inputchange" v-model="commentTextAreaValue"></textarea>
			<div class="comment-make-bottom">
				<div class="comment-make-limitwords"><label>还可以输入{{maxCommentWordsLenght}}字</label></div>
				<button class="comment-make-bottom-button" v-on:click="addComment">发表</button>
			</div>
			<div v-if="errorMsg !=''" class="comment-error"><label>{{errorMsg}}</label></div>
		</div>
	</div>

</template>

<script>
	import HTTPUtil from '../../js/HttpUtil.js'
	import CookieUtil from '../../js/CookieUtil.js'

	export default {
		data() {
			return {
				loadStatusText: '',
				loadStatus: 0,
				commentlist: [],
				commentTextAreaValue: '',
				maxCommentWordsLenght: 1000,
				errorMsg: '',
				lastInputvalue : '',
			}
		},
		methods: {
			getLoadStatus: function(curRow) {
				if (this.loadStatus == 0) {
					this.loadStatusText = '正在努力加载···'
					return 0; //正在加载
				} else if (this.loadStatus == 1) {
					this.loadStatusText = ''
					return 1; //加载完成
				} else {
					this.loadStatusText = 'o(╥﹏╥)o  加载失败!，请刷新页面'
					return 2; //部分加载完成
				}
			},
			inputchange(e) {
				//console.log('评论输入：' + e)
				this.maxCommentWordsLenght = 1000 - this.commentTextAreaValue.length;
				if(this.maxCommentWordsLenght >= 0)  {
					this.lastInputvalue = this.commentTextAreaValue;
				}else {
					this.commentTextAreaValue = this.lastInputvalue;
					this.maxCommentWordsLenght = 0;
				}
			},
			loadCommentList:function() {
				var params = new URLSearchParams();
				params.append('productId', this.productId);
				
				params.append('pageNumber', '1');
				params.append('pageSize', '50');
				
				HTTPUtil.post('comment/list.do', params)
					.then(response => {
						console.log(response.data);
				
						if (response.data.code == 0) {
							let data = response.data.data;
							let list = data.list;
							this.commentlist = list;
							// this.commentlist = [{'id':1,content:'测试评论内容','createTime':'2019-08-2514:25:36'}]
							this.loadStatus = 1;
							//console.log('评论列表：' + JSON.stringify(this.commentlist))
						} else {
							this.loadStatus = -1;
						}
					})
					.catch(function(error) {
						console.log(error);
						this.loadStatus = -1;
					});
			},
			addComment: function() {
				var sessionKey = CookieUtil.get("sessionKey");
				console.log('用户信息：' + JSON.stringify(sessionKey))
				if(sessionKey == null) {
					this.errorMsg = '用户未注册，点击首页即可注册！'
					return;
				}else if(this.commentTextAreaValue.length > 1000) {
					this.errorMsg = '评论失败，字数超限'
					return;
				}
				var params = new URLSearchParams();

				params.append('productId', this.productId);
				params.append('sessionKey', sessionKey);
				params.append('content', this.commentTextAreaValue);
				console.log('参数：'+params);
				let sel = this;
				HTTPUtil.post('comment/add.do', params)
					.then(response => {
						console.log(response.data);

						if (response.data.code == 0) {
							let data = response.data.data;
							console.log('评论列表：' + JSON.stringify(data))
							this.errorMsg = ''
							this.loadCommentList()
						} else {
							this.errorMsg = response.data.message;
						}
					})
					.catch(function(error) {
						console.log(error);
						sel.errorMsg = '评论失败，网络异常，请稍后再试o(╥﹏╥)o';
					});
			}
		},
		mounted() {

			let productId = this.$route.query.productId;
			console.log('拿到评论区作品id:' + productId);
			if (productId) {
				this.productId = productId;
			}
			this.loadCommentList();
		},
	}
</script>

<style>
	@import "../../css/comment.css";
</style>
