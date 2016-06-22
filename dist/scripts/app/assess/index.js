define(function(e,t,a){var i=e("zepto"),s=e("base"),n=e("render");i(function(){var t,a,p="",u=n.events.header,h=e("{tpl_path}/static2015/template/area.tpl"),f={area:h};n.tpl("area_tpl",f),u.prototype=new n.events.common,u.prototype.constructor=u;var _=new u;_.tapProvince(),i(".wrap").on("click",".return",function(e){var t=i(this).attr("data-parentid"),a=i(this).attr("data-recoverid")||["content_part","footer"];if("sub_page"===t){var n=i("#content_part");if("none"!==n.css("display")){var r=s.utils.queryUrlExtraData();""==r?window.location.href="/":window.location.href="/?"+r}else i("#assess_result").hide(),i("#content_part").show()}else"string"==typeof a&&(a=Array.call(this,a)),s.utils.webkitTransform(t,a,function(){i("#"+t).hide()}),e.stopPropagation()}),i(".speed li").on("click",function(e){0===i(this).index()?(i(".sub-visit").remove(),s.utils.webkitTransform("area_popup",[],function(){i("#content_part").hide(),i("#footer").hide()}),ga("send","event","pinggu","click","车辆所在地")):1===i(this).index()&&(s.utils.webkitTransform("brand_popup",[],function(){i("#content_part").hide(),i("#footer").hide()}),ga("send","event","pinggu","click","车型选择"))}),i(".brand-title li").on("click",function(){var e=i(this).html(),t=i(this).attr("data-quick").split(",");if(i(".brand-title li").removeClass("active"),i(this).addClass("active"),t.join("")===e){i(".brand-box").hide();for(var a=0;a<t.length;a++)i(".brand-box-"+t[a]).show()}}),i(".brand-box").on("click","li",function(){r(null,s.address.assess.series,"/?brand_id="+i(this).attr("data-id"),o)}),i(".series-box").on("click","li",function(){t=i(this).find("a").attr("data-id"),r(this,s.address.assess.year,"/?series_id="+t,l)}),i(".select-year").on("click","li",function(){a=i(this).attr("data-year"),r(this,s.address.assess.model,"/?series_id="+t+"&purchase_year="+a,c)}),i(".assess-main").on("click",".list-car li",function(){p=i(this).find("span").eq(0).attr("data-id"),model_sub_title=i(this).find("span").eq(0).attr("data-sub-title"),i(this).addClass("active"),i(".table-cell").removeClass("table-null"),i(".table-cell").html(model_sub_title),i(".table-cell").attr("data-id",p),s.utils.webkitTransform("model_popup",["content_part","footer"],function(){i("#model_popup").hide()})}),i("#quickAssessBtn").on("click",function(){var e=i("#assess_area").attr("data-pinyin")||"",t=i("#assess_km").val()||0;if(e&&p){var n=s.utils.queryUrlExtraData();""!=n&&(n="&"+n),s.common.getData(s.address.assess.check,"/?model_simple_id="+p+"&province_py="+e+"&km="+t+"&purchase_year="+a+n,!1,d,function(){}),ga("send","event","pinggu","click","快速评估")}else i(".question-center").find("i").html("请填写评估信息"),s.utils.coverLayer.tipsCover(i(".question-center"),"hint-not")}),i("#reassessBtn").on("click",function(){i("#assess_result").hide(),i("#content_part").show()}),i(".see-car").on("click",function(){var e=i(this).data("url");e&&(window.location.href=e)})});var r=function(e,t,a,n){var r=null;e&&(i(e).addClass("selected"),r=setTimeout(function(){i(e).removeClass("selected"),clearTimeout(r)},200)),s.utils.coverLayer.alphaStart(),s.common.getData(t,a,!1,n,function(){})},o=function(e){var t="";for(var a in e.series){var n=e.series[a];t+="<div class='line-box'><h2 class='glb-title'><span>"+a+"</span></h2><ul>";for(var r=0;r<n.length;r++)t+="<li><a data-id='"+n[r].id+"'>"+n[r].name+"</a></li>";t+="</ul></div>"}i("#series_popup header .sub-visit").prop("href",e.url),i(".series-box").html("").append(t),s.utils.webkitTransform("series_popup",[],function(){i("#brand_popup").hide(),i("#content_part").hide(),i("#footer").hide(),s.utils.coverLayer.alphaEnd()})},l=function(e){for(var t="",a=0;a<e.length;a++)t+="<li data-year='"+e[a]+"'>"+e[a]+"年</li>";i(".select-year").html("").append(t),s.utils.webkitTransform("year_popup",[],function(){i("#series_popup").hide(),i("#content_part").hide(),i("#footer").hide(),s.utils.coverLayer.alphaEnd()})},c=function(e){var t="";for(var a in e){var n=e[a];t+="<h2 class='glb-title'><span>"+a+"</span></h2><ul class='list-car'>";for(var r in n)t+="<li><span class='name' data-id='"+n[r].id+"'  data-sub-title='"+n[r].sub_title+"'>"+n[r].title+"</span><span class='price'>"+n[r].new_price+"万</span></li>";t+="</ul>"}i(".list-title").siblings().remove(),i(".list-title").after(t),s.utils.webkitTransform("model_popup",[],function(){i("#year_popup").hide(),i("#content_part").hide(),i("#footer").hide(),s.utils.coverLayer.alphaEnd()})},d=function(e){var t=e.price_used||"",a=e.price_new||"",s=e.url||"",n=(e.param,e.area),r=e.model;1===e.code&&(i("#assess_content").find("h2").html("["+n.area_name+"] "+e.model.title),""!==a&0!==a.length?(i(".new-car .m").html(a.price+"+"+a.tax+"(购置税)=<i>"+a.total+"万元</i>"),i(".new-car").show()):i(".new-car").hide(),""!==t&&0!==t.length?i("#assess_price .price").html(t.buying_price+"万元~"+t.selling_price+"万元"):(i("#assess_price").hide(),i("#assess_noprice").show()),s?(i(".see-car").html("查看“"+r.brand_name+" "+r.series_name+"”在售车源"),i(".see-car").data("url",s)):i(".see-car").hide(),i("#content_part").hide(),i("#assess_result").show())}});