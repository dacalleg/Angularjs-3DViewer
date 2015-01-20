"use strict";

angular.module('myApp')
	.controller("CameraController", function ($scope, CameraService, SceneService) 
	{
		$scope.showaxes = SceneService.axsesVisible();
		
		$scope.centerView = function() {
			CameraService.centerView();
		};
		
		$scope.topView = function() {
			CameraService.topView();
		};
		
		$scope.frontView = function() {
			CameraService.frontView();
		};
		
		$scope.bottomView = function() {
			CameraService.bottomView();
		};
		
		$scope.backView = function() {
			CameraService.backView();
		};
		
		$scope.leftView = function() {
			CameraService.leftView();
		};
		
		$scope.rightView = function() {
			CameraService.rightView();
		};
		
		$scope.showAxses = function() {
			$scope.showaxes = !$scope.showaxes;
			SceneService.showAxses($scope.showaxes);
		};
	}
);