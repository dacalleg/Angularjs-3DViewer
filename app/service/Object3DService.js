"use strict";

angular.module('myApp')
	.service('Object3DService', function(SceneService) {
		var mesh,geometry,loader;
		
		var init = function()
		{
			loader = new THREE.JSONLoader();
		}
		this.loadGeometry = function(_geometry)
		{
			geometry = _geometry;
			if(mesh)
				SceneService.getScene().remove(mesh);
			mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial({color: 0x00ff00}));
			
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 0;
			
			SceneService.getScene().add( mesh );
		}
		init();
	}
);