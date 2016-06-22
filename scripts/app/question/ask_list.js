define(function(require, exports, module) {
	var $ = require("zepto");
	var base = require("base");

	$(function() {
		var cur_page = 1;

		$("#view_more").on("click", function() {
			base.utils.coverLayer.alphaStart();
			base.common.getData(base.address.ask_list, "/?page=" + cur_page, false, askListDataCallback, askListDataErrorProcess);
			cur_page++;
		});

		var askListDataCallback = function(askListData) {
			console.log(askListData);
			if (askListData.lists.length > 0) {
				var _askListData = askListData.lists;
				var temp_str = "";
				for (var i = 0; i < _askListData.length; i++) {
					var _createTime, _username = "";


					if (_askListData[i].create_time) {
						_createTime = _askListData[i].create_time.split(" ")[0];
					}

					if (_askListData[i].phone !== null) {
						_username = _askListData[i].phone;
					} else if (_askListData[i].mail !== null) {
						_username = _askListData[i].mail;
					} else {
						_username = "匿名";
					}

					var extra_param = base.utils.queryUrlExtraData();
					if (extra_param != "") {
						extra_param = "?" + extra_param;
					}
					temp_str += "<div class='consult-box'><div class='consult-ask'><p class='fl'><span class='user'>" + _username + "<i>提问</i></span></p>" + ((_askListData[i].reply_count == 0) ? "<i class='ask-off'>未解答</i></div>" : "<i class='ask'>已解答</i></div>") + "<a data-url='/ask/" + _askListData[i].id + ".html" + extra_param + "'><p class='text'>" + _askListData[i].title + "</p></a><p class='time'>" + _createTime + "</p>";

					if (_askListData[i].reply !== undefined) {
						temp_str += "<div class='consult-inte'><div class='img'><img src='/static2015/dist/images/default.jpg' width='100%'>" + "</div><div class='txt'><p class='til-gray'></p><p class='main'>" + _askListData[i].reply.content + "</p></div></div></div>";
					} else {
						temp_str += "</div>"
					}
				}
				$(".consult").append(temp_str);
				base.utils.coverLayer.alphaEnd();
			}
		}

		$(".consult").on("click", ".consult-box", function() {

			if ($(this).find("a").attr("data-url") !== "") {
				window.location.href = $(this).find("a").attr("data-url");
			}
		});

		var askListDataErrorProcess = function() {};
	})


})