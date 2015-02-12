"use strict";

angular.module('myApp')
    .service('ClippingService', function($rootScope,SceneService,Object3DService) {
        var box,box_bsp;

        this.clip = function() {
            box = Object3DService.getBoundingBox();
            var width = Math.abs(box.min.x - box.max.x);
            var height = Math.abs(box.min.y - box.max.y);
            var deep = Math.abs(box.min.z - box.max.z);

            var geometry = new THREE.BoxGeometry(width, height, deep);
            var mesh_box = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({shading: THREE.SmoothShading}));

            mesh_box.scale.set(0.5, 0.5, 0.5);
            box_bsp = new ThreeBSP(mesh_box);

            var intersect_bsp = Object3DService.getBsp().intersect(box_bsp);
            var result = intersect_bsp.toMesh(new THREE.MeshLambertMaterial({shading: THREE.SmoothShading}));
            result.geometry.computeVertexNormals();

            $rootScope.$emit('objectClipped', {mesh: result});
        }
    }
);
