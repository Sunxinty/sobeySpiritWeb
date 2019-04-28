var loginVue = new Vue({
	el: "#container",
	data: {
		codeText: "",
		isVerify: 2, //验证是否成功0-否，1-是，2-未验证
		verifyText: "", //验证提示信息
		isLogin: false, //是否登录
	},
	mounted: function() {
		var _this = this;
		//自动获取焦点
		_this.$refs['input'].focus()
	},
	watch: {
		isVerify: 'watchVerifyText'
	},
	methods: {
		/*监听验证状态改变提示信息*/
		watchVerifyText(vaule) {
			var _this = this;
			switch(vaule) {
				case 0:
					_this.verifyText = "激活码输入有误，请重新输入！";
					break;
				case 1:
					_this.verifyText = "激活码验证成功！";
					break;
				case 2:
					_this.verifyText = "";
					break;
			}
		},
		/*初始化状态*/
		initStatus() {
			this.codeText = "";
			this.isVerify = 2;
			this.verifyText = "";
			this.$refs['input'].focus()
		},
		/*登录*/
		loginBtn() {
			var _this = this;
			if(_this.codeText == "") {
				_this.verifyText = "请输入产品激活码"
				return;
			}
			window.location.href = "index.html"
		},
		/*取消*/
		cancelBtn() {
			this.initStatus();
			var _this = this;

		},
	}
})