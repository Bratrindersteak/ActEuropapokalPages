define(function(require,exports,module) {
	var $ = require("zepto");
	var base = require("base");

	$(function() {

		var seeMore = $("#view_more p");
		var currentPage = 2;
		seeMore.on("click", function() {
			var pathTail = window.location.pathname.match(/\d+[.html]+$/);
			var pathId = pathTail.toString().split(".html")[0];

			base.utils.coverLayer.alphaStart();
			$.ajax({
				type: "GET",
				dataType: "json",
				url: "http://" + window.location.host + base.address.news_list + "/" + pathId + "?page=" + currentPage,
				async: false,
				success:  function(newsData) {
					if(newsData) {
						var temp = "";
						for(i=0; i<newsData.length; i++) {
							temp += "<li><div class='img'><img class='lazy' src='http://3g.tiautos.cn/static2015/dist/images/car_default.jpg' data-original='" + newsData[i].fld_PicInfo + "' width='100%' alt='" + newsData[i].fld_NewsIndexTitle + "' style='display: block; opacity: 1;' ></div>"
							+ "<div class='text'><a data-url='/news/" + newsData[i].Fld_newsid + ".html'><p class='title'>" + newsData[i].Fld_newstitle + "</p></a><p class='time'>" + newsData[i].fld_CreateDateTime + "</p></div></li>";
						}
						base.utils.coverLayer.alphaEnd();
						$("#news_list").append(temp);

						$("img.lazy").lazyload({
							effect: "fadeIn",
							threshold : 200,
							effectspeed :  200,
							event : "load"
						});
					}
				},
				error: function() {}
			})
			currentPage++;
		})
		 
		$("#news_list").on("click","li", function() {
			if($(this).find("a").attr("data-url")) {
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