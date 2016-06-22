define(function( require, exports, module ){
	var $ = require("zepto");
	var base = require("base");
    var wx = require("wechat");

	$(function(){
		$(".wrap").on("click", ".return", function(){
			if( window.history.length < 3 ){
				window.location.href = "/";
			}else{
				window.history.go(-1);
			}
		});
        $("img.lazy").lazyload({
            effect: "fadeIn",
            threshold : 200,
            effectspeed :  200
        });
    })
})