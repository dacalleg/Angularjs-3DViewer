"use strict";

angular.module('myApp')
	.directive('ngWebgl', function(SceneService, CameraService, Object3DService) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs)
			{			
				var width = element[0].clientWidth;
				var height = element[0].clientHeight;

				CameraService.setCamera(new THREE.PerspectiveCamera( 45, width / height, 1, 10000 ));			
				SceneService.setScene(new THREE.Scene());
				SceneService.showAxses();
				
				var light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 0, 1 );
				SceneService.getScene().add(light);
				SceneService.getLights().push(light);

				var renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setClearColor( 0x000000 );
				renderer.setSize( width, height );
				
				element[0].appendChild( renderer.domElement );
				SceneService.setRenderer(renderer);
				SceneService.setDomElement(renderer.domElement);
				CameraService.setDomElement(renderer.domElement);
				
				renderer.domElement.addEventListener( 'contextmenu', function (event) { event.preventDefault(); }, false );
				renderer.domElement.addEventListener( 'mousedown', CameraService.onMouseDown, false );
				renderer.domElement.addEventListener( 'mousewheel', CameraService.onMouseWheel, false );
				renderer.domElement.addEventListener( 'DOMMouseScroll', CameraService.onMouseWheel, false ); // firefox

				renderer.domElement.addEventListener( 'keydown', CameraService.onKeyDown, false );

				renderer.domElement.addEventListener( 'touchstart', CameraService.touchstart, false );
				renderer.domElement.addEventListener( 'touchend', CameraService.touchend, false );
				renderer.domElement.addEventListener( 'touchmove', CameraService.touchmove, false );
				
				window.addEventListener( 'resize', 
					function(){ 
						CameraService.onResize(element[0].clientWidth,element[0].clientHeight);
						SceneService.onResize(element[0].clientWidth,element[0].clientHeight);
					}, 
				false);
				
				var geometry = new THREE.BoxGeometry( 1, 1, 1 );
				
				Object3DService.loadGeometry(geometry);
				
				SceneService.render();
				
			}
		};
	});