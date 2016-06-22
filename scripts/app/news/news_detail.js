define(function(require, exports, module){
	var $ = require("zepto");

	$(function(){
		var modify_content = "";
		var account_name = "";
		if( $(".content").html().match(/^\s+/) !== null ){
			modify_content = "<p>" + $(".content").html().replace($(".content").html().match(/^\s+/).toString(), ""); + "</p>"
		}else{
			modify_content = "<p>" + $(".content").html(); + "</p>"
		}

		$(".content").html( modify_content.replace( /\n/g, "<br/>" ) );
		$(".content span").attr("style", "");
		$(".content img").attr("onclick", "");
		$(".content img").attr("width", "100%");
		$(".content img").attr("height", null);

	});
})
