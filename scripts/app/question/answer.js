define(function(require, exports, module){
	var $ = require("zepto");
	var base = require("base");
	
	$(function(){
		$(".reply").on("click", function() {
			var _parentId = $(this).attr("parent_id");

			if ($(this).attr("parent_id") == 0) {
				var _textArea = $(this).parent().siblings(".comment-box").find("textarea");
				var _responseTo = $(this).parent().siblings(".comment-box").find(".schwarz");

				$(window).scrollTop(_textArea.offset().top);
				_textArea.focus();
				_responseTo.html("回复：" + $(this).parents(".txt").find(".til-gray").html());
				_textArea.attr("data-parentid", _parentId);
			} else {
				var _textArea = $(this).parents(".comment-box").find("textarea");
				var _responseTo = $(this).parents(".comment-box").find(".schwarz");
				var _replyId = "";

				$(window).scrollTop(_textArea.offset().top);
				_textArea.focus();			
				if ($(this).parent().siblings(".gray").html().match("回复")) {
					_replyId = $(this).parent().siblings(".gray").html();
					_replyId = _replyId.split(" 回复 ")[0];
				} else {
					_replyId = $(this).parent().siblings(".gray").html();
				}
				_responseTo.html("回复：" + _replyId);
				_textArea.attr("data-parentid", _parentId);
			}	
		})

		$("#sendSMSBtn").on("click", function() {
			if (base.utils.checkMobile($("#phoneNumer").val())) {
				base.common.postData(base.address.send_sms, "phone=" + $("#phoneNumer").val(), false, function(data) {
					var _count = 59;
					$("#sendSMSBtn").hide();
					$("#validateNext i").eq(0).removeClass("again").addClass("gr");
					$("#validateNext i").trigger("click", "disable");
					base.utils.fade([$("#phoneCaptcha"), $("#validateNext")], "in", 200);
					var timer = setInterval(function() {
						if (_count === 0) {
							clearInterval(timer);
							$("#validateNext i").eq(0).html("重发验证码");
							$("#validateNext i").eq(0).removeClass("gr").addClass("again");
						} else {
							$("#validateNext i").eq(0).html("重发验证码(" + (_count--) + ")");
						}
					}, 1000);
				}, function() {});
			} else {
				base.utils.fade($("#phoneNumberError"), "in", 200);
			}
		});

		$("#phoneNumer, #phoneCaptcha").on("keyup", function() {
			base.utils.fade([$("#phoneNumberError"), $("#phoneCaptchaError")], "out", 200);
		});

		$("#questionValidate .icon-del").on("click", function() {
			base.utils.fade([$("#questionValidate"), $(".alpha")], "out");
		});

		$("#validateNext i").on("click", function(e, type) {
			var _content = $(this).parents(".question-center").siblings(".nichts").find("textarea").val();
			var _replyId = $(this).parents(".question-center").siblings(".nichts").find("textarea").attr("data-replyid");
			var _parentId = $(this).parents(".question-center").siblings(".nichts").find("textarea").attr("data-parentid");

			if (type === "disable") {
				e.preventDefault();
			} else {
				if ($(this).hasClass("again")) {
					// resend captcha .
					$("#sendSMSBtn").trigger("click");
				} else {
					// question finished .
					if ($("#phoneCaptcha").val() !== "" && $("#phoneCaptcha").val().length === 6) {
						base.common.postData(base.address.comment_validate, "content="+ _content + "&phone=" + $("#phoneNumer").val() + "&captcha=" + $("#phoneCaptcha").val() + "&reply_id=" + _replyId + "&parent_id=" + _parentId, false, function(returnData) {
							if (returnData.code === 1) {
								base.utils.fade([$("#questionValidate")], "out", 100);
								base.utils.fade($(".hint-ok"), "in");
								setTimeout(function() {
									window.location.reload();
								}, 1500);
							} else {
								base.utils.fade($("#phoneCaptchaError"), "in", 200);
							}
						}, function() {});
					}
				}
			}
		});
	});
})