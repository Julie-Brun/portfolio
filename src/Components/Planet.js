import React from 'react';
import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createGlowMesh, defaultOptions } from 'three-glow-mesh';

import GLTFPlanet from '../img/Planet2.glb';
import GLTFRocket from '../img/Rocket01.glb';
import '../style.css';

class Planet extends React.Component {

    componentDidMount() {
        // Création de la scène
        var scene = new THREE.Scene();

        // Setup Caméra
        var width = window.innerWidth, height = window.innerHeight;
        var view_angle = 45, aspect = width / height, near = 0.1, far = 1000;
        var camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);
        camera.position.set(0,150,400);
        scene.add(camera);

        // Setup Renderer
        var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Assigne 
        this.mount.appendChild(renderer.domElement);

        // Setup Lumière
        var light = new THREE.PointLight(0xFFFFFF, 2);
        light.position.set(0, 0, 100);
        camera.add(light);

        // Setup Contrôle de la Planète
        var controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', animate); 
		controls.minDistance = 30;
		controls.maxDistance = 300;
        controls.target.set(0, 0, 0);
        controls.update();
        
        // Génère la Planète
        var planet;

        var loader = new GLTFLoader();
        loader.load( GLTFPlanet, gltf => {
            planet = gltf.scene;
            planet.position.set(0, 0, 0);
            planet.scale.set(12, 12, 12);
            
            scene.add(planet);
        });

        // Génère une sphère plus petite à l'intérieur de la Planète
        var sphereGeom =  new THREE.SphereGeometry( 59, 32, 16 );
        var darkMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff,  transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.BackSide });
        var sphere = new THREE.Mesh(sphereGeom.clone(), darkMaterial);
        sphere.position.set(0, 0, 0);

        // Génère une auréole autour de la petite sphère
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

        // Génère la fusée sur la Planète
        var rocket, radius = 4.98;

        var loader = new GLTFLoader();
        loader.load( GLTFRocket, gltf => {
            rocket = gltf.scene;
            rocket.position.setFromSphericalCoords(radius + 0.1, THREE.Math.degToRad(40), THREE.Math.degToRad(45));
            rocket.rotation.set(6.8, 0, 5.8);
            rocket.scale.set(1, 1, 1);
            
            planet.add(rocket);
        });


        animate();

        // Fonction pour animer la scène
        function animate() {
            requestAnimationFrame(animate);

            // Fait tourner la Planète
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