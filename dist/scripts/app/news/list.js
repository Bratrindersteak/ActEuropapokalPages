define(function(e,t,n){var a=e("zepto"),o=e("base");e("underscore"),e.async("backbone",function(){a(function(){var e={url:"http://"+window.location.host+o.address.news_list+"/"+/\d+/g.exec(window.location.pathname.split(".html")[0]),pageno:1,args:"?page="},t=Backbone.Model.extend({}),n=Backbone.Collection.extend({model:t}),l=new n,i=Backbone.View.extend({el:a("#content_part"),template:_.template(a("#item-template").html()),events:{"click #view_more":"fetchList","click #news_list li":"viewItem"},fetchList:function(){var t=this;e.pageno+=1,l.url=e.url+e.args+e.pageno,l.fetch({success:function(e,n,a){var o=e.models;t.$el.find("#news_list").append(t.template({message:o})),this.$("img.lazy").lazyload({effect:"fadeIn",threshold:200,effectspeed:200,event:"load"})},error:function(e,t,n){}})},viewItem:function(e){window.location.href=a(e.currentTarget).find(".text a").data("url")}});new i;a("img.lazy").lazyload({effect:"fadeIn",threshold:200,effectspeed:200})})})});