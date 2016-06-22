define(function(require, exports, module) {
	var $ = require("zepto");
	var base = require("base");
	var render = require("render");

	$(function() {
		var areaTpl = require("{tpl_path}/static2015/template/area.tpl");
		var areaData = {
			area: areaTpl
		}
		render.tpl("area_tpl", areaData);

		var seriesId = "";
		var dataId = "";
		var dataYear = "";

		//所在地及车型点击事件
		$(".speed").on("click", "li", function() {
			if( $(this).index() === 0 ) {
				base.utils.coverLayer.alphaStart();
				$(".sub-visit").remove();
				base.utils.webkitTransform( "area_popup", [], function() {
					$("#content_part").hide();
					$("#footer").hide();
					base.utils.coverLayer.alphaEnd();
				} );
			}else if( $(this).index() === 1 ) {
				base.utils.coverLayer.alphaStart();
				base.utils.webkitTransform( "brand_popup", [], function() {
					$("#content_part").hide();
					$("#footer").hide();
					base.utils.coverLayer.alphaEnd();
				} );
			}
		});

		//地区点击事件
		$(".area-main-count").on("click", "li", function() {
			var dataPinyin = $(this).attr("data-pinyin");

			$("#assess_area").html($(this).html());
			$("#assess_area").attr("data-pinyin", dataPinyin);
			base.utils.webkitTransform( "area_popup", ["content_part", "footer"], function() {
				$("#area_popup").hide();
			} );
		});

		//汽车品牌字母的点击事件
		$(".brand-title").on("click", "li", function() {
			if( !$(this).hasClass("active") ) {
				var letterArray = $(this).attr("data-quick").split(",");

				$(".brand-title li").removeClass("active");
				$(this).addClass("active");

				$(".brand-box").hide();
				for(i=0; i<letterArray.length; i++) {
					$(".brand-box-" + letterArray[i]).show();
				}
			}
		});

		//汽车品牌logo点击事件
		$(".brand-main").on("click", "li", function() {
			base.utils.coverLayer.alphaStart();
			$.ajax({
				type: "GET",
				dataType: "json",
				async: false,
				url: "http://" + window.location.host + base.address.assess.series + "/?brand_id=" + $(this).attr("data-id"),
				success: function(seriesData) {
					var temp = "";

					for(var i in seriesData.series) {
						temp += "<div class='line-box'><h2 class='glb-title'><span>" + i + "</span></h2>"
				             + "<ul>";
				        for(j=0; j<seriesData.series[i].length; j++) {
				        	temp += "<li><a data-id='" + seriesData.series[i][j].id + "'>" + seriesData.series[i][j].name + "</a></li>";
				        }
				        temp += "</ul></div>";
					}
					$(".series-box").html("");
					$(".series-box").append(temp);
				},
				error: function() {}
			})

			base.utils.webkitTransform( "series_popup", [], function() {
				$("#brand_popup").hide();
				$("#content_part").hide();
				$("#footer").hide();
			} )
			base.utils.coverLayer.alphaEnd();
		});

		//车系点击事件
		$(".series-box").on("click", "li", function() {
			seriesId = $(this).find("a").attr("data-id");
			base.utils.coverLayer.alphaStart();
			$.ajax({
				type: "GET",
				dataType: "json",
				async: false,
				url: "http://" + window.location.host + base.address.assess.year + "/?series_id=" + seriesId,
				success: function(yearData) {
					var temp = "";

					for(i=0; i<yearData.length; i++) {
						temp += "<li data-year='" + yearData[i] + "'>" + yearData[i] + "年</li>";
					}
					$(".select-year").html("");
					$(".select-year").append(temp);
				},
				error: function() {}
			})

			base.utils.webkitTransform( "year_popup", [], function() {
				$("#series_popup").hide();
				$("#content_part").hide();
				$("#footer").hide();
			} );
			base.utils.coverLayer.alphaEnd();
		});

		//购买年份点击事件
		$(".select-year").on("click", "li", function() {
			dataYear = $(this).attr("data-year");
			base.utils.coverLayer.alphaStart();
			$.ajax({
				type: "GET",
				dataType: "json",
				async: false,
				url: "http://" + window.location.host + base.address.assess.model + "/?series_id=" + seriesId + "&purchase_year=" + dataYear,
				success: function(modelData) {
					var temp = "<h2 class='list-title'><span class='name'>款式名称</span><span class='price'>新车价格</span></h2>"

					for(var i in modelData) {
						temp += "<h2 class='glb-title'><span>" + i + "</span></h2>"
						 	 + "<ul class='list-car'>";
				 		for(var j in modelData[i]) {
				 			temp += "<li><span class='name' data-id='" + modelData[i][j].id + "' data-sub-title='" + modelData[i][j].sub_title + "'>" + modelData[i][j].title + "</span><span class='price'>" + modelData[i][j].new_price + "万</span></li>";
				 		}
				 		temp += "</ul>";
					}

					$("#model_popup .assess-main").html("");
					$("#model_popup .assess-main").append(temp);
				},
				error: function() {}
			})
			base.utils.webkitTransform( "model_popup", [], function() {
				$("#year_popup").hide();
				$("#content_part").hide();
				$("#footer").hide();
			} );
			base.utils.coverLayer.alphaEnd();
		});
		
		//车型点击事件
		$("#model_popup .assess-main").on("click", "li", function() {
			dataId = $(this).find("span").eq(0).attr("data-id");
			var dataSubTitle = $(this).find("span").eq(0).attr("data-sub-title");

			//$(this).addClass("active");
			$(".table-cell").removeClass("table-null");
			$(".table-cell").html(dataSubTitle);
			$(".table-cell").attr("data-id", dataId);
			base.utils.webkitTransform( "model_popup", ["content_part","footer"], function() {
				$("#model_popup").hide();
			} );
		});

		//快速评估按钮的点击事件
		$("#quickAssessBtn").on("click", function() {
			var dataPinyin = $("#assess_area").attr("data-pinyin") || "";
			var kilometre = $("#assess_km").val();

			if( dataId && dataPinyin ) {
				$.ajax({
					type: "GET",
					dataType: "json",
					async: false,
					url: "http://" + window.location.host +base.address.assess.check + "/?model_simple_id=" + dataId + "&province_py=" + dataPinyin + "&km=" + kilometre + "&purchase_year=" + dataYear,
					success: function(assessData) {
						if( assessData.code === 1 ) {
							if( assessData.price_new !== "" && assessData.price_new.length !== 0 ) {
								$(".new-car .m").html(assessData.price_new.price + "+" + assessData.price_new.tax + "(购置税)=<i>" + assessData.price_new.total + "万元</i>");
								$(".new-car").show();
							}else {
								$(".new-car").hide();
							}
							if( assessData.price_used !== "" && assessData.price_used.length !== 0 ) {
								$("#assess_price .price").html(assessData.price_used.buying_price + "万元~" + assessData.price_used.selling_price + "万元");
							}else {
								$("#assess_price").hide();
								$("#assess_noprice").show();
							}
							if( assessData.url ) {
								$(".see-car").html("查看" + "“" + assessData.model.brand_name + " " + assessData.model.series_name + "”" + "在售车源");
								$(".see-car").data("url", assessData.url);
							}else {
								$(".see-car").hide();
							}
							$("#content_part").hide();
							$("#assess_result").show();	
						}
					},
					error: function() {}
				})
			}else {
				$(".question-center").find("i").html("请填写评估信息");
				base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
			}
	
		});
	
		//继续评估按钮的点击事件
		$("#reassessBtn").on("click", function() {
			$("#content_part").show();
			$("#assess_result").hide();	
		});

		//查看在售车源按钮的点击事件
		$(".see-car").on("click", function() {
			if( $(this).attr("data-url") ) {
				window.location.href = $(this).attr("data-url");
			}
		});

		//车辆评估页面上的各种返回按钮的点击事件
		$(".wrap").on("click", ".return", function() {
			if( $(this).attr("data-parentid") === "sub_page" ) {
				if( $("#content_part").css("display") !== "none" ) {
					window.location.href = "/";
				}else {
					$("#content_part").show();
					$("#assess_result").hide();
				}
			}else if( $(this).attr("data-parentid") === "area_popup" ) {
				base.utils.webkitTransform( "area_popup", ["content_part", "footer"], function() {
					$("#area_popup").hide();
				} );
			}else if( $(this).attr("data-parentid") === "brand_popup" ) {
				base.utils.webkitTransform( "brand_popup", ["content_part", "footer"], function() {
					$("#brand_popup").hide();
				} );
			}else if( $(this).attr("data-parentid") === "series_popup" && $(this).attr("data-recoverid") === "brand_popup" ) {
				base.utils.webkitTransform( "series_popup", ["brand_popup"], function() {
					$("#series_popup").hide();
				} );
			}else if( $(this).attr("data-parentid") === "year_popup" && $(this).attr("data-recoverid") === "series_popup" ) {
				base.utils.webkitTransform( "year_popup", ["series_popup"], function() {
					$("#year_popup").hide();
				} );
			}else if( $(this).attr("data-parentid") === "model_popup" && $(this).attr("data-recoverid") === "year_popup" ) {
				base.utils.webkitTransform( "model_popup", ["year_popup"], function() {
					$("#model_popup").hide();
				} );
			}
		});

	})
})