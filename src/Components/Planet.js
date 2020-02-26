import React from 'react';
import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createGlowMesh, defaultOptions } from 'three-glow-mesh';

import GLTFPath from '../img/Planet2.glb';
import '../style.css';

class Planet extends React.Component {

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

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', animate); 
		controls.minDistance = 30;
		controls.maxDistance = 300;
        controls.target.set(0, 0, 0);
        controls.update();
        
        var planet;

        var loader = new GLTFLoader();
        loader.load( GLTFPath, gltf => {
            planet = gltf.scene;
            planet.position.set(0, 0, 0);
            planet.scale.set(12, 12, 12);
            
            scene.add(planet);
        });

        var sphereGeom =  new THREE.SphereGeometry( 59, 32, 16 );
        var darkMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff,  transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.BackSide });
        var sphere = new THREE.Mesh(sphereGeom.clone(), darkMaterial);
        sphere.position.set(0, 0, 0);

        var options = {
            ...defaultOptions,
            backside: true,
            coefficient: 0.2,
            color: 'turquoise',
            size: 35,
            power: 5,
        };

        var glowMesh = createGlowMesh(sphereGeom, options);
        sphere.add(glowMesh);

        scene.add(sphere);

        animate();

        function animate() {
            requestAnimationFrame(animate);

            if (planet) {
                planet.rotation.y += 0.0005;
            }

            renderer.render(scene, camera);
        };
    };

    render() {
        return (
            <div id="planet" ref={ref => (this.mount = ref)} />
        );
    };
};

export default Planet;