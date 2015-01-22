"use strict";

angular.module('myApp')
	.service('Object3DService', function($rootScope,SceneService) {
		var mesh,loader,material;
		
		var init = function()
		{
			loader = new THREE.JSONLoader();
			material = new THREE.MeshNormalMaterial({color: 0x00ff00});
		}
		this.loadGeometry = function(geometry)
		{
			if(mesh)
				SceneService.getScene().remove(mesh);
			mesh = new THREE.Mesh(geometry, material);
			
			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 0;
			
			SceneService.getScene().add( mesh );
			geometry.computeBoundingBox();
			geometry.computeBoundingSphere();

			$rootScope.$emit('objectLoaded');
		}
		this.loadFromModel = function(model)
		{
			loader.load(model,this.loadGeometry)
		}
		this.getMesh = function()
		{
			return mesh;
		}
		this.setWireframe = function(value)
		{
			material.wireframe = value;
		}
		this.wireframeVisible = function()
		{
			return material.wireframe;
		}
		this.getBoundingSphere = function()
		{
			return mesh.geometry.boundingSphere;
		}
		init();
	}
);