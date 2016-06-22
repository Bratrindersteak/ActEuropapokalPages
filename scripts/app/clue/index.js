define(function(require, exports, module) {
    var $ = require("zepto");
    var base = require("base");
    var render = require("render");
    $(function() {
        var brand_name, series_name, brand_id, series_id = null;

        $("#buysell").on("click", function () {
            var  remark = $("#remark").val();
            var  contact_phone = $("#contact_phone").val();
            var url = $("#form-clue-form").attr("action");
            url = '/' + url.replace(/^\/(.*)/, "$1");

            if (remark.length === 0) {
                $(".hint-not i").text("请填写您的购车需求");
                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                return false;
            }

            if (remark.length > 500) {
                $(".hint-not i").text("您输入的文字已超限制，请删减后再提交！");
                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                return false;
            }
            if (contact_phone.length === 0) {
                $(".hint-not i").text("请输入您的手机号码");
                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                return false;
            }
            if (!base.utils.checkMobile(contact_phone)) {
                $(".hint-not i").text("手机号码错误，请重新输入");
                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                return false;
            }

            base.common.postData(url, "contact_phone=" + contact_phone + "&remark=" + remark, false, function(returnData) {
                if (returnData.code === 1) {
                    $(".hint-ok i").text("提交成功！");
                    base.utils.coverLayer.tipsCover($(".question-center"), "hint-ok");
                    setTimeout(function() {
                        location.href = location.href;
                    }, 3000);
                } else {
                    $(".hint-not i").text("提交失败！");
                    base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                }
            }, function() {});
        });

        $(".see-car").on("click", function() {
            var name = $("#FormClue_contact_name").val();
            var phone = $("#FormClue_contact_phone").val();
            var remarks = $("#FormClue_remarks").val();
            var brand_series = $("#FormClue_wish_series").val();
            var url = $("#form-clue-form").attr("action");
            url = '/' + url.replace(/^\/(.*)/, "$1");

            if (name.length === 0) {
                $(".hint-not i").text("请输入您的姓名");
                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                return false;
            }

            if (phone.length === 0) {
                $(".hint-not i").text("请输入您的联系电话");
                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                return false;
            }

            if (!base.utils.checkMobile(phone)) {
                $(".hint-not i").text("手机号码错误，请重新输入");
                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                return false;
            }

            if(brand_series === "") {
                $(".hint-not i").text("请选择车型");
                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                return false;
            }

            if (remarks.length === 0) {
                $(".hint-not i").text("请输入车辆概况");
                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                return false;
            }

            if (remarks.length > 500) {
                $(".hint-not i").text("您输入的文字已超限制，请删减后再提交！");
                base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                return false;
            }

            console.log(series_id + "-" + brand_id);
            base.common.postData(url, "FormClue[contact_name]=" + name + "&FormClue[contact_phone]=" + phone 
                + "&FormClue[remarks]=" + remarks + "&FormClue[wish_series]=" + brand_series + "&FormClue[wish_series_id]=" 
                + series_id + "&FormClue[wish_brand_id]=" + brand_id,false, function(returnData) {
                if (returnData.code === 1) {
                    $(".hint-ok i").text("提交成功！");
                    base.utils.coverLayer.tipsCover($(".question-center"), "hint-ok");
                    setTimeout(function() {
                        location.href = location.href;
                    }, 3000);
                } else {
                    $(".hint-not i").text("提交失败！");
                    base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                }
            }, function() {});
        });

        $(".brand-choice").on("click", function(e) {
            base.utils.webkitTransform("brand_popup", [], function() {
                $("#content_part").hide();
                $("#footer").hide();
            });
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
            brand_id = $(this).attr("data-id");
            brand_name = $(this).find("span").html();
            carModelsRequest(null, base.address.assess.series, "/?brand_id=" + brand_id, seriesDataCallback);
        });
        // the click event of series items 
        $(".series-box").on("click", "li", function() {
            series_id = $(this).find("a").attr("data-id");
            series_name = $(this).find("a").html();

            $("#FormClue_wish_series").val(brand_name.trim() + " " + series_name.trim());
            $("#FormClue_wish_brand_id").val(brand_id);
            $("#FormClue_wish_series_id").val(series_id);
            base.utils.webkitTransform("series_popup", ["content_part", "footer"], function() {
                    $("#series_popup").hide();
            });
        });
    });

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
})