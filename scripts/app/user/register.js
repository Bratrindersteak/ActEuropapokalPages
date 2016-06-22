define(function(require, exports, module) {
	var $ = require("zepto");
	var base = require("base");
	var render = require("render");
	var protocol_tpl = require("{tpl_path}/static2015/template/protocol.tpl");
	var protocol_data = {
		protocol: protocol_tpl
	};
	$(function() {
		render.tpl("protocol_tpl", protocol_data);
		var comm = new render.events.common();
		var tipsElement = $(".question-center");

		$("#quickRegisterBtn").on("click", function() {
			if (!base.utils.checkMobile($("#userPhoneNum").val())) {
				$(".question-center").find("i").html("请输入正确手机号码");
				base.utils.coverLayer.tipsCover(tipsElement, "hint-not");
				return false;
			}

			if ($("#phoneCaptcha").val() === "") {
				$(".question-center").find("i").html("请输入手机验证码");
				base.utils.coverLayer.tipsCover(tipsElement, "hint-not");
				return false;
			}

			base.common.postData(base.address.register_validsms, "phone=" + $("#userPhoneNum").val() + "&captcha=" + $("#phoneCaptcha").val(), false, function(data) {
				if (data.code === 1) {
					$("#content_part").hide();
					$(".login-hint").hide();
					$("#registerResult").show();
					ga('send', 'event', 'register-action', 'click', $("#userPhoneNum").val());
				} else if (data.code === 3) {
					$("#content_part").hide();
					$("#registerResult, .login-hint").show();
					ga('send', 'event', 'register-action', 'click', $("#userPhoneNum").val());
				} else {
					$(".question-center").find("i").html("验证码错误");
					base.utils.coverLayer.tipsCover(tipsElement, "hint-not");
				}
			}, function() {});
		});

		$(".btn-dl").on("click", function() {
			// quick login .
			base.common.postData(base.address.quick_login, "phone=" + $("#userPhoneNum").val() + "&captcha=" + $("#phoneCaptcha").val(), false, function(data) {
				if (data.code === 1) {
					$(".question-center").find("i").html("登录成功");
					base.utils.coverLayer.tipsCover(tipsElement, "hint-ok");
					window.localStorage.setItem("userid", $("#userPhoneNum").val());
					ga('send', 'event', ' register-relogin', 'click', $("#userPhoneNum").val());

					setTimeout(function() {
						window.location.href = "/";
					}, 2000);
				} else {
					$(".question-center").find("i").html("验证码错误");
					base.utils.coverLayer.tipsCover(tipsElement, "hint-not");

					setTimeout(function() {
						$("#content_part").show();
						$("#registerResult").hide();
					}, 2000);
				}
			}, function() {});
		});

		$("#registerCommitBtn").on("click", function() {
			var password = $("#registerPassword").val();
			var re_password = $("#repeatPassword").val();

			if (password === "" || password !== re_password) {
				$(".question-center").find("i").html("请正确输入两次密码");
				base.utils.coverLayer.tipsCover(tipsElement, "hint-not");
				return false;
			}

			base.common.postData(base.address.register_commit, "phone=" + $("#userPhoneNum").val() + "&captcha=" + $("#phoneCaptcha").val() + "&password=" + re_password + "&password1=" + password, false, function(data) {
				if (data.code === 1) {
					$(".question-center").find("i").html("请记住您的密码哦");
					base.utils.coverLayer.tipsCover(tipsElement, "hint-ok");
					ga('send', 'event', 'register-password', 'click', $("#userPhoneNum").val());
					window.localStorage.setItem("userid", $("#userPhoneNum").val());

					setTimeout(function() {
						window.location.href = "/";
					}, 2000);
				} else {
					$(".question-center").find("i").html(data.info);
					base.utils.coverLayer.tipsCover(tipsElement, "hint-not");

					setTimeout(function() {
						$("#content_part").show();
						$("#registerResult").hide();
					}, 2000);
				}
			}, function() {});
		});

		$("#getCaptchaBtn").on("click", function() {
			if (base.utils.checkMobile($("#userPhoneNum").val())) {
				base.common.postData(base.address.register_sendsms, "phone=" + $("#userPhoneNum").val(), false, function(data) {
					var _count = 59;
					$("#getCaptchaBtn").hide();
					$("#repostCaptchaBtn").show();
					var timer = setInterval(function() {
						if (_count === 0) {
							clearInterval(timer);
							$("#repostCaptchaBtn").hide();
							$("#getCaptchaBtn").show();
						} else {
							$("#repostCaptchaBtn").html("重发验证码（" + (_count--) + "）");
						}
					}, 1000);
				}, function() {});
				ga('send', 'event', 'register-tel', 'click', $("#userPhoneNum").val());
			} else {
				$(".question-center").find("i").html("请输入正确手机号码");
				base.utils.coverLayer.tipsCover(tipsElement, "hint-not");
			}
		});

		$("#protocol_part").on("click", function() {
			base.utils.webkitTransform("protocol_popup", [], function() {
				$("#content_part").hide();
				$("#footer").hide();
				$(".return-top").trigger("click");
			});
		});
		comm.commonEventBind();
	})
})