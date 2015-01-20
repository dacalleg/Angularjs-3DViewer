"use strict";

angular.module('myApp')
	.controller("CameraController", function ($scope, CameraObject3DService, SceneService) 
	{
		$scope.showaxes = SceneService.axsesVisible();
		
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
			SceneService.showAxses($scope.showaxes);
		};
	}
);