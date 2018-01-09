import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'new-three-orbitcontrols-ts';
import * as STATS from 'stats-js';

@Component({
    selector: 'app-test-threejs-04',
    templateUrl: './test-threejs-04.component.html',
    styleUrls: ['./test-threejs-04.component.css']
})
export class TestThreejs04Component implements OnInit {

    @ViewChild('containerel') element3dSceneRef: ElementRef;
    @ViewChild('statsel') elementStatsRef: ElementRef;
    private scene3dContainer: HTMLElement;
    private statsContainer: HTMLElement;

    public controls: OrbitControls;

    scene;
    camera;
    renderer;
    cube;
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
        // this.addDemoCube();
        this.prepareAnimationPath01();
        this.addMappedObject01();
        this.addMappedObject02();
        this.addText1();
        this.renderedSize();
        this.attachSceneToHTML();
        this.render(false);
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

    createSimpleScene(withAxisHelper: Boolean) {
        this.scene = new THREE.Scene();
        if (withAxisHelper) {
            this.scene.add(new THREE.AxisHelper(20));
        }
    }

    /*
    ############# CREATE A RENDERER
    */

    createSimpleSceneRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xFFFFFF);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    createSceneRendererWithShadow() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xFFFFFF);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;

        // this.controls = new OrbitControls(this.camera, this.canvas);
        // // (this.camera, this.canvas);
        // // this.controls = new THREE.OrbitControls(this.camera);
        // this.controls.rotateSpeed = 1.0;
        // this.controls.zoomSpeed = 1.2;
        // this.controls.addEventListener('change', this.renderScene);
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
        // // (this.camera, this.canvas);
        // // this.controls = new THREE.OrbitControls(this.camera);
        // this.controls.rotateSpeed = 1.0;
        // this.controls.zoomSpeed = 1.2;
        // this.controls.addEventListener('change', this.renderScene);
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

    createSimpleOrthographicCamera() {
        this.camera = new THREE.OrthographicCamera(window.innerWidth / -50, window.innerWidth / 50, window.innerHeight / 50, window.innerHeight / -50, 0.1, 1000);
        this.camera.position.set(0, 10, 30);
    }

    createSimplePerspectiveCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 30);
    }

    createSimplestCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(3, 3, 3);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    cameraSize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
    }

    //
    //
    // 3D RENDERING AND ANIMATION LOOP METHODS
    //
    //

    render(animateScene: Boolean) {

        const self: TestThreejs04Component = this;

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

        // window.addEventListener('load', this.initIt, false);
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

    animate() {
        this.cube.rotateX(0.01);
        this.cube.rotateY(0.01);
        // this.cube.position.addScalar(0.2);
    }

    // animateRisingLogo01() {
    //
    // }
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
        this.position = new THREE.VectorKeyframeTrack('.position', [2, 3.6, 4], [0, -30, 0, 0, 18, 0, 0, 16, 0], THREE.InterpolateSmooth);
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

    addDemoCube() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
    }

    addMappedObject01() {
        const loader = new THREE.TextureLoader();
        // loader.setCrossOrigin('*');
        loader.crossOrigin = "*";
        // loader.crossOrigin = "anonymous";
        loader.load(
            './assets/images/mongo.jpg',
            (texture) => {
                const materialFace = new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    emissive: 0x000000,
                    map: texture,
                    bumpMap: texture
                });
                const materialSide = new THREE.MeshBasicMaterial({
                    color: 0x222222
                });
                const geometry = new THREE.BoxGeometry(10, 10, 1);
                const cube = new THREE.Mesh(geometry, [
                    materialSide, materialSide,
                    materialSide, materialSide,
                    materialFace, materialFace
                ]);
                cube.position.set(0, 0, 0);
                cube.castShadow = true;
                this.cubeContainer.add(cube);
                // this.controls.target = cube.position.clone();
            },
            undefined,
            (err) => {
                console.log(err);
                throw err;
            }
        );
    }

    addText1() {
        const loader = new THREE.FontLoader();

        loader.load('./assets/fonts/helvetiker_regular.typeface.json', (font) => {

            const geometry = new THREE.TextGeometry('Hello World !', {
                font: font,
                size: 9, /* character size */
                height: 1, /* depth of the text */
                curveSegments: 16, /* subdivisions for curved elements in text */
                bevelEnabled: true,
                bevelThickness: 0.1, /* how deep goes the bevel in the depth of the text */
                bevelSize: 0.3, /* how wide goes the bevel on the text outline */
                bevelSegments: 6 /* subdivisions for bevel */
            });
            geometry.translate(-30, -10, 0); // x: left-right, y: up-down, z: forward-backward
            geometry.rotateX(-3.14 * 2 / 360 * 45); // around left-right axis
            geometry.rotateY(0); // around up-down axis
            geometry.rotateZ(0); // around backward-forward axis
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

    addMappedObject02() {
        const loader = new THREE.TextureLoader();
        // loader.setCrossOrigin('*');
        loader.crossOrigin = "*";
        // loader.crossOrigin = "anonymous";
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
                // this.controls.target = cube.position.clone();
            },
            undefined,
            (err) => {
                console.log(err);
                throw err;
            }
        );
    }

}

