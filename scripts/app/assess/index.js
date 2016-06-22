define(function(require, exports, module) {
        var $ = require("zepto");
        var base = require("base");
        var render = require("render");
        $(function() {
                var series_id, model_year, model_id = "";
                var Header = render.events.header;
                var area_tpl = require("{tpl_path}/static2015/template/area.tpl");
                var area_data = {
                        area: area_tpl
                }
                render.tpl("area_tpl", area_data);
                Header.prototype = new render.events.common();
                Header.prototype.constructor = Header;
                var header = new Header();
                header.tapProvince();
                // return button event centralized disposing .
                $(".wrap").on("click", ".return", function(e) {
                        var obj_id = $(this).attr("data-parentid");
                        var _recoverArr = $(this).attr("data-recoverid") || ["content_part", "footer"];
                        if (obj_id === "sub_page") {
                                var content_part = $("#content_part");
                                if (content_part.css("display") !== "none") {
                                        var query = base.utils.queryUrlExtraData();
                                        if (query == '') {
                                                window.location.href = '/';
                                        } else {
                                                window.location.href = '/?' + query;
                                        }
                                } else {
                                        $("#assess_result").hide();
                                        $("#content_part").show();
                                }
                        } else {
                                if (typeof _recoverArr === "string") {
                                        _recoverArr = Array.call(this, _recoverArr);
                                }
                                base.utils.webkitTransform(obj_id, _recoverArr, function() {
                                        $("#" + obj_id).hide()
                                });
                                e.stopPropagation();
                        }
                });
                $(".speed li").on("click", function(e) {
                        if ($(this).index() === 0) {
                                // the area of cars .
                                $(".sub-visit").remove();
                                base.utils.webkitTransform("area_popup", [], function() {
                                        $("#content_part").hide();
                                        $("#footer").hide();
                                });
                                ga('send', 'event', 'pinggu', 'click', '车辆所在地');
                        } else if ($(this).index() === 1) {
                                // find car model .
                                base.utils.webkitTransform("brand_popup", [], function() {
                                        $("#content_part").hide();
                                        $("#footer").hide();
                                });
                                ga('send', 'event', 'pinggu', 'click', '车型选择');
                        }
                });
                // the brand quick letter .
                $(".brand-title li").on("click", function() {
                        var _cur_letter = $(this).html();
                        var _arr_letter = $(this).attr("data-quick").split(",");
                        $(".brand-title li").removeClass("active");
                        $(this).addClass("active");
                        if (_arr_letter.join("") === _cur_letter) {
                                $(".brand-box").hide();
                                for (var i = 0; i < _arr_letter.length; i++) {
                                        $(".brand-box-" + _arr_letter[i]).show();
                                }
                        }
                });
                // the click event of the car brand logo .
                $(".brand-box").on("click", "li", function() {
                        carModelsRequest(null, base.address.assess.series, "/?brand_id=" + $(this).attr("data-id"), seriesDataCallback);
                });
                // the click event of series items 
                $(".series-box").on("click", "li", function() {
                        series_id = $(this).find("a").attr("data-id");
                        carModelsRequest(this, base.address.assess.year, "/?series_id=" + series_id, yearDataCallback);
                });
                // the click event of year items 
                $(".select-year").on("click", "li", function() {
                        model_year = $(this).attr("data-year");
                        carModelsRequest(this, base.address.assess.model, "/?series_id=" + series_id + "&purchase_year=" + model_year, modelDataCallback);
                });
                // the click event of the cars model list .
                $(".assess-main").on("click", ".list-car li", function() {
                        model_id = $(this).find("span").eq(0).attr("data-id");
                        model_sub_title = $(this).find("span").eq(0).attr("data-sub-title");
                        $(this).addClass("active");
                        $(".table-cell").removeClass("table-null");
                        $(".table-cell").html(model_sub_title);
                        $(".table-cell").attr("data-id", model_id);
                        base.utils.webkitTransform("model_popup", ["content_part", "footer"], function() {
                                $("#model_popup").hide();
                        });
                });
                // assessment of car prices as quickly .
                $("#quickAssessBtn").on("click", function() {
                        var area_ename = $("#assess_area").attr("data-pinyin") || "";
                        var km = $("#assess_km").val() || 0;
                        if (area_ename && model_id) {
                                var extra_param = base.utils.queryUrlExtraData();
                                if (extra_param != '') {
                                        extra_param = '&' + extra_param;
                                }
                                base.common.getData(base.address.assess.check, "/?model_simple_id=" + model_id + "&province_py=" + area_ename + "&km=" + km + "&purchase_year=" + model_year + extra_param, false, assessSuccessCallback, function() {});
                                ga('send', 'event', 'pinggu', 'click', '快速评估');
                        } else {
                                $(".question-center").find("i").html("请填写评估信息");
                                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                        }
                });
                //  reassessment of car prices .
                $("#reassessBtn").on("click", function() {
                        $("#assess_result").hide();
                        $("#content_part").show();
                });
                // see more cars .
                $(".see-car").on("click", function() {
                        var _url = $(this).data("url");
                        if (_url) {
                                window.location.href = _url;
                        }
                });
        })
        var carModelsRequest = function(context, address, args, successCallback) {
                        var timer = null;
                        if (context) {
                                $(context).addClass("selected");
                                timer = setTimeout(function() {
                                        $(context).removeClass("selected");
                                        clearTimeout(timer);
                                }, 200);
                        }
                        base.utils.coverLayer.alphaStart();
                        base.common.getData(address, args, false, successCallback, function() {});
        }
                // callback methods
                // the style turns grey when no cars in return data ( finshed ) . 
        var seriesDataCallback = function(seriesData) {
                var temp_seriesList = "";
                for (var i in seriesData.series) {
                        var all_series_obj = seriesData.series[i];
                        temp_seriesList += "<div class='line-box'><h2 class='glb-title'><span>" + i + "</span></h2><ul>";
                        for (var j = 0; j < all_series_obj.length; j++) {
                                temp_seriesList += "<li><a data-id='" + all_series_obj[j].id + "'>" + all_series_obj[j].name + "</a></li>";
                        }
                        temp_seriesList += "</ul></div>";
                }
                $("#series_popup header .sub-visit").prop("href", seriesData.url);
                $(".series-box").html("").append(temp_seriesList);
                base.utils.webkitTransform("series_popup", [], function() {
                        $("#brand_popup").hide();
                        $("#content_part").hide();
                        $("#footer").hide();
                        base.utils.coverLayer.alphaEnd();
                });
        }
        var yearDataCallback = function(yearData) {
                var temp_yearDataList = "";
                // the style turns grey when no cars in return data ( finshed ) . 
                for (var i = 0; i < yearData.length; i++) {
                        temp_yearDataList += "<li data-year='" + yearData[i] + "'>" + yearData[i] + "年</li>";
                }
                $(".select-year").html("").append(temp_yearDataList);
                base.utils.webkitTransform("year_popup", [], function() {
                        $("#series_popup").hide();
                        $("#content_part").hide();
                        $("#footer").hide();
                        base.utils.coverLayer.alphaEnd();
                });
        }
        var modelDataCallback = function(modelData) {
                var modelDataList = "";
                for (var i in modelData) {
                        var model_sub_obj = modelData[i];
                        modelDataList += "<h2 class='glb-title'><span>" + i + "</span></h2><ul class='list-car'>";
                        for (var j in model_sub_obj) {
                                modelDataList += "<li><span class='name' data-id='" + model_sub_obj[j].id + "'  data-sub-title='" + model_sub_obj[j].sub_title + "'>" + model_sub_obj[j].title + "</span><span class='price'>" + model_sub_obj[j].new_price + "万</span></li>";
                        }
                        modelDataList += "</ul>";
                }
                $(".list-title").siblings().remove();
                $(".list-title").after(modelDataList);
                base.utils.webkitTransform("model_popup", [], function() {
                        $("#year_popup").hide();
                        $("#content_part").hide();
                        $("#footer").hide();
                        base.utils.coverLayer.alphaEnd();
                });
        }
        var assessSuccessCallback = function(assessData) {
                var price_used = assessData.price_used || "";
                var price_new = assessData.price_new || "";
                var url = assessData.url || "";
                var param = assessData.param;
                var area = assessData.area;
                var model = assessData.model;
                if (assessData.code === 1) {
                        $("#assess_content").find("h2").html("[" + area.area_name + "] " + assessData.model.title);
                        if (price_new !== "" & price_new.length !== 0) {
                                $(".new-car .m").html(price_new.price + "+" + price_new.tax + "(购置税)=<i>" + price_new.total + "万元</i>");
                                $(".new-car").show();
                        } else {
                                $(".new-car").hide();
                        }
                        if (price_used !== "" && price_used.length !== 0) {
                                $("#assess_price .price").html(price_used.buying_price + "万元~" + price_used.selling_price + "万元")
                        } else {
                                $("#assess_price").hide();
                                $("#assess_noprice").show();
                        }
                        if (url) {
                                $(".see-car").html("查看" + "“" + model.brand_name + " " + model.series_name + "”" + "在售车源");
                                $(".see-car").data("url", url);
                        } else {
                                $(".see-car").hide();
                        }
                        $("#content_part").hide();
                        $("#assess_result").show();
                }
        }
})