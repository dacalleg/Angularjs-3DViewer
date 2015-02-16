"use strict";

angular.module('myApp')
	.controller("CameraController", function ($scope, CameraObject3DService, SceneObject3DService) 
	{
		$scope.showaxes = SceneObject3DService.axsesVisible();
		
		$scope.centerView = function() {
			CameraObject3DService.centerView();
		};
		
		$scope.topView = function() {
			CameraObject3DService.topView();
		};
		
		$scope.frontView = function() {
			CameraObject3DService.frontView();
		};
		
		$scope.bottomView = function() {
			CameraObject3DService.bottomView();
		};
		
		$scope.backView = function() {
			CameraObject3DService.backView();
		};
		
		$scope.leftView = function() {
			CameraObject3DService.leftView();
		};
		
		$scope.rightView = function() {
			CameraObject3DService.rightView();
		};
		
		$scope.showAxses = function() {
			$scope.showaxes = !$scope.showaxes;
			SceneObject3DService.showAxses($scope.showaxes);
		};
	})
	.controller("Object3DController", function ($scope, Object3DService) 
	{
		$scope.showireframe = Object3DService.wireframeVisible();
		
		$scope.toogleWireframe = function() {
			$scope.showireframe = !$scope.showireframe;
			Object3DService.setWireframe($scope.showireframe);
		};
		
		$scope.loadModel = function(name) {
			Object3DService.loadFromModel(name);
		}
	})
	.controller("OrbitController", function ($scope, ConfigurationService) 
	{
		$scope.configuration = ConfigurationService.getConfig();
		
		$scope.togglePan = function() {
			$scope.configuration.controls.noPan = !$scope.configuration.controls.noPan;
		};
		$scope.toggleZoom = function() {
			$scope.configuration.controls.noZoom = !$scope.configuration.controls.noZoom;
		};
		$scope.toggleRotate = function() {
			$scope.configuration.controls.noRotate = !$scope.configuration.controls.noRotate;
		}
	})
	.controller("ConfigurationController", function ($scope, ConfigurationService) 
	{
		$scope.configuration = ConfigurationService.getConfig();
		
		$scope.showModal = function() {
			$('#configmodal').modal('show');
		}
	})
	.controller("ClippingController", function ($scope, ClippingService)
	{
		$scope.test = function() {
			ClippingService.showXPlaneClip();
		}
	})
;