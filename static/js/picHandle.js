var picVue = new Vue({
	el:"#container",
	data:{
		repair: false,
		retread:false,
		imgMsg:null,//图片信息
	},
	mounted:function(){
		
	},
	methods:{
		openUrl(url){
			if(!url){
				myTools.alertCustom("未知")
				return;
			}
			window.open(url)
		},
		//切换修复和翻新
		switchRepair(type){
			if(type==0){
				this.repair = true
				this.retread = false
			}
			else if(type==1){
				this.repair = false
				this.retread = true
			}
		}
	},
	watch:{
		
	}
})