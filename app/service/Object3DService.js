"use strict";

angular.module('myApp')
	.service('Object3DService', function(SceneService) {
		var mesh,loader;
		
		var init = function()
		{
			loader = new THREE.JSONLoader();
		}
		this.loadGeometry = function(geometry)
		{
			if(mesh)
				SceneService.getScene().remove(mesh);
			mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial({color: 0x00ff00}));
			
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 0;
			
			SceneService.getScene().add( mesh );
			geometry.computeBoundingBox();
			geometry.computeBoundingSphere();
		}
		this.getMesh = function()
		{
			return mesh;
		}
		init();
	}
);