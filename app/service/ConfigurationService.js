"use strict";

angular.module('myApp')
	.service('ConfigurationService', function($rootScope) {
		var config = {
			animationDuration: 500,
			enableAnimation: true,
			mouseControlsEnabled: true,
			controls: {
				noZoom: false,
				zoomSpeed: 2.0,
				minDistance: 0,
				maxDistance: Infinity,
				noRotate: false,
				rotateSpeed: 1.0,
				noPan: false,
				keyPanSpeed: 7.0,
				autoRotate: false,
				autoRotateSpeed: 2.0,
				minPolarAngle: 0,
				maxPolarAngle: Math.PI,
				noKeys: false,
				keys:{ 
					LEFT: 37, 
					UP: 38, 
					RIGHT: 39, 
					BOTTOM: 40 
				}
			}
		};
		
		this.getConfig = function()
		{
			return config;
		}
	}
);