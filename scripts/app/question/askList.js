define(function(require,exports,module) {
	var $ = require("zepto");
	var base = require("base");

	$(function() {
		var currentPage = 1;

		$("#view_more p").on("click", function() {
			base.utils.coverLayer.alphaStart();
			$.ajax({
				type: "GET",
				dataType: "json",
				async: false,
				url: "http://" + window.location.host + base.address.ask_list + "/?page=" + currentPage,
				success: function(askData) {
					if( askData.lists.length > 0 ) {
						var temp = "";

						for( i=0; i<askData.lists.length; i++ ) {
							var questionTime = askData.lists[i].create_time.split(" ")[0];
							var userName = "";

							if( askData.lists[i].phone !== null ) {
								userName = askData.lists[i].phone;
							}else if( askData.lists[i].mail !== null ) {
								userName = askData.lists[i].mail;
							}else {
								userName = "匿名";
							}

							temp += "<div class='consult-box'><div class='consult-ask'><p class='fl'><span class='user'>" + userName + "<i>提问</i></span></p>" + ((askData.lists[i].reply_count)==0 ? "<i class='ask-off'>未解答</i></div>" : "<i class='ask'>已解答</i></div>" )
							 	 + "<a data-url='/ask/" + askData.lists[i].id + ".html?site=2sc'><p class='text'>" + askData.lists[i].title + "</p></a>"
						    	 + "<p class='time'>" + questionTime + "</p>";
						    if( askData.lists[i].reply !== undefined ) {
						    	temp += "<div class='consult-inte'><div class='img'><img src='/static2015/dist/images/default.jpg' width='100%' ></div>"
						    	+ "<div class='txt'><p class='til-gray'></p><p class='main'>" + askData.lists[i].reply.content + "</p></div></div></div>";
						    }else {
						    	temp += "</div>";
						    }
						}
						base.utils.coverLayer.alphaEnd();
						$(".consult").append(temp);

						$("img.lazy").lazyload({
							effect: "fadeIn",
							threshold : 200,
							effectspeed :  200,
							event : "load"
						});
					}
				},
				error: function() {},
			})
			currentPage++;
		});

		$(".consult").on("click",".consult-box", function() {
			if( $(this).find("a").attr("data-url") ) {
				window.location.href = $(this).find("a").attr("data-url");
			}
		});

		$("img.lazy").lazyload({
			effect: "fadeIn",
			threshold : 200,
			effectspeed :  200
		})
	});
})