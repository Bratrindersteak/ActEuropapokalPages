define(function(require,exports,module) {
	var $ = require("zepto");
	var base = require("base");
	var render = require("render");
	$(function() {

		//最新车源8个按钮的点击事件
		$(".tabs-title li").on("click", function() {
			if( $(this).attr("data-item") === "tabs_brand" ) {
				base.utils.webkitTransform( "brand_popup", [], function() {
					$("#content_part").hide();
					$("#footer").hide();
				} );
			}else if( $(this).attr("data-item") === "tabs_empty" ) {
				window.location.href = $(this).attr("data-url");
			}else {
				var headerButtonList = $(this).attr("data-item").split("_");
				if(!$(this).hasClass("active")) {
					$(this).addClass("active");
					$(this).siblings("li").removeClass("active");
					$("#" + headerButtonList[1] + "_view").show();
					$("#" + headerButtonList[1] + "_view").siblings("div").hide();
				}else {
					$(this).removeClass("active");
					$("#" + headerButtonList[1] + "_view").hide();
				}
			}
		});

		//查看更多车源按钮的点击事件
		$("#view_more").on("click", function() {
			var seeMoreCars1 = $("#view_more p").attr("data-url");
			var seeMoreCars2 = parseInt($("#view_more p").attr("data-around"));

			base.utils.coverLayer.alphaStart();

			$.ajax({
				type: "GET",
				url: "http://" + window.location.host + ( /param/.test(seeMoreCars1) === true ? (seeMoreCars1 + "&"):(seeMoreCars1 + "?") ) + "is_around=" + seeMoreCars2 + "&ajax_commit=1",
				dataType: "json",
				async: false,
				success: function(data) {
					var listData = data.lists;
					var temp = "";
					
					if( listData.length ) {
						for( var i=0; i<listData.length; i++ ) {
							var sprq = $.inArray( listData[i].sprq.split("-")[0], ["1970", "2900"] ) >= 0 ? "未上牌" : listData[i].sprq.split("-")[0];

							if( listData[i].source_id ===40 ) {
								temp += "<li class='haoche'><i class='icon-hc'></i>"
									 + "<div class='img'><img class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='" + listData[i].picture + "' width='100%' data-url='" + listData[i].m_url + "' style='display: block; opacity: 1;' ></div>"
									 + "<div class='txt'><p class='til'>" + listData[i].title_l + "</p>"
									 + "<div class='txt-price'><span class='fl'>￥" + listData[i].price + "万</span><span class='fr'>" + sprq + "年<i>|</i>" + listData[i].bxlc + "万公里</span></div>"
									 + "<div class='txt-server'><p><span class='white'>99好车</span><span>诚信车源</span><span>全方位保障</span></p></div></div></li>";
							}else {
								temp += "<li><div class='img'><img class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='" + listData[i].picture + "' width='100%' data-url='" + listData[i].m_url + "' style='display: block; opacity: 1;' ></div>"
								 	 + "<div class='txt'><p class='til'>" + listData[i].title_l + "</p>"
								     + "<div class='txt-price'><span class='fl'>￥" + listData[i].price + "万</span><span class='fr'>" + sprq + "年<i>|</i>" + listData[i].bxlc + "万公里</span></div>"
								     + "<div class='txt-server'><p>";

								var brokenpartStr = "";

								if( listData[i].rzc ===1 ) {
									brokenpartStr += "<span>认证</span>";
								}

	 							if( listData[i].brokenpart!="" ) {
								var brokenpartArr = listData[i].brokenpart.split(",");

									if( $.inArray("1", brokenpartArr) >=0 || $.inArray("2", brokenpartArr) >=0 ) {
										brokenpartStr += "<span>代办</span>";
									}
									if( $.inArray("3", brokenpartArr) >=0 || $.inArray("4", brokenpartArr) >=0 ) {
										brokenpartStr += "<span>质保</span>";
									}
									if( $.inArray("6", brokenpartArr) >=0 ) {
										brokenpartStr += "<span>退换</span>";
									}
									if( $.inArray("8", brokenpartArr) ) {
										brokenpartStr += "<span>贷款</span>";
									}
									temp += brokenpartStr + "</p></div></div></li>";
								}
								else if( listData[i].rzc !==1 ) {
									temp += "</p></div></div></li>";
								}else {
									temp += brokenpartStr + "</p></div></div></li>";
								}
							}
						}
					}

					if(data.url) {
						$("#view_more p").attr("data-url", data.url);
					}else {
						$("#view_more").hide();
					}
					$(".car-list-box ul").append(temp);
					$("img.lazy").lazyload({
						effect: "fadeIn",
						threshold : 200,
						effectspeed :  200,
						event : "load"
					});
					base.utils.coverLayer.alphaEnd();
					// 1 . 获取lists
					// 2. 遍历lists
					// 3. 在遍历lists同时拼装li的内容并插入到页面相应的dom位置
				},
				error: function(data) {}

			})
		});
		
		var carDetail = $(".car-list-box");
		carDetail.on("click","li", function() {
			var carDetailUrl = $(this).find("img").attr("data-url");
			window.location.href = carDetailUrl;
		});

		//选择品牌下的字母按钮的点击事件。
		$(".brand-title li").on("click", function() {
			if( !$(this).hasClass("active") ) {
				var letterArray = $(this).attr("data-quick").split(",");

				$(".brand-title li").removeClass("active");
				$(this).addClass("active");

				$(".brand-box").hide();
				for(i=0; i<letterArray.length; i++) {
					$(".brand-box-"+letterArray[i]).show();
				}
			}
		});
		//汽车品牌logo的点击事件
		$(".brand-main li").on("click", function() {
			if( !$(this).hasClass("empty") && $(this).find("em").attr("data-url") != "" ) {
				var tailUrl = $(this).find("em").attr("data-url");

				base.utils.coverLayer.alphaStart();
				$.ajax({
					type: "GET",
					dataType: "json",
					async: false,
					url: "http://" + window.location.host + base.address.series + tailUrl,
					success: function(seriesData) {
						console.log(seriesData);
						var temp = "";

						for(var i in seriesData.all_series) {
							//var allseriesArray = seriesData.all_series[i];
							temp += "<div class='line-box'><h2 class='glb-title'><span>" + i + "</span></h2><ul>";
							for(j=0; j<seriesData.all_series[i].length; j++) {
								var flag = 0;

								for(k=0; k<seriesData.exist_series.length; k++) {
									if( seriesData.all_series[i][j].pinyin === seriesData.exist_series[k] ) {
										flag = 1;
										temp += "<li><a data-url='" + seriesData.all_series[i][j].url + "'>" + seriesData.all_series[i][j].name + "</a></li>";
									}
								}
								if( !flag ) {
									temp += "<li class='empty'><a data-url='" + seriesData.all_series[i][j].url + "'>" + seriesData.all_series[i][j].name + "</a></li>";
								}
							}
							temp += "</ul></div>";
						}

						$(".series-box").html("");
						$(".series-box").append(temp);
						$("#series_popup .sub-visit").prop("href", seriesData.url);
						base.utils.webkitTransform( "series_popup", [], function() {
							$("#brand_popup").hide();
							$("#content_part").hide();
							$("#footer").hide();
							base.utils.coverLayer.alphaEnd();
						} );
					},
					error: function() {}
				})
			}
		});
		
		$(".series-box").on("click", "li", function() {
			if( !$(this).hasClass("empty") && $(this).find("a").attr("data-url") != "" ) {
				window.location.href = $(this).find("a").attr("data-url");
			}
		});

		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold : 200,
			effectspeed :  200
		});
	})
})