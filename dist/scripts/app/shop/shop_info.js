define(function(require,exports,module){var $=require("zepto"),base=require("base"),wx=require("wechat");$(function(){var staticMap,point,coord_long=$(".shop-name").data("coord-long"),coord_lat=$(".shop-name").data("coord-lat"),marker=null,page_index=1,timer=null,carListDataCallback=function(a){var t="";"1"===a.code&&a.lists.length>0&&(t=fillCarListData(a.lists,""),$(".car-list-box ul").append(t),Math.ceil(a.totalNumber/a.perPage)===page_index&&$("#view_more").remove(),$("img.lazy").lazyload({effect:"fadeIn",threshold:200,effectspeed:200,event:"load"}),base.utils.coverLayer.alphaEnd())},carListDataErrorProcess=function(){},fillCarListData=function(a,t){for(var i=a,e=t,n=0;n<i.length;n++){var s="<div class='txt-server'><p>",r=$.inArray(i[n].sprq.split("-")[0],["1970","2900"])>=0?"未上牌":i[n].sprq.split("-")[0]+"年";if(40===i[n].source_id)e+="<li class='haoche'><i class='icon-hc'></i><div class='img'><img data-url='"+i[n].m_url+"' class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='"+base.utils.photoSmallToMedium(i[n].picture)+"' data-id="+i[n].carid+" width='100%' /></div><div class='txt'><p class='til'>"+i[n].title_l+"</p><div class='txt-price'><span class='fl'>￥"+i[n].price+"万</span><span class='fr'>"+r+"<i>|</i>"+i[n].bxlc+"万公里</span></div><div class='txt-server'><p><span class='white'>99好车</span><span>诚信车源</span><span>全方位保障</span></p></div></div></li>";else if(e+="<li><div class='img'><img data-url='"+i[n].m_url+"' class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='"+base.utils.photoSmallToMedium(i[n].picture)+"' data-id="+i[n].carid+" width='100%' /></div><div class='txt'><p class='til'>"+i[n].title_l+"</p><div class='txt-price'><span class='fl'>￥"+i[n].price+"万</span><span class='fr'>"+r+"<i>|</i>"+i[n].bxlc+"万公里</span></div>",1===i[n].rzc&&(s+="<span>认证</span>"),""!==i[n].brokenpart){var o=i[n].brokenpart.split(",");($.inArray("1",o)>=0||$.inArray("2",o)>=0)&&(s+="<span>代办</span>"),($.inArray("3",o)>=0||$.inArray("4",o)>=0)&&(s+="<span>质保</span>"),$.inArray("6",o)>=0&&(s+="<span>退换</span>"),$.inArray("8",o)>=0&&(s+="<span>贷款</span>"),e+=s+"</p></div></div></li>"}else e+=1!==i[n].rzc?"</div></li>":s+"</p></div></div></li>"}return e};(coord_long||coord_lat)&&coord_long>100&&(staticMap=new BMap.Map("static_map"),point=new BMap.Point(coord_long,coord_lat),marker=new BMap.Marker(point),staticMap.centerAndZoom(point,16),staticMap.addEventListener("tilesloaded",function(){staticMap.panTo(point),staticMap.addOverlay(marker),marker.setAnimation(BMAP_ANIMATION_BOUNCE),$("#static_map, #map_cover").show()})),$("#view_more").on("click",function(){page_index++,base.utils.coverLayer.alphaStart(),""==location.search?base.common.getData(location.pathname,"?pageIndex="+page_index+"&is_ajax=1",!1,carListDataCallback,carListDataErrorProcess):base.common.getData(location.pathname,location.search+"&pageIndex="+page_index+"&is_ajax=1",!1,carListDataCallback,carListDataErrorProcess)}),$(".car-list-box").on("click","li",function(){if(""!=$(this).find("img").attr("data-url")){var a=$(this).find("img").attr("data-url");window.location.href=a}}),$(".wrap").on("click",".return",function(){window.history.length<3?window.location.href="/":window.history.go(-1)}),$(document).scroll(function(){$(window).scrollTop()>600?"none"===$(".return-top").css("display")&&$(".return-top").show():$(".return-top").hide()}),$(".sub-visit").on("click",function(){$(".share-top").toggle()}),$(".return-top").on("click",function(){$(window).scrollTop(0)}),$("img.lazy").lazyload({effect:"fadeIn",threshold:200,effectspeed:200});var share_title=$(".shop-main .title").html()+"，精品车源最新上架，点击查看："+window.location.href;with(window._bd_share_config={common:{bdText:share_title,bdDesc:share_title,bdUrl:window.location.href,bdPic:$(".car-list-box img").eq(0).attr("data-original")||""},share:[{bdSize:16}]},document)0[(getElementsByTagName("head")[0]||body).appendChild(createElement("script")).src="http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion="+~(-new Date/36e5)];var url=window.location.href,share_wx=function(a){var t=a.data||{};wx.config(t),wx.ready(function(){var a={src:$("#logo").val(),link:url,title:$($(".title")[1]).text(),desc:$(".shop-text").text()};wx.onMenuShareAppMessage({title:a.title,desc:a.desc,link:a.link,imgUrl:a.src,trigger:function(a){},success:function(a){},cancel:function(a){},fail:function(a){}}),wx.onMenuShareTimeline({title:a.title,link:a.link,imgUrl:a.src,trigger:function(a){},success:function(a){},cancel:function(a){},fail:function(a){}}),wx.onMenuShareQQ({title:a.title,desc:a.desc,link:a.link,imgUrl:a.src,trigger:function(a){},complete:function(a){},success:function(a){},cancel:function(a){},fail:function(a){}})})};base.common.getpData(base.address.wechat,"/?url="+url+"&callback=?",!1,"jsonp",share_wx,function(){}),"2sc"===base.utils.queryUrlData("site")&&(timer=setTimeout(function(){base.utils.coverLayer.alphaStart(!1),base.utils.fade($(".seo-popup"),"in",100),clearTimeout(timer)},6e3),$(".seo-del").on("click",function(){$(".seo-popup").hide(),base.utils.coverLayer.alphaEnd(),timer=setTimeout(function(){base.utils.coverLayer.alphaStart(!1),base.utils.fade($(".seo-popup"),"in",100),clearTimeout(timer)},3e4)}),$(".seo-ico2, .landkarte").on("click",function(){$(window).scrollTop($(".detail-main").offset().top)}))})});