define(function(require, exports, module) {
	var $ = require("zepto");
	var render = require("render");
	var base = require("base");
	require("swipe");

	// var publicity_tpl = require("{tpl_path}/static2015/template/publicity.tpl");
	// var publicity_data = {
	// 	publicity: publicity_tpl
	// };

	$(function() {
		// render.tpl("publicity_tpl", publicity_data);
		$("#ico-brand, #ico-series").on("click", function() {
			$(this).addClass("active");
			$(this).siblings("h4").removeClass();
			$("#hot-brand").hide();
			$("#hot-series").hide();
			$("#hot-" + this.id.split("-")[1]).show();
		});

		$(".entry a").on("touchstart", function() {
			$(this).addClass("entry-touch");
		}).on("touchend", function() {
			$(this).removeClass("entry-touch");
		});

		$("#hot-price a, #hot-brand a, #hot-series a").on("click", function() {
			if ($(this).find("span").length > 0) {
				// the cars google-analytics of hot-series and hot-brand .
				ga('send', 'event', 'home_hotbrand', 'click', $(this).find("span").html());
			} else {
				// the cars google-analytics of hot-price .
				ga('send', 'event', 'home_price', 'click', $(this).html());
			}
		});

		$("#publicity_part").on("click", function() {
			base.utils.webkitTransform("publicity_popup", [], function() {
				$("#content_part").hide();
				$("#footer").hide();
				$(".return-top").trigger("click");
			});
		});

		$(".car-method").on("click", "li", function() {
			if ($(this).find(".text a").data("url")) {
				window.location.href = $(this).find(".text a").data("url");
			}
		});

		$(".list-box img").each(function(m, n) {
			var img = new Image();

			img.src = $(n).attr("src");
			img.onload = function() {
				if (img.width < img.height) {
					$(n).attr("src", "/static2015/dist/images/car_default.jpg");
				}
			}
		});
		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold: 200,
			effectspeed: 200
		});

		var mySwiper = new Swiper('.swiper-container', {
			pagination: '.pagination',
			loop: true,
			calculateHeight: true,
			grabCursor: true,
			autoplay: 2000,
			paginationClickable: true,
			onInit: function(swiper) {
				if (swiper.imagesLoaded === 0) {
					return;
				} else {
					$(".swiper-slide img").show();
				}
			},
		});
	})
})