var picVue = new Vue({
	el:"#container",
	data:{
		
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
	},
	watch:{
		
	}
})