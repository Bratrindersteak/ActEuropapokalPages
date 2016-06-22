define(function(require, exports, module) {
    var $ = require("zepto");
    var base = require("base");
    var render = require("render");
    $(function() {
        $("#feedContent").on("keyup", function() {
            base.utils.fade($("#hint_error"), "out", 200);
        });
        $("#submitBtn").on("click", function() {
               var content = $("#feedContent").val();
               var phone = $("#phone").val();
               var refer_url = $("#refer_url").val();
               if ( content.length === 0 ) {
                        $(".hint-not i").text("请输入您的宝贵意见！");
                        base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                        return false;
               }
               if ( content.length > 150 ) {
                        $(".hint-not i").text("您输入的文字已超限制，请删减后再提交！");
                        base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                        return false;
               }
               if ( phone != '' && !base.utils.checkMobile( phone )) {
                       $(".hint-not i").text("手机号码错误，请重新输入");
                       base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                       return false;
               }

               base.common.postData(base.address.feedback_commit, "content=" + content + "&phone=" + phone + "&refer_url=" + refer_url, false, function(returnData) {
                            if (returnData.code === 1) {
                                    $(".hint-ok i").text("提交成功！3秒后自动跳转到刚才的页面");
                                    base.utils.coverLayer.tipsCover($(".question-center"), "hint-ok");
                                    setTimeout(function() {
                                        window.history.go(-1);
                                    }, 3000);
                             } else {
                                    $(".hint-not i").text("提交失败！");
                                    base.utils.coverLayer.tipsCover($(".question-center"), "hint-not");
                        }
                }, function() {});
        })
    })
    $(".wrap").on("click", ".return", function() {
        window.history.go(-1);
    });
})