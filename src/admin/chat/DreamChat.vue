<template>
	<div class="DCcontainer">
		
	<div class="DCTitleText">向神龙许愿把</div>
	<button class="DCnavCloseButton" @click="closeWebSocket()">退出</button>
		
		
		<div class="DCgroupChatContent" id="message">
		</div>
	<div class="DCinputTextBg">
		<input class="DCchatInput" id="text" type="text" v-model="inputText"/>
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
				 websocket:{},
				 currentGroupSessionId:null,
				 sessionId:null,
				 inputText:'',
				 
			}
		},
		methods: {
			closeWebSocket:function(){
				 this.websocket.close();
			},
			send:function(){
				 // var text = document.getElementById('text').value;
				 var text= that.inputText;
				that.sendGroupMessage(text);
				that.inputText='';
			},
			sendGroupMessage:function(str){
				if(str == null){
					alert('发送内容不能为空');
					return;
				}
				if(this.sessionId == null){
					alert('用户登录失败、请重新进入页面.')
					return;
				}
				var message = {};
				message.type='MG'
				message.to = this.currentGroupSessionId;
				message.from = this.sessionId;
				message.data = str;
				this.sendMessage(message);
			},
			//发送加入群组消息
			iqJoinGroup:function(){
				if(this.currentGroupSessionId == null){
					alert('未获取到官方群信息!');
					return;
				}
				var message = {};
				message.type='IQ';
				message.cmd='4';
				message.groupId= this.currentGroupSessionId;
				this.sendMessage(message);
			},
			//获取群列表
			iqGetGroupList:function(){
				var message = {};
				message.type='IQ';
				message.cmd='1';
				this.sendMessage(message);
			},
			//统一使用此方法发送指令
			sendMessage:function(msg){
				var jsonStr = JSON.stringify(msg);
				console.log(jsonStr);
				 this.websocket.send(jsonStr);
			}
			
		},mounted() {
	console.log('mounted--');
	that = this;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
		var sessionKey = CookieUtil.get("sessionKey");
		if(sessionKey == null){
			alert('未获取到登录信息、进入聊天界面失败!');
			return;
		}
		var sessionId = sessionKey+"@html";
		this.sessionId = sessionId;
		console.log(sessionId);
       this.websocket = new WebSocket("ws://localhost:8888/Comic/websocket/"+sessionId);
    }
    else {
        alert('当前浏览器 Not support websocket')
    }

    //连接发生错误的回调方法
    this.websocket.onerror = function () {
        setMessageInnerHTML("WebSocket连接发生错误");
    };

    //连接成功建立的回调方法
    this.websocket.onopen = function () {
        setMessageInnerHTML("系统消息:连接成功");
		//请求群列表
		that.iqGetGroupList();
    }

    //接收到消息的回调方法
    this.websocket.onmessage = function (event) {
		var data = event.data;
		console.log(data);
		var jsonObject = JSON.parse(data);
		if(jsonObject.type === 'Alert'){
			//提示信息
			setMessageInnerHTML("系统消息:" + jsonObject.message);
			
		}else if(jsonObject.type === 'IQ'){
			//请求类相关消息回调
			if(jsonObject.cmd == '1'){
				var list = jsonObject.data.list;
				if(list.length > 0){
					var group = list[0];
					that.currentGroupSessionId = group.identify;
					console.log('currentGroupSessionId=');
					console.log(that.currentGroupSessionId);
					//加入群聊
					that.iqJoinGroup()
				}
			}
		}else if(jsonObject.type === 'MG'){
			//来自群消息
			var fromInfo = jsonObject.fromInfo;
			var userName = fromInfo.username;
			setMessageInnerHTML(userName + ':'+jsonObject.data);
		}else{
			setMessageInnerHTML(event.data);
		}
        
    }

    //连接关闭的回调方法
    this.websocket.onclose = function () {
        setMessageInnerHTML("WebSocket连接关闭");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        closeWebSocket();
    }

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
        document.getElementById('message').innerHTML += innerHTML + '<br/>';
    }

  
	}
	}
</script>

<style>
	@import "../css/DreamChat.css";
</style>
