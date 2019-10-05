<template>
	<div class="DCcontainer">

		<div class="DCTitleText">向神龙许愿吧</div>
		<div class="DCToolView">
			<div class="DCToolViewUsername">{{userName}}</div>
			<button class="DCnavCloseButton" @click="closeWebSocket()">退出</button>
		</div>



		<div class="DCgroupChatContent" id="message">
			<ul>
				<li v-for="(item,index) in allMessages">
					<span :style="item.style">{{item.name+':'+item.content}}</span>
				</li>
			</ul>
		</div>
		<div class="DCinputTextBg">
			<input class="DCchatInput" id="text" type="text" v-model="inputText" />
			<button class="DCchatSendButton" @click="send()">发送消息</button>
		</div>

	</div>
</template>

<script>
	import HTTPUtil from '../../js/HttpUtil.js'
	import CookieUtil from '../../js/CookieUtil.js'
	var that = null;
	export default {
		data() {
			return {
				websocket: {},
				currentGroupSessionId: null,
				sessionId: null,
				inputText: '',
				userName: '用户名',
				allMessages: [],
				sessionKey:null,

			}
		},
		methods: {
			closeWebSocket: function() {
				this.websocket.close();
				this.$router.push({
					path: '/Home',
				})
			},
			send: function() {
				// var text = document.getElementById('text').value;
				var text = that.inputText;
				that.sendGroupMessage(text);
				that.inputText = '';
			},
			sendGroupMessage: function(str) {
				if (str == null) {
					alert('发送内容不能为空');
					return;
				}
				if (this.sessionId == null) {
					alert('用户登录失败、请重新进入页面.')
					return;
				}
				var message = {};
				message.type = 'MG'
				message.to = this.currentGroupSessionId;
				message.from = this.sessionId;
				message.data = str;
				this.sendMessage(message);
			},
			//发送加入群组消息
			iqJoinGroup: function() {
				if (this.currentGroupSessionId == null) {
					alert('未获取到官方群信息!');
					return;
				}
				var message = {};
				message.type = 'IQ';
				message.cmd = '4';
				message.groupIdentify = this.currentGroupSessionId;
				this.sendMessage(message);
			},
			//获取群列表
			iqGetGroupList: function() {
				var message = {};
				message.type = 'IQ';
				message.cmd = '1';
				this.sendMessage(message);
			},
			iqGetGroupMessageHistoryList: function() {
				var message = {};
				message.type = 'IQ';
				message.cmd = '6';
				message.groupIdentify = this.currentGroupSessionId;
				this.sendMessage(message);
			},
			//统一使用此方法发送指令
			sendMessage: function(msg) {
				var jsonStr = JSON.stringify(msg);
				console.log(jsonStr);
				this.websocket.send(jsonStr);
			}

		},
		mounted() {
			console.log('mounted--');
			that = this;
			//判断当前浏览器是否支持WebSocket
			if ('WebSocket' in window) {
				var sessionKey = CookieUtil.get("sessionKey");
				if (sessionKey == null) {
					alert('未获取到登录信息、进入聊天界面失败!');
					return;
				}
				this.userName = '用户名:' + '游客' + sessionKey;
				var sessionId = sessionKey + "@html";
				this.sessionId = sessionId;
				this.sessionKey = sessionKey;
				console.log(sessionId);
				var socketUrl = HTTPUtil.websocketBaseUrl() + sessionId;
				this.websocket = new WebSocket(socketUrl);
			} else {
				alert('当前浏览器 Not support websocket')
			}

			//连接发生错误的回调方法
			this.websocket.onerror = function() {
				//改为自定义消息
				var mes = {};
				mes.name = '系统消息';
				mes.content = 'WebSocket连接发生错误';
				mes.style = {
					color: '#A9A9A9'
				};
				setMessageInnerHTML(mes);
			};

			//连接成功建立的回调方法
			this.websocket.onopen = function() {
				var mes = {};
				mes.name = '系统消息';
				mes.content = '连接成功';
				mes.style = {
					color: '#A9A9A9'
				};
				setMessageInnerHTML(mes);
				//请求群列表
				that.iqGetGroupList();
			}

			//接收到消息的回调方法
			this.websocket.onmessage = function(event) {
				var data = event.data;
				console.log(data);
				var jsonObject = JSON.parse(data);
				if (jsonObject.type === 'Alert') {
					//提示信息
					var code = jsonObject.code;
					var mes = {};
					mes.name = '系统消息';
					mes.content = jsonObject.message;
					mes.style = {
						color: '#A9A9A9'
					};
					setMessageInnerHTML(mes);

					if (code == 1) {
						//已加入群聊---发送获取历史记录--只有最新20条
						console.log('Chat- 获取历史消息记录')
						that.iqGetGroupMessageHistoryList();
					}

				} else if (jsonObject.type === 'IQ') {
					//请求类相关消息回调
					if (jsonObject.cmd == '1') {
						var list = jsonObject.data.list;
						if (list.length > 0) {
							var group = list[0];
							that.currentGroupSessionId = group.identify;
							console.log('currentGroupSessionId=');
							console.log(that.currentGroupSessionId);
							//加入群聊
							that.iqJoinGroup()
						}
					} else if (jsonObject.cmd == '6') {
						//显示历史消息记录
						var list = jsonObject.data.list;
						if (list.length > 0) {
							list.forEach((item, index, list) => {
								//组装历史消息
								var mes = {};
								mes.name = item.fromInfo.username;
								mes.content = item.data;
								mes.style = {
									color: '#000000'
								};
								if (item.fromInfo.userExt.sessionKey == that.sessionKey) {
									//是自己发送的消息设置颜色
									mes.style = {
										color: '#3CB371'
									};
								}
								setMessageInnerHTML(mes);
							})

						}
					}
				} else if (jsonObject.type === 'MG') {
					//来自群消息
					var fromInfo = jsonObject.fromInfo;
					var userName = fromInfo.username;
					// var mess = userName + ':'+jsonObject.data;

					//组装消息
					var mes = {};
					mes.name = userName;
					mes.content = jsonObject.data;
					mes.style = {
						color: '#000000'
					};
					if (jsonObject.from == jsonObject.to) {
						//是自己发送的消息设置颜色
						mes.style = {
							color: '#008000'
						};
					}
					setMessageInnerHTML(mes);
				} else {
					var mes = {};
					mes.name = '未知消息';
					mes.content = jsonObject.data;
					mes.style = {
						color: '#FFD700'
					};
					setMessageInnerHTML(mes);
				}

				//聊天内容滚到底部
				var ele = document.getElementById("message");
					console.log(ele.scrollHeight);
					ele.scrollTop = ele.scrollHeight;
					
				


			}

			//连接关闭的回调方法
			this.websocket.onclose = function() {
				var mes = {};
				mes.name = '系统消息';
				mes.content = 'WebSocket连接关闭';
				mes.style = {
					color: '#A9A9A9'
				};
				setMessageInnerHTML(mes);
			}

			//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
			window.onbeforeunload = function() {
				that.websocket.close();
			}

			//将消息显示在网页上
			function setMessageInnerHTML(mes) {
				if (that.allMessages.length > 200) {
					that.allMessages.splice(0, 10);
				}
				that.allMessages.push(mes);
				// document.getElementById('message').innerHTML += mes + '<br/>';
			}


		}
	}

	/*
	#3CB371 春天的绿  用来自己的历史聊天记录
	#000000 黑色  正常消息
	#FFD700 金 未知消息
	#008000 绿色  自己发送的消息
	#A9A9A9 灰色 系统消息
	*/
</script>

<style>
	@import "../css/DreamChat.css";
</style>
