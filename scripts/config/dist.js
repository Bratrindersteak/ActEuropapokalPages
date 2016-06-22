var __ua = navigator.userAgent.toLowerCase();
if( __ua.match(/trident\/([\d.]+)/) && __ua.match(/msie ([\d.]+)/) ) {
	window.location.href = "http://www.iautos.cn/?from=wap";
}

seajs.config({
	vars : {
		"tpl_path" : ""
	},
	base : "http://" + window.location.host + "/static2015/",
	alias : {
		"zepto" : "js/libs/zepto",
		"render" : "js/config/render",
		"base" : "js/config/base",
		"juicer": "js/libs/juicer",
		"swipe": "js/libs/swiper",
		"newSwipe": "js/libs/swiper.min",
		"wechat": "js/libs/jweixin",
		"backbone": "js/libs/backbone",
		"underscore": "js/libs/underscore"
	},
	map: [
		//[".js",  ".js?_r=" + Math.random().toString(36).substr(12) ] // f**k
	]
});
