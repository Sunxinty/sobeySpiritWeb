var loginVue = new Vue({
	el: "#container",
	data: {
		isVerify: 2, //验证是否成功0-否，1-是，2-未验证
		verifyText: "", //验证提示信息
		isLogin: false, //是否登录
		loginName:"",
		loginPass:"",
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
					_this.verifyText = "账号或密码有误！";
					myTools.alertCustom(_this.verifyText)
					break;
				case 1:
					_this.verifyText = "登录成功！即将进入";
					myTools.alertCustom(_this.verifyText)
					break;
				case 2:
					_this.verifyText = "";
					break;
			}
		},
		/*初始化状态*/
		initStatus() {
			this.loginName = "";
			this.loginPass = "";
			this.isVerify = 2;
			this.verifyText = "";
			this.$refs['input'].focus()
		},
		/*登录*/
		loginBtn() {
			var _this = this;
			if(_this.loginName == "") {
				_this.verifyText = "请输入登录账号!";
				myTools.alertCustom(_this.verifyText)
				_this.$refs['input'].focus()
				return;
			}
			else if(_this.loginPass == ""){
				_this.verifyText = "请输入密码!";
				myTools.alertCustom(_this.verifyText)
				_this.$refs['password'].focus()
				return;
			}
			_this.isVerify = 1;
			setTimeout(function(){
				window.location.href = "index.html"
			},1000)
		},
		/*取消*/
		cancelBtn() {
			this.initStatus();
			var _this = this;

		},
	}
})