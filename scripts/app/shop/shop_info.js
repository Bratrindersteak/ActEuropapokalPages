define(function(require, exports, module) {
	var $ = require("zepto");
	var base = require("base");
	var wx = require("wechat");

	$(function() {
		var coord_long = $(".shop-name").data("coord-long");
		var coord_lat = $(".shop-name").data("coord-lat");
		var staticMap, point, marker = null;
		var page_index = 1;
		var timer = null;

		var carListDataCallback = function(carsData) {
			var carListResult = "";

			if (carsData.code === "1") {
				if (carsData.lists.length > 0) {
					carListResult = fillCarListData(carsData.lists, "");
					$(".car-list-box ul").append(carListResult);

					if (Math.ceil(carsData.totalNumber / carsData.perPage) === page_index) {
						$("#view_more").remove();
					}

					$("img.lazy").lazyload({
						effect: "fadeIn",
						threshold: 200,
						effectspeed: 200,
						event: "load"
					});
					base.utils.coverLayer.alphaEnd();
				}
			}
		}

		var carListDataErrorProcess = function() {}

		var fillCarListData = function(carData, tempContainer) {
			var _data = carData;
			var _temp_carList = tempContainer;
			var _usedcar_url = "";

			for (var i = 0; i < _data.length; i++) {
				var _temp_brokenpart_str = "<div class='txt-server'><p>";
				var _sprq = $.inArray(_data[i].sprq.split("-")[0], ["1970", "2900"]) >= 0 ? "未上牌" : _data[i].sprq.split("-")[0] + "年";

				if (_data[i].source_id === 40) {
					_temp_carList += "<li class='haoche'><i class='icon-hc'></i><div class='img'><img data-url='" + _data[i].m_url + "' class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='" + base.utils.photoSmallToMedium(_data[i].picture) + "' data-id=" + _data[i].carid + " width='100%' /></div><div class='txt'><p class='til'>" + _data[i].title_l + "</p><div class='txt-price'><span class='fl'>￥" + _data[i].price + "万</span><span class='fr'>" + _sprq + "<i>|</i>" + _data[i].bxlc + "万公里</span>" + "</div><div class='txt-server'><p><span class='white'>99好车</span><span>诚信车源</span><span>全方位保障</span></p></div></div></li>";
				} else {
					_temp_carList += "<li><div class='img'><img data-url='" + _data[i].m_url + "' class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='" + base.utils.photoSmallToMedium(_data[i].picture) + "' data-id=" + _data[i].carid + " width='100%' /></div><div class='txt'><p class='til'>" + _data[i].title_l + "</p>" + "<div class='txt-price'><span class='fl'>￥" + _data[i].price + "万</span><span class='fr'>" + _sprq + "<i>|</i>" + _data[i].bxlc + "万公里</span></div>";

					if (_data[i].rzc === 1) {
						_temp_brokenpart_str += "<span>认证</span>";
					}

					if (_data[i].brokenpart !== "") {
						var _brokenpart_arr = _data[i].brokenpart.split(",");

						if ($.inArray("1", _brokenpart_arr) >= 0 || $.inArray("2", _brokenpart_arr) >= 0) {
							_temp_brokenpart_str += "<span>代办</span>";
						}

						if ($.inArray("3", _brokenpart_arr) >= 0 || $.inArray("4", _brokenpart_arr) >= 0) {
							_temp_brokenpart_str += "<span>质保</span>";
						}
						if ($.inArray("6", _brokenpart_arr) >= 0) {
							_temp_brokenpart_str += "<span>退换</span>";
						}
						if ($.inArray("8", _brokenpart_arr) >= 0) {
							_temp_brokenpart_str += "<span>贷款</span>";
						}

						_temp_carList += _temp_brokenpart_str + "</p></div></div></li>";
					} else if (_data[i].rzc !== 1) {
						_temp_carList += "</div></li>";
					} else {
						_temp_carList += _temp_brokenpart_str + "</p></div></div></li>";
					}
				}

			}
			return _temp_carList;
		}

		if ((coord_long || coord_lat) && coord_long > 100) {
			staticMap = new BMap.Map("static_map");
			point = new BMap.Point(coord_long, coord_lat);
			marker = new BMap.Marker(point);
			staticMap.centerAndZoom(point, 16);

			staticMap.addEventListener("tilesloaded", function() {
				staticMap.panTo(point);
				staticMap.addOverlay(marker);
				marker.setAnimation(BMAP_ANIMATION_BOUNCE);
				$("#static_map, #map_cover").show();
			});
		}

		$("#view_more").on("click", function() {
			page_index++;
			base.utils.coverLayer.alphaStart();
			if (location.search == '') {
				base.common.getData(location.pathname, "?pageIndex=" + page_index + "&is_ajax=1", false, carListDataCallback, carListDataErrorProcess);
			} else {
				base.common.getData(location.pathname, location.search + "&pageIndex=" + page_index + "&is_ajax=1", false, carListDataCallback, carListDataErrorProcess);
			}

		});

		$(".car-list-box").on("click", "li", function() {
			if ($(this).find("img").attr("data-url") != "") {
				var url = $(this).find("img").attr("data-url");
				window.location.href = url;
			}
		});

		$(".wrap").on("click", ".return", function() {
			if (window.history.length < 3) {
				window.location.href = "/";
			} else {
				window.history.go(-1);
			}
		});

		$(document).scroll(function() {
			if ($(window).scrollTop() > 600) {
				if ($(".return-top").css("display") === "none")
					$(".return-top").show();
			} else {
				$(".return-top").hide();
			}
		});

		$(".sub-visit").on("click", function() {
			$(".share-top").toggle();
		});

		$(".return-top").on("click", function() {
			$(window).scrollTop(0);
		});

		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold: 200,
			effectspeed: 200
		});

		var share_title = $(".shop-main .title").html() + "，精品车源最新上架，点击查看：" + window.location.href;
		window._bd_share_config = {
			common: {
				bdText: share_title,
				bdDesc: share_title,
				bdUrl: window.location.href,
				bdPic: $(".car-list-box img").eq(0).attr("data-original") || ""
			},
			share: [{
				"bdSize": 16
			}]
		}
		with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];


		var url = window.location.href;
		var change_src = function(src) {
			var sub_src = src.substr(src.lastIndexOf("\/"));
			if (sub_src != '') {
				new_last_src = '/small' + sub_src;
				src = src.replace(sub_src, new_last_src);
			}
			return src;
		}
		var share_wx = function(result) {
			var pconfig = result.data || {};
			wx.config(pconfig);
			wx.ready(function() {
				var carsData = {
					'src': $("#logo").val(),
					'link': url,
					'title': $($(".title")[1]).text(),
					'desc': $(".shop-text").text()
				};
				wx.onMenuShareAppMessage({
					title: carsData.title,
					desc: carsData.desc,
					link: carsData.link,
					imgUrl: carsData.src,
					trigger: function(res) {
						// alert('用户点击发送给朋友');
					},
					success: function(res) {
						// alert('已分享');
					},
					cancel: function(res) {
						//  alert('已取消');
					},
					fail: function(res) {
						// alert(JSON.stringify(res));
					}
				});
				wx.onMenuShareTimeline({
					title: carsData.title,
					link: carsData.link,
					imgUrl: carsData.src,
					trigger: function(res) {
						// alert('用户点击分享到朋友圈');
						//alert(carsData.src);
					},
					success: function(res) {
						// alert('已分享');
					},
					cancel: function(res) {
						//  alert('已取消');
					},
					fail: function(res) {
						// alert(JSON.stringify(res));
					}
				});
				wx.onMenuShareQQ({
					title: carsData.title,
					desc: carsData.desc,
					link: carsData.link,
					imgUrl: carsData.src,
					trigger: function(res) {
						// alert('用户点击分享到QQ');
					},
					complete: function(res) {
						// alert(JSON.stringify(res));
					},
					success: function(res) {
						//alert('已分享');
					},
					cancel: function(res) {
						//alert('已取消');
					},
					fail: function(res) {
						//alert(JSON.stringify(res));
					}
				});
			});
		}
		base.common.getpData(base.address.wechat, "/?url=" + url + "&callback=?", false, 'jsonp', share_wx, function() {});

		//der Telefonnummertipp
		if (base.utils.queryUrlData("site") === "2sc") {
			timer = setTimeout(function() {
				base.utils.coverLayer.alphaStart(false);
				base.utils.fade($(".seo-popup"), "in", 100);
				clearTimeout(timer);
			}, 6000);

			$(".seo-del").on("click", function() {
				$(".seo-popup").hide();
				base.utils.coverLayer.alphaEnd();
				timer = setTimeout(function() {
					base.utils.coverLayer.alphaStart(false);
					base.utils.fade($(".seo-popup"), "in", 100);
					clearTimeout(timer);
				}, 30000)
			});

			$(".seo-ico2, .landkarte").on("click", function() {
				$(window).scrollTop($(".detail-main").offset().top);
			})
		}
	})
})