"use strict";

angular.module('myApp')
	.service('SceneService', function(CameraService, $rootScope) {
		var scene,renderer,raycaster,mouse;
		var lights = [];
		var intestects;
		var controls;

		this.setScene = function(_scene) { scene = _scene; };
		this.getScene = function() { return scene; };
		this.getDomElement = function() { return renderer.domElement; };
		this.setRenderer = function(_renderer) { renderer = _renderer; };
		this.getRenderer = function() { return renderer; };
		this.getLights = function() { return lights; };
		this.render = function()
		{
			requestAnimationFrame(this.render.bind(this));
			renderer.render(scene, CameraService.getCamera());
			if(controls)
				controls.update();
			TWEEN.update();
		};
		this.onResize = function(width,height)
		{
			renderer.setSize( width, height );
		};
		var init = function()
		{
			raycaster = new THREE.Raycaster();
			mouse = new THREE.Vector2();

		};
		this.onMouseMove = function( event ) {
			mouse.x = ( (event.clientX ) / renderer.domElement.width ) * 2 - 1;
			mouse.y = - ( (event.clientY - 42 ) / renderer.domElement.height) * 2 + 1;

			$rootScope.$emit('onMouseMove', {mouse: { x : mouse.x, y : mouse.y }});

			calculateIntersects();

			var ret = { mouse: { x : mouse.x, y : mouse.y }, intersects : intestects };
			$rootScope.$emit('onMouseMoveRaycaster', ret);
		};
		this.onMouseDown = function(event)
		{
			var ret = { mouse: { x : mouse.x, y : mouse.y }, intersects : intestects, button : event.button };
			$rootScope.$emit('onMouseDown', ret);
		};

		$rootScope.$on("onAddToScene",function(event,data)
		{
			scene.add(data);
		});
		$rootScope.$on("onRemoveFromScene",function(event,data)
		{
			scene.remove(data);
		});
		$rootScope.$on("onCameraLoaded", function()
		{
		});

		var calculateIntersects = function()
		{
			raycaster.setFromCamera( mouse, CameraService.getCamera());
			intestects = raycaster.intersectObjects( scene.children );
			return intestects;
		};
		this.getRayCaster = function()
		{
			return raycaster;
		};
		init();
	}
);