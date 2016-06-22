define(function(require, exports, module) {
	var $ = require("zepto");

	$(document).ready(function() {
		var coord_long = $("#cdShopCoordLong").val();
		var coord_lat = $("#cdShopCoordLat").val();
		var content = $("#cdShopAddress").val();
		var fullMap, fullPoint, fullMarker = null;
		
		$('#fullShopMap').height( $(window).height() );
		
		fullMap = new BMap.Map("fullShopMap");
		fullPoint = new BMap.Point(coord_long, coord_lat);
		fullMarker = new BMap.Marker(fullPoint);
		fullMarker.enableDragging();
		fullMap.centerAndZoom(fullPoint, 15);
		fullMap.addControl(new BMap.NavigationControl());
		fullMap.addControl(new BMap.ScaleControl());
		fullMap.addControl(new BMap.OverviewMapControl());
		fullMap.addControl(new BMap.MapTypeControl());

		var searchInfoWindow = null;
		searchInfoWindow = new BMapLib.SearchInfoWindow(fullMap, content, {
			onSearchComplete: function(result) {
		        if (transit.getStatus() == BMAP_STATUS_SUCCESS) {
		            var start = result.getStart();
		            var end = result.getEnd();

		            addStart(start.point, start.title);
		            addEnd(end.point, end.title);

		            var plan = result.getPlan(0);
		            for (var i = 0; i < plan.getNumRoutes(); i++) {
		                if (plan.getRoute(i).getDistance(false) > 0) {
		                    addWalkRoute(plan.getRoute(i).getPath());
		                }
		            }
		            var allLinePath = [];
		            for (i = 0; i < plan.getNumLines(); i++) {
		                allLinePath = allLinePath.concat(plan.getLine(i).getPath());
		                addLine(plan.getLine(i).getPath());
		            }
		            fullMap.setViewport(allLinePath);
		        }
		    },
			width: 240,
			height: 60,
			panel: "panel",
			enableAutoPan: false,
			searchTypes:[
				BMAPLIB_TAB_TO_HERE
			]
		});

		searchInfoWindow.open(fullMarker);

		var geolocationControl = new BMap.GeolocationControl();
		fullMap.addControl(geolocationControl);

		fullMap.addEventListener("tilesloaded", function() {
			fullMap.addOverlay(fullMarker);
			fullMarker.setAnimation(BMAP_ANIMATION_BOUNCE);
		});

		fullMarker.addEventListener("click", function(){
			searchInfoWindow.open(fullMarker);
		});

		$('#r-result').on('click', '.tranroute-plan-list', function() {
			$('#r-result').empty();
		});
	});
})