"use strict";
var mesh = function(){};
mesh.prototype = THREE.Mesh.prototype;

THREE.Defect = function(material) {
	var value = 1;
	var geometry = new THREE.SphereGeometry( 7, 32, 32 );
    THREE.Mesh.call(this, geometry, material);
	this.getValue = function()
	{
		return this.geometry.boundingSphere.radius;
	};
	this.setValue = function(_value)
	{
		var scale = _value / this.geometry.boundingSphere.radius;
		this.geometry.boundingSphere.radius = _value;
		this.scale.x = scale;
		this.scale.y = scale;
		this.scale.z = scale;
	}
};

THREE.Defect.prototype = new mesh();
THREE.Defect.prototype.constructor = THREE.Mesh;