"use strict";

angular.module('myApp')
	.service('Object3DService', function($rootScope,SceneService) {
		var mesh,loader,material,originalobject,mesh_bsp;
		
		var init = function()
		{
			loader = new THREE.JSONLoader();
			material = new THREE.MeshPhongMaterial( { ambient: 0xff5533, color: 0xff5533, specular: 0x111111, shininess: 200 } );
		}
		this.loadGeometry = function(geometry)
		{
			if(mesh)
				SceneService.getScene().remove(mesh);
			mesh = new THREE.Mesh(geometry, material);
			originalobject = new THREE.Mesh(geometry, material);

			mesh.position.x = 0;
			mesh.position.y = 0;
			mesh.position.z = 0;
			
			SceneService.getScene().add( mesh );
			geometry.computeBoundingBox();
			geometry.computeBoundingSphere();
			mesh_bsp = new ThreeBSP(mesh);

			$rootScope.$emit('objectLoaded');
		}
		this.loadFromModel = function(model)
		{
			var ext = model.split('.').pop();
			var loader = null;
			switch (ext)
			{
				case "stl":
					loader = new THREE.STLLoader();
					break;
				case "json":
				case "js":
					loader = new THREE.JSONLoader();
					break;
			}
			if(loader)
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
		this.getBoundingBox = function()
		{
			return mesh.geometry.boundingBox;
		}
		this.getBsp = function()
		{
			return mesh_bsp;
		}
		$rootScope.$on('objectClipped',function(event,data)
		{
			SceneService.getScene().add( data.mesh );
			SceneService.getScene().remove( mesh );
			mesh = data.mesh;
		});
		init();
	}
);