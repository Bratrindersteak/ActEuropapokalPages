define(function(require, exports, module){
	var $ = require("zepto");
	var base = require("base");
	var render = require("render");

	$(function(){
		var comm = new render.events.common();

		$("#loginBtn").on("click", function(){
			if( $("#LoginForm_username").val() === "" ){
				$(".question-center").find("i").html("请输入正确用户名");
				base.utils.coverLayer.tipsCover( $(".question-center"), "hint-not" );
				return false;
			}

			if( $("#LoginForm_password").val() === ""  ){
				$(".question-center").find("i").html("请输入密码");
				base.utils.coverLayer.tipsCover( $(".question-center"), "hint-not" );
				return false;
			}

			base.common.postData( base.address.login, "LoginForm[username]="+ $("#LoginForm_username").val() +"&LoginForm[password]=" + $("#LoginForm_password").val() , false, function( data ){
				if( (data.username || data.password ) !== undefined ){
					$(".question-center").find("i").html("用户名或密码错误");
					base.utils.coverLayer.tipsCover( $(".question-center"), "hint-not" );
					ga( 'send', 'event', 'login-error', 'click', $("#LoginForm_username").val() );
				}else{
					ga( 'send', 'event', 'login-success', 'click', $("#LoginForm_username").val() );
					window.localStorage.setItem( "userid", $("#LoginForm_username").val() );
					window.history.go(-1);
				}
			}, function(){} );

			ga('send', 'event', 'login', 'click', 'login action');
		});

		comm.commonEventBind();
	})
})