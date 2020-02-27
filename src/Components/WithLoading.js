import React from 'react';
import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import GLTFPath from '../img/Rocket01.glb';
import '../style.css';

class WithLoading extends React.Component {
    componentDidMount() {
        var scene = new THREE.Scene();

        var width = window.innerWidth, height = window.innerHeight;
        var view_angle = 45, aspect = width / height, near = 0.1, far = 1000;
        var camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);
        camera.position.set(0,150,400);
        scene.add(camera);

        var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        this.mount.appendChild(renderer.domElement);

        var light = new THREE.PointLight(0xFFFFFF, 2);
        light.position.set(0, 0, 100);
        camera.add(light);

        var rocket;

        var loader = new GLTFLoader();
        loader.load( GLTFPath, gltf => {
            rocket = gltf.scene;
            rocket.position.set(-10, 160, 0);
            rocket.rotation.set(0, 0, 5);
            rocket.scale.set(12, 12, 12);
            
            scene.add(rocket);
        });

        var axis = new THREE.Vector3( 0, 1, 0 ).normalize(); 

        animate();

        function animate() {
            requestAnimationFrame(animate);

            if (rocket) {
                rocket.rotateOnAxis( axis, Math.PI * 0.01 );
            }

            renderer.render(scene, camera);
        };
    };

    render() {
        return (
            <div id="loading">
                <div id="fusée" ref={ref => (this.mount = ref)} />
                <p>Chargement de la fusée ...</p>
            </div>
        );
    };
};

export default WithLoading;