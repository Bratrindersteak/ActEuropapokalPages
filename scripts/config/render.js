define(function(require, exports, module) {
	var $ = require("zepto");
	var juicer = require("juicer");
	var base = require("base");
	var searchTimer = null;

	var bindData = {
		tplRender: function(domName, renderData) {
			var render_res = juicer($("#" + domName).html(), renderData);
			$("#" + domName)[0].outerHTML = render_res;
		},
		initArea: function() {
			var area_tpl = require("{tpl_path}/static2015/template/area.tpl");
			var area_data = {
				area: area_tpl
			}
			bindData.geoValidate();
			bindData.tplRender("area_tpl", area_data);
			// bindData.commonEventBind();
			headerEventDelegate.prototype = new eventDelegate();
			headerEventDelegate.prototype.constructor = headerEventDelegate;
			var header = new headerEventDelegate();
			header.commonEventBind();
			header.tapCity();
			header.headerEventBind();
			header.footerEventBind();
		},
		geoValidate: function() {
			if (!base.utils.getSessionStorage("gsta")) {
				base.common.geoLocation();
			}
		}
	}

	var eventDelegate = function() {
		this.commonEventBind = function() {
			// common
			$(".wrap").on("click", ".return", function(e, type) {
				var obj_id = $(this).attr("data-parentid");
				var _recoverArr = $(this).attr("data-recoverid") || ["content_part", "footer"];

				if (type) {
					// just close the webkit-transform page .
					var temp_str = type.split("=");
					base.utils.webkitTransform(temp_str[1], _recoverArr, function() {
						$("#" + temp_str[1]).hide()
					});
					e.stopPropagation();
				} else {
					// return button event centralized disposing .
					if (obj_id) {
						if (obj_id === "sub_page") {
							window.history.go(-1);
						} else {
							if (typeof _recoverArr === "string") {
								_recoverArr = Array.call(this, _recoverArr);
							}
							base.utils.webkitTransform(obj_id, _recoverArr, function() {
								$("#" + obj_id).hide()
							});
						}
					} else {
						// do not have data-parentid custom attribution .
						var query = base.utils.queryUrlExtraData();
						if (query == '') {
							window.location.href = '/';
						} else {
							window.location.href = '/?' + query;
						}
					}
				}
			});

			// common
			$(".sub-visit").on("click", function(e) {
				if (e.target.nodeName !== "A") {
					var _dataType = $(this).attr("data-type");
					if (_dataType === "car_pick" || _dataType === "news_more") {
						// in the current page display layer .
						if ($("#" + _dataType).css("display") === "none") {
							base.utils.fade($("#" + _dataType), "in", 100);
						} else {
							base.utils.fade($("#" + _dataType), "out", 100);
						}
					} else if (_dataType === "area_choice") {
						// click on the area page after jump to the other page .
						$.fn.cookie("parea", $(this).attr("data-pinyin"), {
							path: "/"
						});
						$(".head-area").html($(this).html() + '<i class="ico1"></i>');
						if (!base.common.redirectProcessor($(this).attr("data-pinyin"))) {
							$(".return").trigger("click", "fast=area_popup");
						}
					} else if (_dataType === "question_commit") {
						var _replyTime = $(this).parents(".comment-box").siblings("p").eq(2);
						var _action = $(this).data("action");
						var _contentObj = null;

						if (_action === "reply") {
							_contentObj = $(this).siblings("textarea");
						}else if(_action === "question") {
							_contentObj = $("#questionContent");
						}

						// submit the question when the commit button triggers the click event .
						if (_action === "reply") {
							if (_contentObj.val().length < 2) {
								if (_contentObj.val() === "") {
									$(".hint-not i").html("请输入评论内容");
								} else {
									$(".hint-not i").html("评论内容描述至少2个字");
								}
								base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
							} else {
								base.common.postData(base.address.comment_commit, "content=" + _contentObj.val() + "&reply_id=" + _contentObj.attr("data-replyid") + "&parent_id=" + _contentObj.attr("data-parentid"), false, function(returnData) {
									if (returnData.code === 1) {
										base.utils.coverLayer.tipsCover($(".question-center"), "hint-ok");
										setTimeout(function() {
											window.location.reload();
										}, 2000)
									} else if (returnData.code === 2) {
										base.utils.coverLayer.alphaStart(false);
										base.utils.fade($("#questionValidate"), "in");
									} else {
									//  code:100 will be disposing .
									}
								}, function() {});
							}	
						} else if (_action === "question") {
							if (_contentObj.val().length < 7) {
								if (_contentObj.val() === "") {
									$(".hint-not i").html("请输入问题内容");
								} else {
									$(".hint-not i").html("问题内容描述至少6个字");
								}
								base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
							} else {
								base.common.postData(base.address.question_commit, "title=" + $("#questionContent").val(), false, function(returnData) {
									if (returnData.code === 1) {
										base.utils.coverLayer.tipsCover($(".question-center"), "hint-ok");
										setTimeout(function() {
											window.history.go(-1);
										}, 2000)
									} else if (returnData.code === 2) {
										base.utils.coverLayer.alphaStart(false);
										base.utils.fade($("#questionValidate"), "in");
									} else {
										//  code:100 will be disposing .
									}
								}, function() {});
							}
						}
					}
				}
			});

			// common
			$(document).scroll(function() {
				if ($(window).scrollTop() > 600) {
					if ($(".return-top").css("display") === "none")
						$(".return-top").show();
				} else {
					$(".return-top").hide();
				}
			});

			// common
			$(".return-top").on("click", function() {
				$(window).scrollTop(0);
			});
		}
	}

	var headerEventDelegate = function() {
		this.tapCity = function() {
			// header
			$(".area-main-count li").on("click", function(e) {
				// the click event of the subitem of city .
				var province_pinyin = $(this).data("pinyin");
				if ($.inArray(province_pinyin, ["beijing", "tianjin", "chongqing", "shanghai"]) > -1) {
					// municipality
					var ename = $(this).attr("data-pinyin");

					$.fn.cookie("parea", $(this).attr("data-pinyin"), {
						path: "/"
					});
					$(".head-area").html($(this).html() + '<i class="ico1"></i>');

					if (!base.common.redirectProcessor(ename)) {
						$(".return").trigger("click", "fast=area_popup");
					}
				} else {
					if ($(this).find(".triangle").length === 0) {
						var area_content = "<div class='area-sub  sub-dashed' style='top:" + (parseInt($(this).offset().top) + 37) + "px'><ul>";
						var cur_province = $(this).attr("data-pinyin");
						var obj_city = base.areaData.city[cur_province];

						$(".triangle").remove();
						$(this).append("<span class='triangle'></span>");
						for (var i = 0; i < obj_city.length; i++) {
							area_content += "<li data-pinyin='" + obj_city[i].pinyin + "'>" + obj_city[i].name + "</li>";
						}
						area_content += "<li>全部</li></ul></div>";

						$(".area-sub").remove();
						$($(this).parents("div")[0]).after(area_content);
					} else {
						$(".triangle").remove();
						$(".area-sub").remove();
					}
				}
			});

			// header
			$(".select-area").on("click", ".area-sub li", function(e, province_joint) {
				var ename = $(this).attr("data-pinyin");
				if (!ename) {
					ename = $(".triangle").parent().attr("data-pinyin");
					$.fn.cookie("parea", ename, {
						path: "/"
					});
					$(".head-area").html($(".triangle").parent().text() + '<i class="ico1"></i>');
				} else {
					$.fn.cookie("parea", $(this).attr("data-pinyin"), {
						path: "/"
					});
					$(".head-area").html($(this).html() + '<i class="ico1"></i>');
				}

				if (!base.common.redirectProcessor(ename)) {
					$(".return").trigger("click", "fast=area_popup");
				}
			});
		}

		this.tapProvince = function() {
			$(".area-main-count li").on("click", function() {
				// the click event of the province .
				$("#assess_area").html($(this).html());
				$("#assess_area").attr("data-pinyin", $(this).attr("data-pinyin"));
				if (!base.common.redirectProcessor($(this).attr("data-pinyin"))) {
					$(".return").trigger("click", "fast=area_popup");
				}
			});
		}


		this.headerEventBind = function() {
			var keywordDataCallback = function(data) {
				var content = "";
				var url = $("#searchTip").attr("data-url");


				$.each(data, function(i, item) {
					if (url.indexOf("?") > -1) {
						var kw_url = url + '&kw=' + item.name;
					} else {
						var kw_url = url + '?kw=' + item.name;
					}
					content += '<li data-url="' + kw_url + '"><span class="fl">' + item.name + '</span>' + '<span class="fr">约<i>' + item.count + '</i>个结果</span></li>';
				});

				$("#searchTip").html(content);
				$("#searchTip li").on('click', function() {
					// var lkey_words = $(this).find('.fl').html();
     //                var source = $("#keywords-source").val();
     //                var area_id = $("#keywords-area").val();
     //                var _jupiter = $("#_jupiter").val();

     //                $.ajax({
			  //           type: "POST",
			  //           url: "http://" + window.location.host + "/site/keyinsert/",
			  //           dataType: "json",
			  //           data: {_jupiter:_jupiter,key_words:lkey_words,source:source,area_id:area_id,position_id:2},
			  //           success:function(data){
     //                    }
			  //       });
					$(this).addClass("active");
					window.location.href = $(this).attr("data-url");
				});
				// $('#sss .btn').on('click', function() {
				// 	var skey_words = $('#inputSearch').val();
    //                 var source = $("#keywords-source").val();
    //                 var area_id = $("#keywords-area").val();
    //                 var _jupiter = $("#_jupiter").val();
    //                 if(skey_words == "搜索你喜欢的车型，如宝马") {
    //                     skey_words="";
    //                 }

				// 	$.ajax({
			 //            type: "POST",
    //                     url: "http://" + window.location.host + "/site/keyinsert/",
			 //            dataType: "json",
			 //            data: {_jupiter:_jupiter,key_words:skey_words,source:source,area_id:area_id,position_id:2},
			 //            success:function(data){
    //                     }
			 //        });
				// });
			}

			// header
			$(".head-area").on("click", function(e) {
				base.utils.webkitTransform("area_popup", [], function() {
					$("#content_part").hide();
					$("#footer").hide();
				});
			});

			// header
			$(".index-head h1").on("click", function() {
				var query = base.utils.queryUrlExtraData();
				if (query == '') {
					window.location.href = '/';
				} else {
					window.location.href = '/?' + query;
				}
			});

			// header
			$(".head-search").on("click", function() {
				// fuzzy search click events .
				base.utils.webkitTransform("search_popup", [], function() {
					$("#content_part").hide();
					$("#footer").hide();
				});
				ga('send', 'event', 'home1', 'click', '搜索');
			});

			// header
			$(".inx-visit").on("click", function() {
				// app menu .
				base.utils.coverLayer.alphaStart(false);
				base.utils.webkitTransform("login_popup", [], function() {});
				ga('send', 'event', 'all', 'click', 'list view');
			});

			$('.alpha').on('click', function() {
				if ( $('#login_popup').css('display') == 'block' ) {
					base.utils.coverLayer.alphaEnd();
					base.utils.webkitTransform("login_popup", ["temp"], function() {
						$("#login_popup").hide();
					});
				}
			});

			// header
			$(".login-popup-ico").on("click", function() {
				// app menu back button .
				base.utils.coverLayer.alphaEnd();
				base.utils.webkitTransform("login_popup", ["temp"], function() {
					$("#login_popup").hide();
				});
				ga('send', 'event', 'all', 'click', 'list back');
			});

			// header
			$("#inputSearch").on("input", function(event) {
				// fuzzy search .
				clearTimeout(searchTimer);
				searchTimer = setTimeout(function() {
					if ($("#inputSearch").val() !== "") {
						base.utils.fade($("#searchTip"), "in", 200);
						base.common.getData(base.address.site_autocomplete, "?q=" + $("#inputSearch").val(), false, keywordDataCallback, function() {});
					} else {
						$("#searchTip li").removeClass('active');
					}
				}, 200);
			});
		}

		this.footerEventBind = function() {
			if(!base.utils.getSessionStorage("__app_d_cancel")) {
				if( !/(Android)/i.test(navigator.userAgent)) {
					$(".client-box .dow-ico1").attr("data-alias", "_i");
					$(".client-box").show();
				}else {
					$(".client-box .dow-ico1").attr("data-alias", "_a");
					$(".client-box").show();
				}
			}
			
			$(".client-box .dow-ico1").on("click", function() {
				if($(this).data("alias") === "_i") {
					window.location.href = "https://itunes.apple.com/cn/app/di-yi-che-wang-zhuan-ye-er/id1058776547?mt=8";
				}else if($(this).data("alias") === "_a"){
					window.location.href = "http://api.99haoche.com/99haoche-api/appDownload?name=99haoche&system=android&channel=0 ";
				}
			});
			
			$(".client-box .del").on("click", function(e) {
				base.utils.setSessionStorage("__app_d_cancel", true);
				$(".client-box").hide();
				e.stopPropagation();
			});
		}
	}

	exports.init = bindData.initArea;
	exports.tpl = bindData.tplRender;
	exports.events = {
		"common": eventDelegate,
		"header": headerEventDelegate
	}
})