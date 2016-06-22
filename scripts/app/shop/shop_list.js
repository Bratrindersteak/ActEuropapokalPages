define(function(require, exports, module) {
	var $ = require("zepto");
	var base = require("base");

	$(function() {
		var cur_page = 2;
		var str_repeat = function(str, num) {
			return new Array(num + 1).join(str);
		}
		$("#shop_more").on("click", function() {
			var _path = window.location.href;
			if (_path !== null) {

				base.utils.coverLayer.alphaStart();
				base.common.getData(base.address.shop_list, "/?page=" + cur_page, false, function(data) {
					if (data) {
						var shop = data['list'];
						for (var i = 0; i < shop.length; i++) {
							var temp_list = "<li>";
							temp_list += "<div class='img'><a data-url='" + shop[i].url + "?site=2sc'><img class='lazy' src='/static2015/dist/images/shop.jpg' data-original='" + shop[i].logo + "' width='100%' alt='" + shop[i].company_name + "' ></a></div>" + "<div class='txt'>" + "<h5><a data-url='" + shop[i].url + "?site=2sc'>" + shop[i].company_name + "</a></h5>" + "<div class='rating'>" + "<span class='car-num'>车源<a data-url='" + shop[i].search_url + "'><i>" + shop[i].num + "辆</i></a></span>" + "<span class='inx-rate'>" + str_repeat('<i class="inx-rate-ico"></i>', Math.ceil(shop[i].weight / 100)) + "</span></div>" + "<a href='tel:" + shop[i].tel + "'><div class='tel'>" + shop[i].tel + "</div></a>";
							temp_list += "</li>";
							$("#shop_list").append(temp_list);
						}
						if (data['page']['is_last'] == 1) {
							$("#shop_more").hide();
						}

						$("img.lazy").lazyload({
							effect: "fadeIn",
							threshold: 200,
							effectspeed: 200,
							event: "load"
						});
						base.utils.coverLayer.alphaEnd();
					}
				}, function() {});
				cur_page++;
			}
		});
		$(".wrap").on("click", ".return", function(e) {
			var obj_id = $(this).attr("data-parentid");
			if (obj_id === "sub-page") {
				var query = base.utils.queryUrlExtraData();
				if (query == '') {
					window.location.href = '/';
				} else {
					window.location.href = '/?' + query;
				}
			}
		});

		$(".car-dealer").on("click", "li a", function() {
			if ($(this).attr("data-url") !== "") {
				window.location.href = $(this).attr("data-url");
			}
		});

		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold: 200,
			effectspeed: 200
		})
	});
})