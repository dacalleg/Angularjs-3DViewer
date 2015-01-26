"use strict";

angular.module('myApp')
	.service('DefectService', function($rootScope,SceneService) {
		var defects,sphere;
		var init = function()
		{
			var defects = new Array();
		}
		$rootScope.$on('onMouseMoveRaycaster', function(event, data) 
		{
			sphere.position.setX(data[0].point.x);
			sphere.position.setY(data[0].point.y);
			sphere.position.setZ(data[0].point.z);
		});
		this.loadDefects = function()
		{
			var geometry = new THREE.SphereGeometry( 1, 32, 32 );
			var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
			sphere = new THREE.Mesh( geometry, material );
			SceneService.getScene().add( sphere );
		}
		init();
	}
);