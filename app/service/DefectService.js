"use strict";

angular.module('myApp')
	.service('DefectService', function($rootScope) {
		var defects = array();
		var init = function()
		{
			var defects = array();
		}
		$scope.$on('onMouseMoveRaycaster', function(event, data) 
		{
			console.log(data);
		});
		init();
	}
);