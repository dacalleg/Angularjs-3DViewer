"use strict";

angular.module('myApp')
	.directive('ngWebgl', function(SceneService, CameraService, Object3DService, DefectService, ClippingService) {
		return {
			scope:{
				process: '=',
				master: '='
			},
			restrict: 'A',
			link: function (scope, element, attrs)
			{			
				var width = element[0].clientWidth;
				var height = element[0].clientHeight;
				var options = { antialias: true };

				var renderer = Detector.webgl ? new THREE.WebGLRenderer(options) : new THREE.CanvasRenderer(options);
				renderer.setClearColor( 0x000000 );
				renderer.setSize( width, height );
				SceneService.setScene(new THREE.Scene());

				element[0].appendChild( renderer.domElement );
				SceneService.setRenderer(renderer);

				CameraService.setCamera(new THREE.PerspectiveCamera( 45, width / height, 1, 10000 ));
				CameraService.setDomElement(renderer.domElement);


				
				var light = new THREE.AmbientLight( 0x404040 );
				SceneService.getScene().add(light);
				SceneService.getLights().push(light);

				renderer.domElement.addEventListener( 'contextmenu', function (event) { event.preventDefault(); }, false );
				renderer.domElement.addEventListener( 'mousedown', CameraService.onMouseDown, false );
				renderer.domElement.addEventListener( 'mousedown', SceneService.onMouseDown, false );
				renderer.domElement.addEventListener( 'mousemove', CameraService.onMouseMove, false );
				renderer.domElement.addEventListener( 'mousemove', SceneService.onMouseMove, false );
				renderer.domElement.addEventListener( 'mouseup', CameraService.onMouseUp, false );
				renderer.domElement.addEventListener( 'mousewheel', CameraService.onMouseWheel, false );
				renderer.domElement.addEventListener( 'DOMMouseScroll', CameraService.onMouseWheel, false ); // firefox

				window.addEventListener( 'keydown', CameraService.onKeyDown, false );

				renderer.domElement.addEventListener( 'touchstart', CameraService.touchstart, false );
				renderer.domElement.addEventListener( 'touchend', CameraService.touchend, false );
				renderer.domElement.addEventListener( 'touchmove', CameraService.touchmove, false );
				
				window.addEventListener( 'resize', 
					function(){ 
						CameraService.onResize(element[0].clientWidth,element[0].clientHeight);
						SceneService.onResize(element[0].clientWidth,element[0].clientHeight);
					}, 
				false);
				
				DefectService.loadDefects();
				SceneService.render();
			}
		};
	});