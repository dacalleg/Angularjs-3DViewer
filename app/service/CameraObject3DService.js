"use strict";

angular.module('myApp')
	.service('CameraObject3DService', function(CameraService,Object3DService,ConfigurationService, $rootScope) {
		var that = this;
		this.centerView = function()
		{
			var configuration = ConfigurationService.getConfig();
			var target = CameraService.getTarget();
			if(configuration.enableAnimation)
			{
				var view_tween = new TWEEN.Tween({ x: target.x, y: target.y, z: target.z })
				.to( { x: 0, y: 0, z: 0 }, configuration.animationDuration )
				.easing( TWEEN.Easing.Linear.None )
				.onUpdate( function () {
					target.setX(this.x);
					target.setY(this.y);
					target.setZ(this.z);
					CameraService.update();
				});
				view_tween.start();
			}
			else
			{
				target.setX(0);
				target.setY(0);
				target.setZ(0);
				CameraService.update();
			}
		}
		
		this.topView = function()
		{
			var distanceFactor = getDistanceFactor();
			this.centerView();
			var tween = this.changePosition(0,0,distanceFactor,false);
			tween.onComplete(function(){that.changePosition(0,distanceFactor,0,true)});
			tween.start();
		}
		
		this.bottomView = function()
		{
			var distanceFactor = getDistanceFactor();
			this.centerView();
			var tween = this.changePosition(0,0,distanceFactor,false);
			tween.onComplete(function(){that.changePosition(0,-distanceFactor,0,true)});
			tween.start();
		}
		
		this.frontView = function()
		{
			var distanceFactor = getDistanceFactor();
			this.centerView();
			var tween = this.changePosition(0,0,distanceFactor,false);
			tween.onComplete(function(){that.changePosition(0,0,-distanceFactor,true)});
			tween.start();
		}
		
		this.backView = function()
		{
			var distanceFactor = getDistanceFactor();
			this.centerView();
			var tween = this.changePosition(0,0,distanceFactor,true);
		}
		this.leftView = function()
		{
			var distanceFactor = getDistanceFactor();
			this.centerView();
			var tween = this.changePosition(0,0,distanceFactor,false);
			tween.onComplete(function(){that.changePosition(-distanceFactor,0,0,true)});
			tween.start();
		}
		this.rightView = function()
		{
			var distanceFactor = getDistanceFactor();
			this.centerView();
			var tween = this.changePosition(0,0,distanceFactor,false);
			tween.onComplete(function(){that.changePosition(distanceFactor,0,0,true)});
			tween.start();
		}
		this.prospectiveView = function()
		{
			var distanceFactor = getDistanceFactor();
			this.centerView();
			this.changePosition(distanceFactor,distanceFactor,distanceFactor,true);
		}
		this.changePosition = function(x,y,z,start)
		{
			var configuration = ConfigurationService.getConfig();
			var camera = CameraService.getCamera();
			var duration = configuration.enableAnimation ? ConfigurationService.getConfig().animationDuration : 0;
			var position_tween = new TWEEN.Tween({ x: camera.position.x, y: camera.position.y, z: camera.position.z })
			.to( { x: x, y: y, z: z }, duration )
			.easing( TWEEN.Easing.Linear.None )
			.onUpdate( function () {
				CameraService.getCamera().position.set(this.x,this.y,this.z);
				CameraService.update();
			})
			if(start)
				position_tween.start();
			return position_tween;
		}
		var getDistanceFactor = function()
		{
			var mesh = Object3DService.getMesh();
			var radius = mesh.geometry.boundingSphere.radius;
			var distanceFactor = Math.abs( CameraService.getCamera().aspect * radius / Math.sin( CameraService.getCamera().fov / 2 ));
			return distanceFactor;
		}
		
		$rootScope.$on('objectLoaded', function(event, data) 
		{ 
			that.prospectiveView();
		});
	}
);