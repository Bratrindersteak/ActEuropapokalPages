define(function(require, exports, module){
	var $ = require("zepto");
	var base = require("base");
	
	$(function(){
		$("#sendSMSBtn").on("click", function(){
			if( base.utils.checkMobile( $("#phoneNumer").val() ) ){
				base.common.postData( base.address.send_sms, "phone="+ $("#phoneNumer").val() , false, function( data ){
					var _count = 59;
					$("#sendSMSBtn").hide();
					$("#validateNext i").eq(0).removeClass("again").addClass("gr");
					$("#validateNext i").trigger("click", "disable");
					base.utils.fade( [ $("#phoneCaptcha"), $("#validateNext") ], "in", 200 );
					var timer = setInterval(function(){
						if( _count === 0 ){
							clearInterval(timer);
							$("#validateNext i").eq(0).html("重发验证码");
							$("#validateNext i").eq(0).removeClass("gr").addClass("again");
						}else{
							$("#validateNext i").eq(0).html( "重发验证码(" + (_count--) + ")" );
						}
					}, 1000);
				}, function(){} );
			}else{
				base.utils.fade( $("#phoneNumberError"), "in", 200 );
			}
		});

		$("#phoneNumer, #phoneCaptcha").on("keyup",function(){
			base.utils.fade( [ $("#phoneNumberError"), $("#phoneCaptchaError") ], "out", 200 );
		});

		$("#questionValidate .icon-del").on("click", function(){
			base.utils.fade( [ $("#questionValidate"), $(".alpha") ], "out" );
		});

		$("#validateNext i").on("click", function( e, type ){
			if( type === "disable" ){
				e.preventDefault();
			}else{
				if( $(this).hasClass("again") ){
					// resend captcha .
					$("#sendSMSBtn").trigger("click");
				}else{
					// question finished .
					if( $("#phoneCaptcha").val() !== "" && $("#phoneCaptcha").val().length === 6 ){
						base.common.postData( base.address.question_validate, "title="+ $("#questionContent").val() + "&phone=" + $("#phoneNumer").val() + "&captcha=" + $("#phoneCaptcha").val(), false, function( returnData ){
							if( returnData.code === 1 ){
								base.utils.fade( [ $("#questionValidate") ], "out", 100 );
								base.utils.fade( $(".hint-ok"), "in");
								setTimeout(function(){
									window.history.go(-1);
								}, 1500);
							}else{
								base.utils.fade( $("#phoneCaptchaError"), "in", 200 );
							}
						}, function(){} );
					}
				}
			}
		});
	});
})