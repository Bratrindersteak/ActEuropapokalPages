define(function(require, exports, module) {
	var $ = require("zepto");
	var base = require("base");
	var wx = require("wechat");
	require("newSwipe");

	$(function() {
		var coord_long = $("#dealerMapWrapper").data("coord-long");
		var coord_lat = $("#dealerMapWrapper").data("coord-lat");
		var staticMap, point, marker = null;
		var url = window.location.href;
		var deviceHeight = $(window).height();

		if ((coord_long || coord_lat) && coord_long > 100) {
			staticMap = new BMap.Map("dealerMap");
			point = new BMap.Point(coord_long, coord_lat);
			marker = new BMap.Marker(point);
			staticMap.centerAndZoom(point, 15);

			staticMap.addEventListener("tilesloaded", function() {
				staticMap.panTo(point);
				staticMap.addOverlay(marker);
				marker.setAnimation(BMAP_ANIMATION_BOUNCE);
			});
		} else {
			$("#dealerMapWrapper").hide();
		}

		if ( $('.cd-equipment .lists').html() == '' ) {
			$('#cdImportantInfo').hide();
		} else {
			var equipmentNum = $('.cd-equipment li').length;

			if ( equipmentNum <= 12 ) {
				$('.cd-equipment .cd-show-more').hide();
			} else {
				$('.cd-equipment .lists').css({
					'max-height': '291px'
				});
			}
		}

		if ( $('.introduce-text').text() == '' ) {
			$('#cdVehicleIntroduce').hide();
		} else {
			if ( $('.introduce-text').height() <= 298 ) {
				$('.cd-vehicle-introduce .cd-show-more').hide();
			} else {
				$('.introduce-text').css({
					'max-height': '280px'
				});
			}
		}

		$('.cd-show-more').on('click', function() {
			var that = $(this);

			if ( that.parent().hasClass('cd-vehicle-introduce') ) {
				$('.introduce-text').css({
					'max-height': 'none'
				});
				that.hide();
			} else if ( that.parent().hasClass('cd-equipment') ) {
				$('.cd-equipment .lists').css({
					'max-height': 'none'
				});
				that.hide();
			}
		});

		$('.return-arrow').on('click', function() {
			window.history.go(-1);
		});

		$('.cd-nav-menu').on('click', function() {
			$(window).scrollTop(0);
			base.utils.fade($('#cdNavLayer'), 'in', 300);

			var cdNavLayerHeight = $('#cdNavLayer').height();

			if ( cdNavLayerHeight < deviceHeight ) {
				$('#cdNavLayer').height( deviceHeight + 20 );
			}
		});

		$('#cdNavLayer').on('touchmove', function() {
			event.preventDefault();
		});

		$('.cd-nav-layer .close').on('click', function() {
			base.utils.fade($('#cdNavLayer'), 'out', 300);
		});

		if (window.location.href.indexOf("channel") > -1) {
			$(".wrap").height($(".wrap").height() + 40);
		}

		var carDetailBannerSwiper = new Swiper('.swiper-container', {
			direction: 'horizontal',
			loop: true,
			pagination: '.swiper-pagination',
			paginationType: 'fraction',
			autoHeight: true,
			lazyLoading: true,
			lazyLoadingInPrevNext:true,
			lazyLoadingInPrevNextAmount: 2,
			lazyLoadingOnTransitionStart: true
		})

		$(window).resize(function() {
			carDetailBannerSwiper.reInit();
		});

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

        $(".askprice-close").on('click',function(){
            base.utils.coverLayer.alphaEnd();
            if ( $(this).parent().hasClass('askprice-success') ) {
            	base.utils.fade($("#askprice-success"), 'out', 300);
            } else {
            	base.utils.fade($("#askprice-box"), 'out', 300);
            }
        });


        $("#low-ask").on('click',function(){
            base.utils.coverLayer.alphaStart();
            base.utils.fade($("#askprice-box"), 'in', 300);
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