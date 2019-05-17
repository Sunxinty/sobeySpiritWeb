var loginVue = new Vue({
	el: "#container",
	data: {
		isVerify: 2, //验证是否成功0-否，1-是，2-未验证
		verifyText: "", //验证提示信息
		isLogin: false, //是否登录
		userName: "",
		userPsd: "",
	},
	mounted: function() {
		var _this = this;
		window.localStorage.setItem("userToken", "")
		_this.initStatus()
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
					_this.verifyText = "账号或密码有误！";
					break;
				case 1:
					_this.verifyText = "登录成功！即将进入";
					break;
				case 2:
					_this.verifyText = "";
					break;
			}
		},
		/*初始化状态*/
		initStatus() {
			this.userName = "";
			this.userPsd = "";
			this.isVerify = 2;
			this.verifyText = "";
			this.$refs['input'].focus()
		},
		/*登录*/
		loginBtn() {
			var _this = this;
			if(_this.userName == "") {
				_this.verifyText = "请输入登录账号!";
				_this.$refs['input'].focus()
				return;
			} else if(_this.userPsd == "") {
				_this.verifyText = "请输入密码!";
				_this.$refs['password'].focus()
				return;
			}
			let parmas = {
				loginName: _this.userName,
				passWord: _this.userPsd
			}
			_this.$http.post(Request.http + "v1/api/user/login", JSON.stringify(parmas))
				.then(function(res) {
					if(res.data.ResponseMessage.status == "success") {
						_this.isVerify = 1;
						var userToken = res.data.data.token;
						window.localStorage.setItem("userToken", userToken)
						setTimeout(function() {
							window.location.href = "index.html"
						}, 500)
					} else {
						_this.isVerify = 0;
						window.localStorage.setItem("userToken", "")
						_this.verifyText = res.data.ResponseMessage.message.zh_CN
					}
				}, function() {
					_this.isVerify = 0;
					window.localStorage.setItem("userToken", "")
					_this.verifyText = "服务器出错！"
				})
		},
	}
})