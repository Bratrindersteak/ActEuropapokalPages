define(function(require, exports, module){
	var $ = require("zepto");
	var base = require("base");
	
	$(function(){
		var cur_page = 2;

		$("#view_more").on("click", function(){
			var _path = window.location.pathname.match( /\d+.[.html]+$/ );
			if( _path  !== null ){
				var news_id = _path.toString().split(".html")[0];

				base.utils.coverLayer.alphaStart();
				base.common.getData( base.address.news_list, "/"+ news_id + "?page=" + cur_page , false, function( data ){
					if( data ){
						for( var i=0; i < data.length; i++ ){
							var temp_list = "<li>";
							var extra_param = base.utils.queryUrlExtraData();
							
							if (extra_param != "") {
								extra_param = "?" + extra_param;
							}

							if( data[i].fld_PicInfo ){
								temp_list += "<div class='img'><img class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='" + data[i].fld_PicInfo + "' width='100%' alt='" + data[i].fld_NewsIndexTitle + "' ></div>" 
								          + "<div class='text'><a data-url='/news/" + data[i].Fld_newsid + ".html" + extra_param + "'><p class='title'>" + data[i].Fld_newstitle + "</p></a><p class='time'>" + data[i].fld_CreateDateTime.split(" ")[0] + "</p></div>";
							}else{
								temp_list += "<div class='text'><a data-url='/news/" + data[i].Fld_newsid + ".html" + extra_param + "'><p class='title'>" + data[i].Fld_newstitle + "</p></a><p class='time'>" + data[i].fld_CreateDateTime.split(" ")[0] + "</p></div>";
							}
							temp_list += "</li>";
							$("#news_list").append( temp_list );
						}

						$("img.lazy").lazyload({
							effect: "fadeIn",
							threshold : 200,
							effectspeed :  200,
							event : "load"
						});
						base.utils.coverLayer.alphaEnd();
					}
				}, function(){} );
				cur_page++;
			}
		});

		$("#news_list").on("click", "li", function(){
			if( $(this).find("a").attr("data-url") !== "" ){
				window.location.href = $(this).find("a").attr("data-url");
			}
		});
		
		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold : 200,
			effectspeed :  200
		})
	});
})