define(function(t,n,e){var c=t("zepto");c(function(){var t="";t=null!==c(".content").html().match(/^\s+/)?"<p>"+c(".content").html().replace(c(".content").html().match(/^\s+/).toString(),""):"<p>"+c(".content").html(),c(".content").html(t.replace(/\n/g,"<br/>")),c(".content span").attr("style",""),c(".content img").attr("onclick",""),c(".content img").attr("width","100%"),c(".content img").attr("height",null)})});