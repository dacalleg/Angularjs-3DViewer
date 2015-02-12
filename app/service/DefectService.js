"use strict";

angular.module('myApp')
	.service('DefectService', function($rootScope,SceneService,Object3DService) {
		var defects,sphere;
		var init = function()
		{
			var defects = new Array();
		}
		$rootScope.$on('onMouseMoveRaycaster', function(event, data) 
		{
			/*var intersection = getFirstIntersection(data);
			if(intersection)
			{
				sphere.position.setX(intersection.point.x);
				sphere.position.setY(intersection.point.y);
				sphere.position.setZ(intersection.point.z);
			}*/
		});
		this.loadDefects = function()
		{
			/*var geometry = new THREE.SphereGeometry( 5, 32, 32 );
			var material = new THREE.MeshNormalMaterial( {shading: THREE.SmoothShading} );
			sphere = new THREE.Mesh( geometry, material );
			SceneService.getScene().add( sphere );*/
		}
		var getFirstIntersection = function(intersects)
		{
			for(var i=0;i<intersects.length;i++)
				if(intersects[i].object !== sphere)
					return intersects[i];
			return null;
		}
		init();
	}
);