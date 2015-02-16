"use strict";

angular.module('myApp')
	.service('SceneObject3DService', function(SceneService, Object3DService, ConfigurationService, $rootScope) {
		var axes = null;
		var that = this;
		
		var buildAxses = function()
		{
			var _axes = new THREE.Object3D();
			var radius = Object3DService.getBoundingSphere().radius * 5;
			_axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( radius, 0, 0 ), 0xFF0000, false)); // +X
			_axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -radius, 0, 0 ), 0xFF0000, true) ); // -X
			_axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, radius, 0 ), 0x00FF00, false) ); // +Y
			_axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -radius, 0 ), 0x00FF00, true)  ); // -Y
			_axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, radius ), 0x0000FF, false) ); // +Z
			_axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -radius ), 0x0000FF, true)  ); // -Z
			return _axes;
		};
		var buildAxis = function( src, dst, colorHex, dashed ) 
		{
			var geom = new THREE.Geometry(),
			mat; 

			if(dashed) {
				mat = new THREE.LineDashedMaterial({ linewidth: 1, color: colorHex, dashSize: 0.5, gapSize: 0.5 });
			} else {
				mat = new THREE.LineBasicMaterial({ linewidth: 1, color: colorHex });
			}

			geom.vertices.push( src.clone() );
			geom.vertices.push( dst.clone() );
			geom.computeLineDistances();

			var _axes = new THREE.Line( geom, mat, THREE.LinePieces );
			return _axes;
		};
		this.showAxses = function(value)
		{
			value = typeof value !== 'undefined' ? value : true;
			if(axes)
			{
				SceneService.getScene().remove(axes);
				axes = null;
			}
			if(value)
			{
				axes = buildAxses();
				SceneService.getScene().add(axes);
			}
		};
		this.axsesVisible = function()
		{
			return axes !== 'undefined' && axes !== null;
		};
		
		$rootScope.$on('objectLoaded', function(event, data) 
		{ 
			if(that.axsesVisible())
			{
				SceneService.getScene().remove(axes);
				axes = buildAxses();
				SceneService.getScene().add(axes);
			}
		});
	}
);