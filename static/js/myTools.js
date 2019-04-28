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
		var content = document.getElementById(element);
		content.onmousedown = function(e) {
			//只允许一个框
			var moveDiv = document.getElementById("tempDiv");
			if(moveDiv) {
				moveDiv.remove()
			}
			var posx = e.clientX;
			var posy = e.clientY;
			var conPosx = content.offsetLeft;
			var conPosy = content.offsetTop;
			var div = document.createElement("div");
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
		var winWidth = $(window).width();
		var fontSize;
		if(winWidth < 1920) {
			if(winWidth < 1200) {
				fontSize = 1200 / 19.2 + "px";
				$("html").css("font-size", fontSize);
			} else {
				fontSize = winWidth / 19.2 + "px";
				$("html").css("font-size", fontSize);
			}
		} else {
			fontSize = 100 + "px";
			$("html").css("font-size", fontSize);
		}
	},
}

window.myTools.selfAdaption()

window.onresize = function(){
	window.myTools.selfAdaption()
}