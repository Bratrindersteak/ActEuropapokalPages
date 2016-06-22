define(function(require, exports, module) {
	var $ = require("zepto");
	var base = require("base");

	$(function() {
		var wrap_width = $(".wrap").width();

		var carListDataCallback = function( carData ){
			var carListResult = "";
			if( parseInt(carData.param.is_around) === 1 ){
				var temp_patchList  = "";

				if( carData.lists ){
					if( carData.lists.length > 0 ){
						carListResult = fillCarListData( carData.lists, "" );
						$(".car-list-box ul").append( carListResult );
					}
				}
				if( carData.around_cars.lists.length > 0 ){
					if( carData.around_cars.pageIndex === 1 && carData.page.is_last === 0 ){
						temp_patchList = "<h4 class='reco-title rim-car'><i></i><span>在您周边，还有<em>" + carData.around_cars.totalNumber + "</em>辆</span></h4><ul>";
						$("#view_around").show();

						carListResult = fillCarListData( carData.around_cars.lists, temp_patchList );
						$(".car-list-box ul").after( carListResult + "</ul>");
					}else if( carData.page.is_last === 1 ){
						carListResult = fillCarListData( carData.around_cars.lists, temp_patchList );
						$(".car-list-box ul").eq(1).append( carListResult );
						$("#view_around").remove();
					}else{
						carListResult = fillCarListData( carData.around_cars.lists, temp_patchList );
						$(".car-list-box ul").eq(1).append( carListResult );
					}
				}

				$("#view_more").remove();
				$("#view_around p").attr( "data-url", carData.url );
				$("#view_around p").attr( "data-around", parseInt(carData.param.is_around) );
			}else{
				carListResult = fillCarListData( carData.lists, "" );
				$(".car-list-box ul").append( carListResult );
				$("#view_more p").attr( "data-url", carData.url );
			}

			$("img.lazy").lazyload({
				effect: "fadeIn",
				threshold : 200,
				effectspeed :  200,
				event : "load"
			});
			base.utils.coverLayer.alphaEnd();
		}

		var seriesDataCallback = function(seriesData){
			var temp_seriesList = "";
			// the style turns grey when no cars in return data ( finshed ) . 
			for(var i in seriesData.all_series){
				var all_series_obj = seriesData.all_series[i];
				var exist_series_obj = seriesData.exist_series;

				temp_seriesList +="<div class='line-box'><h2 class='glb-title'><span>" + i + "</span></h2><ul>";
				for(var j=0; j< all_series_obj.length; j++){
					var _flag = false;
					for( var k=0; k < exist_series_obj.length; k++ ){
						if( all_series_obj[j].pinyin === exist_series_obj[k] ){
							_flag = true;
							temp_seriesList += "<li><a data-url='"+  all_series_obj[j].url +"'>" + all_series_obj[j].name + "</a></li>";
							break;
						}
					}
					if( !_flag ){
						temp_seriesList += "<li class='empty'><a data-url='"+  all_series_obj[j].url +"'>" + all_series_obj[j].name + "</a></li>";
					}
				}

				temp_seriesList += "</ul></div>";

			}
			$("#series_popup header .sub-visit").prop("href", seriesData.url );
			$(".series-box").html( "" ).append( temp_seriesList );

			base.utils.webkitTransform( "series_popup", [], function(){
				$("#brand_popup").hide();
				$("#content_part").hide();
				$("#footer").hide();
				base.utils.coverLayer.alphaEnd();
			} );
		}
		
		var seriesDataErrorProcess = function(){}
		var carListDataErrorProcess = function(){}

		var fillCarListData = function( carData,  tempContainer ){
			var _data = carData;
			var _temp_carList = tempContainer;
			var _usedcar_url = "";

			for( var i=0; i < _data.length; i++ ){
				var _temp_brokenpart_str = "<div class='txt-server'><p>";
				var _sprq = $.inArray( _data[i].sprq.split("-")[0] , ["1970", "2900"] )  >= 0  ? "未上牌" :  _data[i].sprq.split("-")[0] + "年";

                _usedcar_url = _data[i].m_url;
				
				if( _data[i].source_id === 40 ){
					_temp_carList += "<li class='haoche'><i class='icon-hc'></i><div class='img'><img class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='" + base.utils.photoSmallToMedium(_data[i].picture) + "' data-url=" + _usedcar_url + " width='100%' /></div><div class='txt'><p class='til'>" + _data[i].title_l
						          +   "</p><div class='txt-price'><span class='fl'>￥"+ _data[i].price +"万</span><span class='fr'>" + _sprq + "<i>|</i>" + _data[i].bxlc + "万公里</span>"
						          +   "</div><div class='txt-server'><p><span class='white'>99好车</span><span>诚信车源</span><span>全方位保障</span></p></div></div></li>";
				}else{
					_temp_carList += "<li><div class='img'><img class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='" + base.utils.photoSmallToMedium(_data[i].picture) + "' data-url=" + _usedcar_url + " width='100%' /></div><div class='txt'><p class='til'>" + _data[i].title_l + "</p>"
							+ "<div class='txt-price'><span class='fl'>￥"+ _data[i].price +"万</span><span class='fr'>" +_sprq + "<i>|</i>" + _data[i].bxlc + "万公里</span></div>";

					if( _data[i].rzc === 1){
						_temp_brokenpart_str += "<span>认证</span>";
					}

					if( _data[i].brokenpart !== "" ) {
						var _brokenpart_arr = _data[i].brokenpart.split(",");
						
						if( $.inArray("1", _brokenpart_arr) >= 0 || $.inArray("2", _brokenpart_arr) >= 0 ) {
							_temp_brokenpart_str += "<span>代办</span>";
						}
						if( $.inArray("3", _brokenpart_arr) >= 0 || $.inArray("4", _brokenpart_arr) >= 0 ) {
							_temp_brokenpart_str += "<span>质保</span>";
						}
						if( $.inArray("6", _brokenpart_arr) >= 0 ) {
							_temp_brokenpart_str += "<span>退换</span>";
						}
						if( $.inArray("8", _brokenpart_arr) >= 0 ) {
							_temp_brokenpart_str += "<span>贷款</span>";
						}

						_temp_carList += _temp_brokenpart_str + "</p></div></div></li>";
					}else if( _data[i].rzc !== 1 ){
						_temp_carList += "</div></li>";
					}else{
						_temp_carList += _temp_brokenpart_str + "</p></div></div></li>";
					}
				}
				
			}
			return _temp_carList;
		}

		$(".tabs-title li").on("click", function() {
			// the tabs button click events in the car list page .
			if( $(this).attr("data-item") === "tabs_brand" ){
				base.utils.webkitTransform( "brand_popup", [], function(){
					$("#content_part").hide();
					$("#footer").hide();
				} );
			}else if( $(this).attr("data-item") === "tabs_empty" && $(this).attr("data-url") !== "" && !$(this).hasClass("empty") ){
				window.location.href = $(this).attr("data-url");
			}else{
				if($("#" + $(this).attr("data-item").split("_")[1] + "_view") .css("display")!== "none"){
					$("#" + $(this).attr("data-item").split("_")[1] + "_view") .hide();
					$(this).removeClass("active");
				}else{
					$(".tabs-box").hide();
					$(this).siblings().removeClass("active");
					$(this).addClass("active");
					$("#" + $(this).attr("data-item").split("_")[1] + "_view").show();
				}
			}
		});

		$(".brand-title li").on("click", function(){
			// quick letter .
			var _cur_letter = $(this).html();
			var _arr_letter = $(this).attr("data-quick").split(",");

			$(".brand-title li").removeClass("active");
			$(this).addClass("active");
			if( _arr_letter.join("") === _cur_letter ){
				$(".brand-box").hide();
				for( var i=0; i < _arr_letter.length; i++ ){
					$(".brand-box-" + _arr_letter[i]).show();
				}
			}
		});

		$(".brand-box").on("click", "li", function(){
			// the event of the car brand logo .
			var cur_url = $(this).find("em").attr("data-url");
			if( !$(this).hasClass("empty") && cur_url != "" ){
				base.utils.coverLayer.alphaStart();
				base.common.getData( base.address.series, cur_url, false, seriesDataCallback, seriesDataErrorProcess );
			}
		});

		$(".series-box").on("click", "li", function(){
			// the event of the car series .
			var cur_url = $(this).find("a").attr("data-url");
			if( !$(this).hasClass("empty") && cur_url != "" ){
				$(this).addClass("selected");
				window.location.href = cur_url;
			}
		});

		$("#service_view li").on("click", function(){
			var base_url = "";
			var km_param = "";

			if( !$(this).hasClass("confirm-btn") ){
				// add styles to the subitems of service tab on click event trigger .
				$(this).toggleClass("active");
			}else if( $("#service_view .confirm-btn").siblings(".active").length > 0 ){
				// service items confirm .
				var temp_id = "";
				var join_str = "";
				var active_obj = null;

				if( $("#service_view .confirm-btn").prev().hasClass("active") ){
					active_obj = $("#service_view li[data-type='rzc']").siblings(".active").children("a");
					base_url =  $("#service_view .confirm-btn").prev().children("a").attr("data-url");
				}else{
					active_obj = $(this).siblings(".active").children("a");
					base_url = $( active_obj[0] ).attr("data-url").replace("ca1t", "cat");
				}

				for( var i=0; i < active_obj.length; i++ ){
					var active_url = $( active_obj[i] ).attr("data-url");
					var args = "";

					if( active_url.indexOf("scac") > -1 ){
						args = active_url.match(/scac(\d*)/)[1].toString();
					}else if( active_url.match(/(c)\d/g) !== null ){
						args = active_url.match(/(c)\d/g).toString().split("c")[1];
						km_param  = base_url.match(/sca(\d\_\d*)/)[1].toString();
					}

					temp_id += args + "_";
				}

				join_str  = base_url.split("sca")[0] + "sca" + km_param + "cp" + base_url.split("sca")[1].toString().split("p")[1];
				window.location.href = join_str.replace( "sca" + km_param + "c", "sca" + km_param + "c" + temp_id.substring( 0, temp_id.length-1 ) ).toString();
			}else{
				// no service items .
				base_url = $("#service_view .confirm-btn").prev().children("a").attr("data-url").replace("ca1t", "cat");
				var no_service_url = base_url.split("sca")[0] + "sca" + km_param + "cp" + base_url.split("sca")[1].toString().split("p")[1];
				
				if( base_url.match(/sca(\d\_\d*)/) !== null ){
					km_param  = base_url.match(/sca(\d\_\d*)/)[1].toString();
				}

				if( no_service_url.split("param=")[1] === "pasdsvepcatcpbnscacp" ){
					window.location.href = window.location.href.split("?param")[0];
				}else{
					window.location.href = no_service_url;
				}
				
			}
		});

		$("#view_more p, #view_around p").on("click", function(){
			// view more data .
			var around_status = parseInt($(this).attr("data-around"));
			var cur_url = $(this).attr("data-url");
			base.utils.coverLayer.alphaStart();
			base.common.getData( "", ( /param/.test(cur_url) === true ? (cur_url + "&") : (cur_url + "?") )+ "is_around="+ around_status +"&ajax_commit=1", false, carListDataCallback, carListDataErrorProcess );
		});

		$(".car-list-box").on("click", "li", function(){
			if( $(this).find("img").attr("data-url") !== "" ){
				window.location.href = $(this).find("img").attr("data-url");
			}
		});

		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold : 200,
			effectspeed :  200
		})
	})
})