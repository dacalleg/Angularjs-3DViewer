"use strict";

angular.module('myApp')
	.service('SceneService', function(CameraService, $rootScope) {
		var scene,domElement,renderer,axes = null;
		var lights = new Array();
		this.setScene = function(_scene) { scene = _scene; }
		this.getScene = function() { return scene; }
		this.setDomElement = function(_domElement) { domElement = _domElement; }
		this.getDomElement = function() { return domElement; }
		this.setRenderer = function(_renderer) { renderer = _renderer; }
		this.getRenderer = function() { return renderer; }
		this.getLights = function() { return lights; }
		this.render = function()
		{
			requestAnimationFrame(this.render.bind(this));
			renderer.render(scene, CameraService.getCamera());
			TWEEN.update();
		}
		this.onResize = function(width,height)
		{
			renderer.setSize( width, height );
		}
		var buildAxses = function()
		{
			var axes = new THREE.Object3D();
			axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 3000, 0, 0 ), 0xFF0000, false)); // +X
			axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -3000, 0, 0 ), 0xFF0000, true) ); // -X
			axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 3000, 0 ), 0x00FF00, false) ); // +Y
			axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -3000, 0 ), 0x00FF00, true)  ); // -Y
			axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 3000 ), 0x0000FF, false) ); // +Z
			axes.add( buildAxis(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -3000 ), 0x0000FF, true)  ); // -Z
			return axes;
		}
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

			var axis = new THREE.Line( geom, mat, THREE.LinePieces );
			return axis;
		}
		this.showAxses = function(value)
		{
			value = typeof value !== 'undefined' ? value : true;
			if(this.axes)
			{
				scene.remove(this.axes)
				this.axes = null;
			}
			if(value)
			{
				this.axes = buildAxses();
				scene.add(this.axes);
			}
		}
		this.axsesVisible = function()
		{
			return this.axes !== 'undefined' && this.axes !== null;
		}
	}
);