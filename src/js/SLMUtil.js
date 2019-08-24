export function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	console.log('vars:' + vars);
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		console.log('拆分pair:' + pair);
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}

// #得到url中的变量
function getUrlVariable(url, variable) {
	wenIndex = url.lastIndexOf('?')
	query = url.substring(wenIndex + 1)
	var vars = query.split("&");
	console.log('vars:' + vars);
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		console.log('拆分pair:' + pair);
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}

function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			/*make an HTTP request using the attribute value as the file name:*/
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elmnt.innerHTML = this.responseText;
					}
					if (this.status == 404) {
						elmnt.innerHTML = "Page not found.";
					}
					/*remove the attribute, and call this function once more:*/
					elmnt.removeAttribute("w3-include-html");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			/*exit the function:*/
			return;
		}
	}
};



let SLMUtil = {
	//取窗口可视范围的高度
	getClientHeight: function getClientHeight() {
		var clientHeight = 0;
		if (document.body.clientHeight && document.documentElement.clientHeight) {
			var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight :
				document.documentElement.clientHeight;
		} else {
			var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight :
				document.documentElement.clientHeight;
		}
		return clientHeight;
	}
}

export default SLMUtil
