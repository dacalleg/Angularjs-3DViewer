"use strict";

angular.module('myApp')
	.service('SceneService', function(CameraService, $rootScope) {
		var scene,domElement,renderer;
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
	}
);