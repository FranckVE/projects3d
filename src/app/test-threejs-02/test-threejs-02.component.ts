import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
/*
https://stackoverflow.com/questions/41681542/typeerror-orbitcontrols-is-not-a-constructor-in-angular2?rq=1
npm install three-orbit-controls
const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);
 */

// const THREE_MeshToonMaterial = require("three/examples/js/effects/OutlineEffect.js");

@Component({
    selector: 'app-test-threejs-02',
    templateUrl: './test-threejs-02.component.html',
    styleUrls: ['./test-threejs-02.component.css']
})
export class TestThreejs02Component implements OnInit {

    @ViewChild('containerel') elementRef: ElementRef;
    private container: HTMLElement;

    scene;
    camera;
    renderer;
    geometry;
    material;
    cube1;
    cube2;
    cube3;
    sphere1;
    sphere2;
    floor;
    light;
    frontLight;

    constructor() {
    }

    ngOnInit() {

        this.container = this.elementRef.nativeElement;

        this.createSceneWithShadowsAndFog(true);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(3, 3, 3);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
        // Shadows :
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        this.container.appendChild(this.renderer.domElement);

        this.createLights();
        this.addFloor();

        this.addCube1();
        this.addCube2();
        this.addCube3();
        this.addSphere1();
        this.addSphere2();
        this.addText1();
        this.addText2();

        this.camera.position.z = 5;

        this.render(true);

    }

