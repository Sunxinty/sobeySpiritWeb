window.myTools = {
	/*
	 * 生成选择框
	 * */
	selectBox(element) {
		/*
		 element：框选的画布
		 * */
		if(!element) {
			return;
		}
		let content = document.getElementById(element);
		content.onmousedown = function(e) {
			//只允许一个框
			let moveDiv = document.getElementById("tempDiv");
			if(moveDiv) {
				moveDiv.remove()
			}
			let posx = e.clientX;
			let posy = e.clientY;
			let conPosx = content.offsetLeft;
			let conPosy = content.offsetTop;
			let div = document.createElement("div");
			div.id = "tempDiv";
			div.style.left = (posx - conPosx) + "px";
			div.style.top = (posy - conPosy) + "px";
			content.appendChild(div);
			content.onmousemove = function(ev) {
				div.style.left = Math.min(ev.clientX - conPosx, posx - conPosx) + "px";
				div.style.top = Math.min(ev.clientY - conPosy, posy - conPosy) + "px";
				div.style.width = Math.abs(posx - ev.clientX) + "px";
				div.style.height = Math.abs(posy - ev.clientY) + "px";
				document.onmouseup = function() {
					if(div.style.width < 20 || div.style.height < 20) {
						alert("框选区域太小")
						content.appendChild(div)
					}
					content.onmousemove = null;
					content.onmouseup = null;
				}
			}
		}
	},
	/*
	 * 设置页面自适应
	 * */
	selfAdaption() {
		let winWidth = $(window).width();
		let fontSize;
		fontSize = winWidth / 19.2 + "px";
		$("html").css("font-size", fontSize);
	},
	/*自定义弹窗*/
	alertCustom(msg) {
		$("body").append('<div class="alert-custom">' + msg + '</div>');
		$(".alert-custom").css({
			"position": "absolute",
			"width": "2rem",
			"height": "0.6rem",
			"top": "20%",
			"left": "50%",
			"margin-left": "-1rem",
			"background": "rgba(115, 214, 230,0.6)",
			"border-radius": "8px",
			"text-align": "center",
			"line-height": "0.6rem",
			"animation": "alertCustom 3s ease",
			"opacity": "0",
			"z-index": "9999999",
			"color": "#fff",
			"font-size": "16px"
		});
		setTimeout(function() {
			$("body").find(".alert-custom").eq(0).remove();
		}, 3000)
	},
	/*判断是否登录*/
	isLogin(){
		let userToken = window.localStorage.getItem("userToken");
		if(!userToken||userToken==""){
			layer.msg("请登录！")
			setTimeout(function(){
				window.location.href = "login.html";
			},1000)
		}
	},
}

window.onload = function(){
	window.myTools.selfAdaption()
	window.myTools.isLogin()
}

window.onresize = function() {
	window.myTools.selfAdaption()
}