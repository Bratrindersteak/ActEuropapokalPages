define(function(require, exports, module) {
	var $ = require("zepto");
	var base = require("base");
	var wx = require("wechat");
	require("swipe");

	$(function() {
		var conten_width = $(".wrap").width();
		var coord_long = $(".dealer-til").data("coord-long");
		var coord_lat = $(".dealer-til").data("coord-lat");
		var staticMap, point, marker = null;
		var url = window.location.href;

		if ((coord_long || coord_lat) && coord_long > 100) {
			staticMap = new BMap.Map("static_map");
			point = new BMap.Point(coord_long, coord_lat);
			marker = new BMap.Marker(point);
			staticMap.centerAndZoom(point, 16);

			staticMap.addEventListener("tilesloaded", function() {
				staticMap.panTo(point);
				staticMap.addOverlay(marker);
				marker.setAnimation(BMAP_ANIMATION_BOUNCE);
			});
		} else {
			$("#view_map").hide();
		}

		if (conten_width < 320) {
			conten_width = 320;
		} else if (conten_width > 540) {
			conten_width = 540;
		}

		$(".del-map").on("click", function() {
			$(".detail-map, .alpha").hide();
		});

		$("#view_map").on("click", function() {
			$(".wrap").height($(".wrap").height() + 360);
			$("#map_cover, #static_map").show();
			ga('send', 'event', 'usedcar', 'click', 'map');
			$(this).hide();
		});

		$(".wrap").on("click", ".return", function() {
			window.history.go(-1);
		});

		$(".dealer-til").on("click", function() {
			if ($(this).data("url")) {
				window.location.href = "http://" + window.location.host + $(this).data("url");
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

		$(".return-top").on("click", function() {
			$(window).scrollTop(0);
		});

		$(document).on("orientationchange", function() {
			var conten_width = $(".wrap").width();
			$(".swiper-container").width(conten_width);
			$(".swiper-container").height(conten_width * 3 / 4);
			$(".swiper-container").css({
				"line-height": conten_width * 3 / 4 + "px"
			});
			$(".tel-fixed, .detail-map").width(conten_width);
		});

		$(".sub-visit").on("click", function() {
			$(".share-top").toggle();
		});

		$(".swiper-container").width(conten_width);
		$(".swiper-container").height(conten_width * 3 / 4);
		$(".swiper-container").css({
			"line-height": conten_width * 3 / 4 + "px"
		});
		$(".tel-fixed, .detail-map").width(conten_width);
		$(".tel-fixed").show();
		$("#footer").height(210);

		if (window.location.href.indexOf("channel") > -1) {
			$(".wrap").height($(".wrap").height() + 40);
		}

		var carImgSwiper = new Swiper('.swiper-container', {
			grabCursor: true,
			loop: true,
			calculateHeight: true,
			preloadImages: true,
			updateOnImagesReady: true,
			onInit : function( swiper ) {
				if( swiper.imagesLoaded === 0 ) {
					return;
				}else {
					var totalNum = swiper.loopCreated === false ? swiper.imagesLoaded : ( swiper.imagesLoaded -2 );
					if( totalNum === 0 ) {
						$(".imgs-pagination").remove();
					}else {
						$(".imgs-pagination").html( "1<i>/</i>" + totalNum ).show();
					}

					$(".img-list img").show();
				}
			},
			onSlideChangeEnd: function(swiper){
				var _li = $(".img-list").find("li");

				for (var i=0; i<_li.length; i++) {
					var _img = _li.eq(i).find("img");
					var _dataSrc = _li.eq(i).find("img").data("src");

					if (_dataSrc) {
						_img.attr("src", _dataSrc);
						_img.removeAttr("data-src");
					}
				}
    		},
			onSlideNext : function( swiper ) {
				var totalNum = swiper.loopCreated === false ? swiper.imagesLoaded : ( swiper.imagesLoaded -2 );

				if(  swiper.loopCreated === false ) {
					if( swiper.activeIndex + 1 === totalNum ) {
						curNum = totalNum;
					}else {
						curNum = swiper.activeIndex + 1;
					}
				}else {
					if( swiper.activeIndex > totalNum ) {
						curNum = swiper.activeIndex - totalNum;
					}else {
						curNum = swiper.activeIndex;
					}
				}

				$(".imgs-pagination").html( curNum + "<i>/</i>" + totalNum );
			},
			onSlidePrev : function( swiper ) {
				var totalNum = swiper.loopCreated === false ? swiper.imagesLoaded : ( swiper.imagesLoaded -2 );

				if(  swiper.loopCreated === false ) {
					if( swiper.activeIndex - 1 === 0 ) {
						curNum = 1;
					}else {
						curNum = swiper.activeIndex + 1;
					}
				}else {
					if( swiper.activeIndex === 0 ) {
						curNum = totalNum;
					}else {
						curNum = swiper.activeIndex;
					}
				}

				$(".imgs-pagination").html( curNum + "<i>/</i>" + totalNum );
			}
		})


		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold : 200,
			effectspeed : 200
		})

		window._bd_share_config = {
			common: {
				bdText: $("#car_title").html(),
				bdDesc: $("#car_title").html(),
				bdUrl: window.location.href,
				bdPic: $(".img-list").find("img").eq(0).attr("src"),
				onBeforeClick: function(cmd, config) {
					if (cmd === "tsina") {
						config.bdText = $("#car_title").html() + " @第一车网二手车";
					} else if (cmd === "tqq") {
						config.bdText = $("#car_title").html() + " @第一车网";
					}
					return config;
				}
			},
			share: [{
				"bdSize": 16
			}]
		}
		with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];

	        	var change_src = function (src) {
	            		var sub_src = src.substr(src.lastIndexOf("\/"));
		              if (sub_src != '') {
		              	new_last_src = '/small'+sub_src;
		              	src = src.replace(sub_src,new_last_src);
		            	}
	            		return src;
	        	}

		var share_wx = function( result ) {
			var pconfig = result.data || {};
			wx.config( pconfig );
			wx.ready(function() {
		              var carsData = {
		                    'src': change_src($(".swiper-slide").eq(1).find("img").attr("src")),
		                    'link': url,
		                    'title': $("#car_title").text(),
		                    'desc': $(".iautos").text()
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

        $("#askprice-close").on('click',function(){
            base.utils.coverLayer.alphaEnd();
            $("#askprice-box").hide();
        });


        $("#low-ask").on('click',function(){
            //base.utils.coverLayer.alphaStart();
            $("#askprice-box").show();
            $("#input-phone").focus();
        });

        $("#sure-ask").on('click',function(){

            var reg_phone = new RegExp(/^(\+86)?(1[3,4,5,7,8][0-9]{9})$/);
            var input_phone =  $("#input-phone").val();

            if( input_phone == "" ) {

                $("#phone-null").show();
                var count = setTimeout(function() {
                    $("#phone-null").hide();
                }, 1500);
                return false;
            }

            if( !reg_phone.test(input_phone)) {

                $("#phone-error").show();
                var count = setTimeout(function() {
                    $("#phone-error").hide();
                }, 1500);
                return false;
            }

            var clue_data=$("#clueData").val();

            base.common.postData( base.address.usedcar_clue, "contact_phone=" + input_phone + "&clue_data=" + clue_data.toString(), false, function(returnData) {

                if (returnData == 1) {

                    $("#info-change").show();
                    var count = setTimeout(function() {
                        $("#info-change").hide();
                    }, 2000);
                    return false;

                } else if(returnData == 17){

                    $("#insert-repeat").show();
                    var count = setTimeout(function() {
                        $("#insert-repeat").hide();
                    }, 2000);
                    return false;

                }else if(returnData == 0){

                    $("#insert-failt").show();
                    var count = setTimeout(function() {
                        $("#insert-fail").hide();
                    }, 2000);
                    return false;

                } else {
                    $("#askprice-box").hide();
                    $("#askprice-success").show();
                    var count = setTimeout(function() {
                        $("#askprice-success").hide();
                        base.utils.coverLayer.alphaEnd();
                    }, 1000);
                    return false;

                }
            }, function() {});


        });

		
	})
})