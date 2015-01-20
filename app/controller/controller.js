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
		
		$scope.showAxses = function() {
			SceneService.showAxses($scope.showaxes);
		};
	}
);