define(function(t,a,e){var l=t("zepto"),s=t("base");l(function(){var t=l("#view_more p"),a=2;t.on("click",function(){var t=window.location.pathname.match(/\d+[.html]+$/),e=t.toString().split(".html")[0];s.utils.coverLayer.alphaStart(),l.ajax({type:"GET",dataType:"json",url:"http://"+window.location.host+s.address.news_list+"/"+e+"?page="+a,async:!1,success:function(t){if(t){var a="";for(i=0;i<t.length;i++)a+="<li><div class='img'><img class='lazy' src='http://3g.tiautos.cn/static2015/dist/images/car_default.jpg' data-original='"+t[i].fld_PicInfo+"' width='100%' alt='"+t[i].fld_NewsIndexTitle+"' style='display: block; opacity: 1;' ></div><div class='text'><a data-url='/news/"+t[i].Fld_newsid+".html'><p class='title'>"+t[i].Fld_newstitle+"</p></a><p class='time'>"+t[i].fld_CreateDateTime+"</p></div></li>";s.utils.coverLayer.alphaEnd(),l("#news_list").append(a),l("img.lazy").lazyload({effect:"fadeIn",threshold:200,effectspeed:200,event:"load"})}},error:function(){}}),a++}),l("#news_list").on("click","li",function(){l(this).find("a").attr("data-url")&&(window.location.href=l(this).find("a").attr("data-url"))}),l("img.lazy").lazyload({effect:"fadeIn",threshold:200,effectspeed:200})})});