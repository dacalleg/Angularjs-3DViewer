"use strict";

angular.module('myApp')
    .service('ClippingService', function($rootScope,SceneService,Object3DService) {
        var box,box_bsp;
        var xplanemin,xplanemax;
        var selected,move = false;
        var line;

        this.showXPlaneClip = function()
        {
            var geom;

            geom = new THREE.Geometry();
            var v1min = new THREE.Vector3(box.min.x,box.min.y,box.max.z);
            var v2min = new THREE.Vector3(box.min.x,box.max.y,box.min.z);
            var v3min = new THREE.Vector3(box.min.x,box.max.y,box.max.z);
            var v4min= new THREE.Vector3(box.min.x,box.min.y,box.min.z);

            geom.vertices.push(v1min);
            geom.vertices.push(v2min);
            geom.vertices.push(v3min);
            geom.vertices.push(v4min);

            geom.faces.push( new THREE.Face3( 0, 2, 3 ) );
            geom.faces.push( new THREE.Face3( 1, 2, 3 ) );

            geom.computeFaceNormals();

            xplanemin = new THREE.Mesh( geom, new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.DoubleSide} ));

            $rootScope.$emit("onAddToScene",xplanemin);

            geom = new THREE.Geometry();
            var v1max = new THREE.Vector3(box.max.x,box.min.y,box.max.z);
            var v2max = new THREE.Vector3(box.max.x,box.max.y,box.min.z);
            var v3max = new THREE.Vector3(box.max.x,box.max.y,box.max.z);
            var v4max = new THREE.Vector3(box.max.x,box.min.y,box.min.z);

            geom.vertices.push(v1max);
            geom.vertices.push(v2max);
            geom.vertices.push(v3max);
            geom.vertices.push(v4max);


            geom.faces.push( new THREE.Face3( 0, 2, 3 ) );
            geom.faces.push( new THREE.Face3( 1, 2, 3 ) );

            geom.computeFaceNormals();

            xplanemax = new THREE.Mesh( geom, new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.DoubleSide} ));

            $rootScope.$emit("onAddToScene",xplanemax);

            var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
            var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            var plane = new THREE.Mesh( geometry, material );
            $rootScope.$emit("onAddToScene",plane );

        };

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
        };

        $rootScope.$on('objectLoaded', function()
        {
            box = Object3DService.getBoundingBox();
        });

        $rootScope.$on('onMouseMoveRaycaster', function(event,data){
            if(!move) {
                if (xplanemin)
                    xplanemin.material.color.setHex(0x9999ff);
                for (var i = 0; i < data.intersects.length; i++)
                    if (data.intersects[i].object === xplanemin) {
                        xplanemin.material.color.setHex(0xffff00);
                        selected = xplanemin;
                    }
                    else
                        selected = null;
            }
        });
        $rootScope.$on('onMouseMove', function(event,data){
            if(move)
            {
                var mouse = new THREE.Vector3(data.mouse.x,data.mouse.y);
                var raycaster = new THREE.Raycaster( line, mouse);
                var intersects = raycaster.intersectObjects(line);
                console.log(intersects);
            }
        });
        $rootScope.$on('onMouseDown', function(event,data){
            if(!move) {
                if (selected == xplanemin)
                    if (data.button == 0) {
                        move = true;
                    }
            } else {
                move = false;
                selected = null;
            }
        });
    }
);
