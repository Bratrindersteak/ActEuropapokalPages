define(function(require, exports, module) {
	var $ = require("zepto");
	var render = require("render");
	var base = require("base");
	var searchTimer = null;
	require("swipe");

	$(document).ready(function() {
		var _ua = navigator.userAgent.toLowerCase();
		var hpSearchInputHeight = $('.hp-form').offset().top;
		var mySwiper = new Swiper('.swiper-container', {
			loop: true,
			autoHeight: true,
			calculateHeight: true,
			autoplay: 2000,
			paginationClickable: true,
			onInit: function(swiper) {
				if (swiper.imagesLoaded === 0) {
					return;
				} else {
					$(".swiper-slide img").show();
				}
			}
		});
		
		$(window).resize(function() {
			mySwiper.reInit();
		});

		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold: 200,
			effectspeed: 200
		});
		
		$('#hpSearchInput').on('input', function(event) {
			clearTimeout(searchTimer);
			searchTimer = setTimeout(function() {
				if ( $('#hpSearchInput').val() ) {
					base.common.getData(base.address.site_autocomplete, '?q=' + $('#hpSearchInput').val(), false, keywordDataCallback, function() {});
					if ( $('#hpSearchLists ul').html() ) {
						base.utils.fade($('#hpSearchLists'), 'in', 300);
					} else {
						base.utils.fade($('#hpSearchLists'), 'out', 300);
					}
				} else {
					base.common.getData(base.address.site_autonullcomplete, '?q=' + $('#hpSearchInput').val(), false, keywordDataCallbackHot, function() {});
					if ( $('#hpSearchLists ul').html() ) {
						base.utils.fade($('#hpSearchLists'), 'in', 300);
					} else {
						base.utils.fade($('#hpSearchLists'), 'out', 300);
					}
				}
			}, 200);
		});

		$('#hpSearchInput').on('focus', function() {
			$(window).scrollTop(hpSearchInputHeight);

			base.common.getData(base.address.site_autonullcomplete, '?q=' + $('#hpSearchInput').val(), false, keywordDataCallbackHot, function() {});
			
			if ( $('#hpSearchLists ul').html() ) {
				base.utils.fade($('#hpSearchLists'), 'in', 300);
			} else {
				base.utils.fade($('#hpSearchLists'), 'out', 300);
			}
		});

		$('#hpSearchLists .close').on('click', function() {
			$(window).scrollTop(0);
			base.utils.fade($('#hpSearchLists'), 'out', 300);
		});

		$('#hpSearchInput').on('blur', function() {
			var delayBlur = setTimeout(function() {
				$(window).scrollTop(0);
				base.utils.fade($('#hpSearchLists'), 'out', 300);
			}, 200);
		});

		// $('#medium-btn').on('click', function() {

		// 	var skey_words = $('#hpSearchInput').val();
  //           var source = $("#keywords-source").val();
  //           var area_id = $("#keywords-area").val();
  //           var _jupiter = $("#_jupiter").val();

  //           if(skey_words == "搜索你喜欢的车型，如宝马") {
  //               skey_words="";
  //           }

		// 	$.ajax({
	 //            type: "POST",
  //               url: "http://" + window.location.host + "/site/keyinsert/",
	 //            dataType: "json",
  //               data: {_jupiter:_jupiter,key_words:skey_words,source:source,area_id:area_id,position_id:3},
	 //            success:function(data){}
	 //        });
		// });
	});

	var keywordDataCallback = function(returnData) {
		var content = '';
		var url = $('#hpSearchLists ul').attr('data-url');
		var returnDataLength = returnData.length;

		if ( returnDataLength > 6 ) {
			returnDataLength = 6;
		}

		for ( var i = 0; i < returnDataLength; i++ ) {
			if ( url.indexOf("?") > -1 ) {
				var kw_url = url + '&kw=' + returnData[i].name;
			} else {
				var kw_url = url + '?kw=' + returnData[i].name;
			}
			content += "<li data-url='" + kw_url + "' class='clean'><span class='series'>" + returnData[i].name + "</span>" + "<span class='counts'>约<i>" + returnData[i].count + "</i>个结果</span></li>";
		}

		$('#hpSearchLists ul').html(content);
		$('#hpSearchLists li').on('click', function() {
			// var lkey_words = $(this).find('.series').html();
   //          var source = $("#keywords-source").val();
   //          var area_id = $("#keywords-area").val();
   //          var _jupiter = $("#_jupiter").val();

			// $.ajax({
	  //           type: "POST",
   //              url: "http://" + window.location.host + "/site/keyinsert/",
	  //           dataType: "json",
   //              data: {_jupiter:_jupiter,key_words:lkey_words,source:source,area_id:area_id,position_id:3},
	  //           success:function(data){}
	  //       });

			window.location.href = $(this).attr('data-url');
		})
	}

	var keywordDataCallbackHot = function(returnData) {
		var content = '';
		var url = $('#hpSearchLists ul').attr('data-url');
		var returnDataLength = returnData.length;

		if ( returnDataLength > 6 ) {
			returnDataLength = 6;
		}
		
		for ( var i = 0; i < returnDataLength; i++ ) {
			if ( url.indexOf("?") > -1 ) {
				var kw_url = url + '&kw=' + returnData[i].name_show;
			} else {
				var kw_url = url + '?kw=' + returnData[i].name_show;
			}
			content += "<li data-url='" + kw_url + "' class='clean'><span class='series'>" + returnData[i].name_show + "</span>" + "<span class='counts'>约<i>" + returnData[i].num + "</i>个结果</span></li>";
		}

		$('#hpSearchLists ul').html(content);
		$('#hpSearchLists li').on('click', function() {
			// var lkey_words = $(this).find('.series').html();
   //          var source = $("#keywords-source").val();
   //          var area_id = $("#keywords-area").val();
   //          var _jupiter = $("#_jupiter").val();
            
			// $.ajax({
	  //           type: "POST",
   //              url: "http://" + window.location.host + "/site/keyinsert/",
	  //           dataType: "json",
   //              data: {_jupiter:_jupiter,key_words:lkey_words,source:source,area_id:area_id,position_id:3},
	  //           success:function(data){}
	  //       });
	        
			window.location.href = $(this).attr('data-url');
		})
	}
});