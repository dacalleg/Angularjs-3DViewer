"use strict";

angular.module('myApp')
	.service('CameraObject3DService', function(CameraService,Object3DService,ConfigurationService) {
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
			var mesh = Object3DService.getMesh();
			var radius = mesh.geometry.boundingSphere.radius;
			var distanceFactor = Math.abs( CameraService.getCamera().aspect * radius / Math.sin( CameraService.getCamera().fov / 2 ));
			this.centerView();
			this.changePosition(0,distanceFactor,0);
		}
		
		this.bottomView = function()
		{
			var mesh = Object3DService.getMesh();
			var radius = mesh.geometry.boundingSphere.radius;
			var distanceFactor = Math.abs( CameraService.getCamera().aspect * radius / Math.sin( CameraService.getCamera().fov / 2 ));
			this.centerView();
			this.changePosition(0,-distanceFactor,0);
		}
		
		this.frontView = function()
		{
			var mesh = Object3DService.getMesh();
			var radius = mesh.geometry.boundingSphere.radius;
			var distanceFactor = Math.abs( CameraService.getCamera().aspect * radius / Math.sin( CameraService.getCamera().fov / 2 ));
			this.centerView();
			this.changePosition(0,0,-distanceFactor);
		}
		
		this.backView = function()
		{
			var mesh = Object3DService.getMesh();
			var radius = mesh.geometry.boundingSphere.radius;
			var distanceFactor = Math.abs( CameraService.getCamera().aspect * radius / Math.sin( CameraService.getCamera().fov / 2 ));
			this.centerView();
			this.changePosition(0,0,distanceFactor);
		}
		this.leftView = function()
		{
			var mesh = Object3DService.getMesh();
			var radius = mesh.geometry.boundingSphere.radius;
			var distanceFactor = Math.abs( CameraService.getCamera().aspect * radius / Math.sin( CameraService.getCamera().fov / 2 ));
			this.centerView();
			this.changePosition(-distanceFactor,0,0);
		}
		this.rightView = function()
		{
			var mesh = Object3DService.getMesh();
			var radius = mesh.geometry.boundingSphere.radius;
			var distanceFactor = Math.abs( CameraService.getCamera().aspect * radius / Math.sin( CameraService.getCamera().fov / 2 ));
			this.centerView();
			this.changePosition(distanceFactor,0,0);
		}
		
		this.changePosition = function(x,y,z)
		{
			var configuration = ConfigurationService.getConfig();
			var camera = CameraService.getCamera();
			if(configuration.enableAnimation)
			{
				var position_tween = new TWEEN.Tween({ x: camera.position.x, y: camera.position.y, z: camera.position.z })
				.to( { x: x, y: y, z: z }, ConfigurationService.getConfig().animationDuration )
				.easing( TWEEN.Easing.Linear.None )
				.onUpdate( function () {
					CameraService.getCamera().position.set(this.x,this.y,this.z);
					CameraService.update();
				})
				position_tween.start();
			}
			else
			{
				CameraService.getCamera().position.set(x,y,z);
				CameraService.update();	
			}
		}
	}
);