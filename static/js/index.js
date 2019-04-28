var indexVue = new Vue({
	el: "#container",
	data: {
		urlList: [{
				name: "图片处理",
				url: ""
			},
			{
				name: "文件处理",
				url: ""
			},
			{
				name: "信号处理",
				url: ""
			},
			{
				name: "任务列表",
				url: ""
			}
		]
	},
	mounted: function() {},
	methods: {
		openUrl(url) {
			if(!url || url == "") {
				url = "login.html"
			}
			window.location.href = url;
		}
	}
})