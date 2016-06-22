define(function(a,t,i){var s=a("zepto"),r=a("base");s(function(){var a=(s(".wrap").width(),function(a){var t="";if(1===parseInt(a.param.is_around)){var i="";a.lists&&a.lists.length>0&&(t=l(a.lists,""),s(".car-list-box ul").append(t)),a.around_cars.lists.length>0&&(1===a.around_cars.pageIndex&&0===a.page.is_last?(i="<h4 class='reco-title rim-car'><i></i><span>在您周边，还有<em>"+a.around_cars.totalNumber+"</em>辆</span></h4><ul>",s("#view_around").show(),t=l(a.around_cars.lists,i),s(".car-list-box ul").after(t+"</ul>")):1===a.page.is_last?(t=l(a.around_cars.lists,i),s(".car-list-box ul").eq(1).append(t),s("#view_around").remove()):(t=l(a.around_cars.lists,i),s(".car-list-box ul").eq(1).append(t))),s("#view_more").remove(),s("#view_around p").attr("data-url",a.url),s("#view_around p").attr("data-around",parseInt(a.param.is_around))}else t=l(a.lists,""),s(".car-list-box ul").append(t),s("#view_more p").attr("data-url",a.url);s("img.lazy").lazyload({effect:"fadeIn",threshold:200,effectspeed:200,event:"load"}),r.utils.coverLayer.alphaEnd()}),t=function(a){var t="";for(var i in a.all_series){var e=a.all_series[i],l=a.exist_series;t+="<div class='line-box'><h2 class='glb-title'><span>"+i+"</span></h2><ul>";for(var n=0;n<e.length;n++){for(var c=!1,o=0;o<l.length;o++)if(e[n].pinyin===l[o]){c=!0,t+="<li><a data-url='"+e[n].url+"'>"+e[n].name+"</a></li>";break}c||(t+="<li class='empty'><a data-url='"+e[n].url+"'>"+e[n].name+"</a></li>")}t+="</ul></div>"}s("#series_popup header .sub-visit").prop("href",a.url),s(".series-box").html("").append(t),r.utils.webkitTransform("series_popup",[],function(){s("#brand_popup").hide(),s("#content_part").hide(),s("#footer").hide(),r.utils.coverLayer.alphaEnd()})},i=function(){},e=function(){},l=function(a,t){for(var i=a,e=t,l="",n=0;n<i.length;n++){var c="<div class='txt-server'><p>",o=s.inArray(i[n].sprq.split("-")[0],["1970","2900"])>=0?"未上牌":i[n].sprq.split("-")[0]+"年";if(l=i[n].m_url,40===i[n].source_id)e+="<li class='haoche'><i class='icon-hc'></i><div class='img'><img class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='"+r.utils.photoSmallToMedium(i[n].picture)+"' data-url="+l+" width='100%' /></div><div class='txt'><p class='til'>"+i[n].title_l+"</p><div class='txt-price'><span class='fl'>￥"+i[n].price+"万</span><span class='fr'>"+o+"<i>|</i>"+i[n].bxlc+"万公里</span></div><div class='txt-server'><p><span class='white'>99好车</span><span>诚信车源</span><span>全方位保障</span></p></div></div></li>";else if(e+="<li><div class='img'><img class='lazy' src='/static2015/dist/images/car_default.jpg' data-original='"+r.utils.photoSmallToMedium(i[n].picture)+"' data-url="+l+" width='100%' /></div><div class='txt'><p class='til'>"+i[n].title_l+"</p><div class='txt-price'><span class='fl'>￥"+i[n].price+"万</span><span class='fr'>"+o+"<i>|</i>"+i[n].bxlc+"万公里</span></div>",1===i[n].rzc&&(c+="<span>认证</span>"),""!==i[n].brokenpart){var d=i[n].brokenpart.split(",");(s.inArray("1",d)>=0||s.inArray("2",d)>=0)&&(c+="<span>代办</span>"),(s.inArray("3",d)>=0||s.inArray("4",d)>=0)&&(c+="<span>质保</span>"),s.inArray("6",d)>=0&&(c+="<span>退换</span>"),s.inArray("8",d)>=0&&(c+="<span>贷款</span>"),e+=c+"</p></div></div></li>"}else e+=1!==i[n].rzc?"</div></li>":c+"</p></div></div></li>"}return e};s(".tabs-title li").on("click",function(){"tabs_brand"===s(this).attr("data-item")?r.utils.webkitTransform("brand_popup",[],function(){s("#content_part").hide(),s("#footer").hide()}):"tabs_empty"!==s(this).attr("data-item")||""===s(this).attr("data-url")||s(this).hasClass("empty")?"none"!==s("#"+s(this).attr("data-item").split("_")[1]+"_view").css("display")?(s("#"+s(this).attr("data-item").split("_")[1]+"_view").hide(),s(this).removeClass("active")):(s(".tabs-box").hide(),s(this).siblings().removeClass("active"),s(this).addClass("active"),s("#"+s(this).attr("data-item").split("_")[1]+"_view").show()):window.location.href=s(this).attr("data-url")}),s(".brand-title li").on("click",function(){var a=s(this).html(),t=s(this).attr("data-quick").split(",");if(s(".brand-title li").removeClass("active"),s(this).addClass("active"),t.join("")===a){s(".brand-box").hide();for(var i=0;i<t.length;i++)s(".brand-box-"+t[i]).show()}}),s(".brand-box").on("click","li",function(){var a=s(this).find("em").attr("data-url");s(this).hasClass("empty")||""==a||(r.utils.coverLayer.alphaStart(),r.common.getData(r.address.series,a,!1,t,i))}),s(".series-box").on("click","li",function(){var a=s(this).find("a").attr("data-url");s(this).hasClass("empty")||""==a||(s(this).addClass("selected"),window.location.href=a)}),s("#service_view li").on("click",function(){var a="",t="";if(s(this).hasClass("confirm-btn"))if(s("#service_view .confirm-btn").siblings(".active").length>0){var i="",r="",e=null;s("#service_view .confirm-btn").prev().hasClass("active")?(e=s("#service_view li[data-type='rzc']").siblings(".active").children("a"),a=s("#service_view .confirm-btn").prev().children("a").attr("data-url")):(e=s(this).siblings(".active").children("a"),a=s(e[0]).attr("data-url").replace("ca1t","cat"));for(var l=0;l<e.length;l++){var n=s(e[l]).attr("data-url"),c="";n.indexOf("scac")>-1?c=n.match(/scac(\d*)/)[1].toString():null!==n.match(/(c)\d/g)&&(c=n.match(/(c)\d/g).toString().split("c")[1],t=a.match(/sca(\d\_\d*)/)[1].toString()),i+=c+"_"}r=a.split("sca")[0]+"sca"+t+"cp"+a.split("sca")[1].toString().split("p")[1],window.location.href=r.replace("sca"+t+"c","sca"+t+"c"+i.substring(0,i.length-1)).toString()}else{a=s("#service_view .confirm-btn").prev().children("a").attr("data-url").replace("ca1t","cat");var o=a.split("sca")[0]+"sca"+t+"cp"+a.split("sca")[1].toString().split("p")[1];null!==a.match(/sca(\d\_\d*)/)&&(t=a.match(/sca(\d\_\d*)/)[1].toString()),"pasdsvepcatcpbnscacp"===o.split("param=")[1]?window.location.href=window.location.href.split("?param")[0]:window.location.href=o}else s(this).toggleClass("active")}),s("#view_more p, #view_around p").on("click",function(){var t=parseInt(s(this).attr("data-around")),i=s(this).attr("data-url");r.utils.coverLayer.alphaStart(),r.common.getData("",(/param/.test(i)===!0?i+"&":i+"?")+"is_around="+t+"&ajax_commit=1",!1,a,e)}),s(".car-list-box").on("click","li",function(){""!==s(this).find("img").attr("data-url")&&(window.location.href=s(this).find("img").attr("data-url"))}),s("img.lazy").lazyload({effect:"fadeIn",threshold:200,effectspeed:200})})});