"use strict";
var mesh = function(){};
mesh.prototype = THREE.Mesh.prototype;

THREE.Defect = function() {
	var value = 1;
	var geometry = new THREE.SphereGeometry( 5, 32, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    THREE.Mesh.call(this, geometry, material);
	this.getValue = function()
	{
		return value;
	}
	this.setValue = function(_value)
	{
		value = _value;
	}
}

THREE.Defect.prototype = new mesh();
THREE.Defect.prototype.constructor = THREE.Mesh;