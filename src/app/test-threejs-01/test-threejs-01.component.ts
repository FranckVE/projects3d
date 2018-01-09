import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'new-three-orbitcontrols-ts';
import * as STATS from 'stats-js';

@Component({
    selector: 'app-test-threejs-01',
    templateUrl: './test-threejs-01.component.html',
    styleUrls: ['./test-threejs-01.component.css']
})
export class TestThreejs01Component implements OnInit {


    @ViewChild('containerel') element3dSceneRef: ElementRef;
    @ViewChild('statsel') elementStatsRef: ElementRef;
    private scene3dContainer: HTMLElement;
    private statsContainer: HTMLElement;

    public controls: OrbitControls;

    scene;
    camera;
    renderer;
    clock;
    geometry;
    material;
    canvas;
    mixer;
    floor;
    light;
    frontLight;

    cubeContainer;
    position;
    clip;
    clipAction;

    stats;

    constructor() {
    }

    ngOnInit() {

        this.stats = new STATS();
        this.clock = new THREE.Clock();
        this.addEventListeners();
        this.createSceneWithShadowsAndFog(false);
        this.createSceneRendererWithShadow();
        this.createSimpleCamera();
        this.createLights();
        this.addFloor();
        this.createOrbitControls();
        this.prepareAnimationPath01();
        this.addMappedObject02();
        this.renderedSize();
        this.attachSceneToHTML();
        this.executeAnimateRisingLogo01();
    }

    //
    //
    // SCENE SETUP METHODS
    //
    //

    /*
    ############# CREATE A SCENE
    */

    attachSceneToHTML() {

        this.scene3dContainer = this.element3dSceneRef.nativeElement;
        this.statsContainer = this.elementStatsRef.nativeElement;
        this.canvas = this.renderer.domElement;
        this.scene3dContainer.appendChild(this.canvas);
        this.statsContainer.appendChild(this.stats.domElement);
    }

    createSceneWithShadowsAndFog(withAxisHelper: Boolean) {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xFFFFFF, 0, 750);
        if (withAxisHelper) {
            this.scene.add(new THREE.AxisHelper(20));
        }
    }

    /*
    ############# CREATE A RENDERER
    */

    createSceneRendererWithShadow() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xFFFFFF);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
    }

    //
    //
    // ORBIT CONTROLS METHODS
    //
    //

    createOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 1.2;
        this.controls.minZoom = 0.1;
        this.controls.maxZoom = 100;
    }

    //
    //
    // LIGHT METHODS
    //
    //

    createLights() {
        const ambientLight = new THREE.AmbientLight(0x666666);
        this.scene.add(ambientLight);

        this.light = new THREE.DirectionalLight(0xAAAAAA, .7);
        this.light.position.set(.5, 1, 0);
        this.light.castShadow = true;
        this.light.shadow.camera.near = -30;
        this.light.shadow.camera.left = -30;
        this.light.shadow.camera.bottom = -30;
        this.light.shadow.camera.right = 30;
        this.light.shadow.camera.top = 30;
        this.scene.add(this.light);

        this.light = new THREE.DirectionalLight(0xAAAAAA, .2);
        this.light.position.set(-.5, 1, .1);
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

    //
    //
    // FLOOR METHODS
    //
    //

    addFloor() {
        this.geometry = new THREE.PlaneGeometry(10000, 10000);
        // do something with the texture
        this.material = new THREE.MeshPhongMaterial({
            color: 0xdddddd
        });
        this.floor = new THREE.Mesh(this.geometry, this.material);
        this.floor.rotation.x = -Math.PI / 2;
        this.floor.receiveShadow = true;
        this.floor.position.y = -20;
        this.scene.add(this.floor);
    }

    //
    //
    // CAMERA METHODS
    //
    //

    createSimpleCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 30);
    }

    cameraSize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
    }

    //
    //
    // 3D RENDERING METHODS
    //
    //

    renderScene() {
        this.stats.update();
        this.renderer.render(this.scene, this.camera);
    }

    renderedSize() {
        this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    }

    //
    //
    // EVENTS METHODS
    //
    //

    addEventListeners() {
        window.addEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        console.log("resize");
        this.renderedSize();
        this.cameraSize();
        this.camera.updateProjectionMatrix();
    }

    //
    //
    // ANIMATIONS METHODS
    //
    //

    executeAnimateRisingLogo01 = () => {
        requestAnimationFrame(this.executeAnimateRisingLogo01);
        const delta = this.clock.getDelta();
        this.cubeContainer.rotation.y += 0.02;
        // this.controls.update(delta);
        if (this.mixer) {
            this.mixer.update(delta);
        }
        this.frontLight.position.set(this.camera.position.clone());
        this.renderScene();
        // tslint:disable-next-line:semicolon
    };

    prepareAnimationPath01() {
        this.cubeContainer = new THREE.Object3D();
        this.scene.add(this.cubeContainer);
        // create an animation sequence with the tracks
        // If a negative time value is passed, the duration will be calculated from the times of the passed tracks array
        this.position = new THREE.VectorKeyframeTrack('.position', [2, 3.6, 4], [0, -30, 0, 0, 1, 0, 0, 0, 0], THREE.InterpolateSmooth);
        this.clip = new THREE.AnimationClip('Action', 4, [this.position]);

        // setup the AnimationMixer
        this.mixer = new THREE.AnimationMixer(this.cubeContainer);

        // create a ClipAction and set it to play
        this.clipAction = this.mixer.clipAction(this.clip);
        this.clipAction.setLoop(THREE.LoopOnce);
        this.clipAction.play();
    }

    //
    //
    // OBJECTS METHODS
    //
    //

    addMappedObject02() {
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "*";
        loader.load(
            './assets/images/MongoDB_Logo_only_FullColor_sq.png',
            (texture) => {
                const materialFace = new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    emissive: 0x000000,
                    map: texture,
                    bumpMap: texture
                });
                const materialSide = new THREE.MeshBasicMaterial({
                    color: 0xFF2222
                });
                const geometry = new THREE.BoxGeometry(5, 10, 1);
                const cube = new THREE.Mesh(geometry, [
                    materialSide, materialSide,
                    materialSide, materialSide,
                    materialFace, materialFace
                ]);
                cube.position.set(5, 0, 5);
                cube.castShadow = true;
                this.cubeContainer.add(cube);
            },
            undefined,
            (err) => {
                console.log(err);
                throw err;
            }
        );
    }

}
