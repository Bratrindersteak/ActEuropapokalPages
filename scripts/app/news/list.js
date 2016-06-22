define(function(require, exports, module) {
	var $ = require("zepto");
	var base = require("base");
	require("underscore");
	require.async("backbone", function() {
		$(function() {
			var baseConf = {
				url: "http://" + window.location.host + base.address.news_list + "/" + /\d+/g.exec(window.location.pathname.split(".html")[0]),
				pageno: 1,
				args: "?page="
			};
			var List = Backbone.Model.extend({});

			var Lists = Backbone.Collection.extend({
				model: List
			});

			var lists = new Lists();

			var View = Backbone.View.extend({
				el: $("#content_part"),
				template: _.template($("#item-template").html()),
				events: {
					"click #view_more": "fetchList",
					"click #news_list li": "viewItem"
				},
				fetchList: function() {
					var self = this;
					baseConf.pageno += 1;
					lists.url = baseConf.url + baseConf.args + baseConf.pageno;
					lists.fetch({
						success: function(model, response, options) {
							var data = model.models;
							var tempList = "";

							self.$el.find("#news_list").append(self.template({message: data}));
							this.$("img.lazy").lazyload({
								effect: "fadeIn",
								threshold : 200,
								effectspeed :  200,
								event : "load"
							});
						},
						error: function(model, response, options) {
						}
					});
				},
				viewItem: function(e) {
					window.location.href = $(e.currentTarget).find(".text a").data("url");
				}
			});

			var v = new View();

			$("img.lazy").lazyload({
				effect: "fadeIn",
				threshold : 200,
				effectspeed :  200
			})
		});
	});
});