function setCookie(name, value) {
	if (value) {
		var Days = 365
		var exp = new Date()
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
		document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
	}
}

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
//清除指定cookie值
function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = setCookie(name)
  if (cval && cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
//清除全部cookie值
function clearCookie () {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
}





var CookieUtil = {
	sessionKey:'sessionKey',
	set: function(name, value) {
		return setCookie( name, value)
	},
	get: function(name) {
		return getCookie(name)
	},
	delete: function(name) {
		return delCookie(name)
	},
	clear: function() {
		return clearCookie()
	}
}

export default CookieUtil
