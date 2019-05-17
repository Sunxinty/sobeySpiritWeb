var ip = window.location.hostname;
var port = window.location.port;

//var Request = {
//	http: "http://" + ip +":"+ port + "/Intelligent-Processor/"
//};

var Request = {
    http: "http://172.16.131.74:9202/Intelligent-Processor/",
};

//在所有的vue请求前加token
window.userToken = window.localStorage.getItem("userToken") || "";
Vue.http.headers.common['token'] = window.userToken;