    createSceneWithShadowsAndFog(withAxisHelper: Boolean) {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xFFFFFF, 0, 750);
        if (withAxisHelper) {
            this.scene.add(new THREE.AxisHelper(20));
        }
    }

    render(animateScene: Boolean) {

        const self: TestThreejs02Component = this;

        if (animateScene) {
            (function render() {
                requestAnimationFrame(render);
                self.renderScene();

                self.animate();
            }());
        } else {
            self.renderScene();
        }

    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        this.cube1.rotateX(0.01);
        this.cube1.rotateY(0.01);
        this.cube1.position.addScalar(0.005);
        this.cube2.rotateX(-0.01);
        this.cube2.rotateY(-0.01);
        // this.cube1.position.addScalar(0.01);
    }

    addCube1() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshPhongMaterial({color: 0x00ff00});
        this.material.wireframe = false;
        this.material.transparent = true;
        this.material.opacity = 0.4;
        this.cube1 = new THREE.Mesh(this.geometry, this.material);
        this.cube1.castShadow = true;
        this.cube1.receiveShadow = true;
        this.scene.add(this.cube1);
    }

    addCube2() {
        this.geometry = new THREE.BoxGeometry(3, 3, 3);
        this.material = new THREE.MeshPhongMaterial({color: 0xcc0000});
        this.material.wireframe = false;
        this.material.transparent = true;
        this.material.opacity = 0.9;
        this.cube2 = new THREE.Mesh(this.geometry, this.material);
        this.cube2.castShadow = true;
        this.cube2.receiveShadow = true;
        this.scene.add(this.cube2);
    }

    addCube3() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.geometry.translate(3, 0, 0);
        this.material = new THREE.MeshBasicMaterial({color: 0x0000ff});
        this.material.wireframe = false;
        this.material.transparent = true;
        this.material.opacity = 0.9;
        this.cube3 = new THREE.Mesh(this.geometry, this.material);
        this.cube3.castShadow = true;
        this.cube3.receiveShadow = true;
        this.scene.add(this.cube3);
    }

    addSphere1() {
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.geometry.translate(0, 3, 0);
        this.material = new THREE.MeshPhongMaterial({color: 0x00ffff});
        this.material.wireframe = false;
        this.material.transparent = false;
        this.material.shininess = 100;
        this.sphere1 = new THREE.Mesh(this.geometry, this.material);
        this.sphere1.castShadow = true;
        this.sphere1.receiveShadow = true;
        this.scene.add(this.sphere1);
    }

    addSphere2() {
        // const reflectionCube = new THREE.CubeTextureLoader()
        //     .setPath( './assets/images/textures/SwedishRoyalCastle/' )
        //     .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
        // reflectionCube.format = THREE.RGBFormat;
        // const bumpScale = 1;
        // const alpha = 0.4;
        // const gamma = 0.6;
        // const beta = 0.8;
        // const alphaIndex = 3;
        // const specularShininess = Math.pow( 2, alpha * 10 );
        // const diffuseColor = new THREE.Color().setHSL( alpha, 0.5, gamma * 0.5 + 0.1 ).multiplyScalar( 1 - beta * 0.2 );
        // const specularColor = new THREE.Color( beta * 0.2, beta * 0.2, beta * 0.2 );
        // const imgTexture = new THREE.TextureLoader().load( "./assets/images/textures/moon_1024.jpg" );
        // const material = new THREE_MeshToonMaterial( {
        //     map: imgTexture,
        //     bumpMap: imgTexture,
        //     bumpScale: bumpScale,
        //     color: diffuseColor,
        //     specular: specularColor,
        //     reflectivity: beta,
        //     shininess: specularShininess,
        //     envMap: alphaIndex % 2 === 0 ? null : reflectionCube
        // } );
        this.geometry = new THREE.SphereGeometry(1, 32, 32);
        this.geometry.translate(0, 0, 3);
        this.material = new THREE.MeshPhongMaterial({color: 0x00ffff});
        this.material.wireframe = false;
        this.material.transparent = false;
        this.material.shininess = 100;
        this.sphere2 = new THREE.Mesh(this.geometry, this.material);
        this.sphere2.castShadow = true;
        this.sphere2.receiveShadow = true;
        this.scene.add(this.sphere2);
    }

    addText1() {
        const loader = new THREE.FontLoader();

        loader.load('./assets/fonts/helvetiker_regular.typeface.json', (font) => {

            const geometry = new THREE.TextGeometry('Hello World !', {
                font: font,
                size: 4, /* character size */
                height: 0.3, /* depth of the text */
                curveSegments: 8, /* subdivisions for curved elements in text */
                bevelEnabled: true,
                bevelThickness: 0.05, /* how deep goes the bevel in the depth of the text */
                bevelSize: 0.2, /* how wide goes the bevel on the text outline */
                bevelSegments: 6 /* subdivisions for bevel */
            });
            geometry.translate(-10, 0, -10); // x: left-right, y: up-down, z: forward-backward
            // geometry.rotateX(-3.14 * 2 / 360 * 45); // around left-right axis
            geometry.rotateY(3.14 * 2 / 360 * 45); // around up-down axis
            // geometry.rotateZ(0); // around backward-forward axis
            const material = new THREE.MeshPhongMaterial({color: 0x00ffff});
            material.wireframe = false;
            material.transparent = false;
            material.shininess = 100;
            const text3d = new THREE.Mesh(geometry, material);
            text3d.castShadow = true;
            text3d.receiveShadow = true;
            this.scene.add(text3d);
        });
    }

    addText2() {
        const loader = new THREE.FontLoader();

        loader.load('./assets/fonts/helvetiker_regular.typeface.json', (font) => {

            const geometry = new THREE.TextGeometry('ThreeJS', {
                font: font,
                size: 2, /* character size */
                height: 0.2, /* depth of the text */
                curveSegments: 8, /* subdivisions for curved elements in text */
                bevelEnabled: true,
                bevelThickness: 0.01, /* how deep goes the bevel in the depth of the text */
                bevelSize: 0.01, /* how wide goes the bevel on the text outline */
                bevelSegments: 6 /* subdivisions for bevel */
            });
            geometry.translate(-10, 0, -8); // x: left-right, y: up-down, z: forward-backward
            // geometry.rotateX(-3.14 * 2 / 360 * 45); // around left-right axis
            geometry.rotateY(3.14 * 2 / 360 * 65); // around up-down axis
            // geometry.rotateZ(0); // around backward-forward axis
            const material = new THREE.MeshPhongMaterial({color: 0xff0000});
            material.wireframe = false;
            material.transparent = false;
            material.shininess = 100;
            const text3d = new THREE.Mesh(geometry, material);
            text3d.castShadow = true;
            text3d.receiveShadow = true;
            this.scene.add(text3d);
        });
    }

    createLights() {
        const ambientLight = new THREE.AmbientLight(0x333333);
        this.scene.add(ambientLight);

        this.light = new THREE.DirectionalLight(0xAAAAAA, .5);
        this.light.position.set(15, 30, 0);
        this.light.castShadow = true;
        this.light.shadow.camera.near = -30;
        this.light.shadow.camera.left = -30;
        this.light.shadow.camera.bottom = -30;
        this.light.shadow.camera.right = 30;
        this.light.shadow.camera.top = 30;
        this.scene.add(this.light);

        this.light = new THREE.DirectionalLight(0xAAAAAA, .2);
        this.light.position.set(-15, 30, 3);
        this.light.castShadow = true;
        this.light.shadow.camera.near = -30;
        this.light.shadow.camera.left = -30;
        this.light.shadow.camera.bottom = -30;
        this.light.shadow.camera.right = 30;
        this.light.shadow.camera.top = 30;
        this.scene.add(this.light);

        this.frontLight = new THREE.PointLight(0xAAAAAA, .8, 100);
        this.scene.add(this.frontLight);
    }

    addFloor() {
        this.geometry = new THREE.PlaneGeometry(10000, 10000);
        // do something with the texture
        this.material = new THREE.MeshPhongMaterial({
            color: 0xdddddd
        });
        this.floor = new THREE.Mesh(this.geometry, this.material);
        this.floor.rotation.x = -Math.PI / 2;
        this.floor.receiveShadow = true;
        this.floor.position.y = -1;
        this.scene.add(this.floor);
    }


}
