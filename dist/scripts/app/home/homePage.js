define(function(t,a,e){var s=t("zepto"),n=(t("render"),t("base")),i=null;t("swipe"),s(document).ready(function(){var t=(navigator.userAgent.toLowerCase(),s(".hp-form").offset().top),a=new Swiper(".swiper-container",{loop:!0,autoHeight:!0,calculateHeight:!0,autoplay:2e3,paginationClickable:!0,onInit:function(t){0!==t.imagesLoaded&&s(".swiper-slide img").show()}});s(window).resize(function(){a.reInit()}),s("img.lazy").lazyload({effect:"fadeIn",threshold:200,effectspeed:200}),s("#hpSearchInput").on("input",function(t){clearTimeout(i),i=setTimeout(function(){s("#hpSearchInput").val()?(n.common.getData(n.address.site_autocomplete,"?q="+s("#hpSearchInput").val(),!1,o,function(){}),s("#hpSearchLists ul").html()?n.utils.fade(s("#hpSearchLists"),"in",300):n.utils.fade(s("#hpSearchLists"),"out",300)):(n.common.getData(n.address.site_autonullcomplete,"?q="+s("#hpSearchInput").val(),!1,l,function(){}),s("#hpSearchLists ul").html()?n.utils.fade(s("#hpSearchLists"),"in",300):n.utils.fade(s("#hpSearchLists"),"out",300))},200)}),s("#hpSearchInput").on("focus",function(){s(window).scrollTop(t),n.common.getData(n.address.site_autonullcomplete,"?q="+s("#hpSearchInput").val(),!1,l,function(){}),s("#hpSearchLists ul").html()?n.utils.fade(s("#hpSearchLists"),"in",300):n.utils.fade(s("#hpSearchLists"),"out",300)}),s("#hpSearchLists .close").on("click",function(){s(window).scrollTop(0),n.utils.fade(s("#hpSearchLists"),"out",300)}),s("#hpSearchInput").on("blur",function(){setTimeout(function(){s(window).scrollTop(0),n.utils.fade(s("#hpSearchLists"),"out",300)},200)})});var o=function(t){var a="",e=s("#hpSearchLists ul").attr("data-url"),n=t.length;n>6&&(n=6);for(var i=0;n>i;i++){if(e.indexOf("?")>-1)var o=e+"&kw="+t[i].name;else var o=e+"?kw="+t[i].name;a+="<li data-url='"+o+"' class='clean'><span class='series'>"+t[i].name+"</span><span class='counts'>约<i>"+t[i].count+"</i>个结果</span></li>"}s("#hpSearchLists ul").html(a),s("#hpSearchLists li").on("click",function(){window.location.href=s(this).attr("data-url")})},l=function(t){var a="",e=s("#hpSearchLists ul").attr("data-url"),n=t.length;n>6&&(n=6);for(var i=0;n>i;i++){if(e.indexOf("?")>-1)var o=e+"&kw="+t[i].name_show;else var o=e+"?kw="+t[i].name_show;a+="<li data-url='"+o+"' class='clean'><span class='series'>"+t[i].name_show+"</span><span class='counts'>约<i>"+t[i].num+"</i>个结果</span></li>"}s("#hpSearchLists ul").html(a),s("#hpSearchLists li").on("click",function(){window.location.href=s(this).attr("data-url")})}});