import { ElementRef, Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'new-three-orbitcontrols-ts';
import * as STATS from 'stats-js';
import { PlaneGeometryCreated } from "./plane-geometry-created";

// import "three/examples/js/controls/OrbitControls";

export enum ShadowMapType {
    fine = THREE.PCFSoftShadowMap,
    basic = THREE.BasicShadowMap,
    advanced = THREE.PCFSoftShadowMap,
}

export enum MaterialRenderingType {
    basic = 'THREE.MeshBasicMaterial',
    depth = 'THREE.MeshDepthMaterial',
    lambert = 'THREE.MeshLambertMaterial',
    normal = 'THREE.MeshNormalMaterial',
    phong = 'THREE.MeshPhongMaterial',
    physical = 'THREE.MeshPhysicalMaterial',
    standard = 'THREE.MeshStandardMaterial',
    // toon = 'THREE.MeshToonMaterial', // TODO : implement Toon Material
}

@Injectable()
export class ThreePrimitivesService {

    scene3dContainer;
    statsContainer;

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

    raycaster;
    mouse;
    highlightObj;

    nextPositionX = 0;
    nextPositionY = 0;
    nextPositionZ = 0;

    playAnimationRisingLogo01 = true;

    constructor() {
        this.stats = new STATS();
        this.clock = new THREE.Clock();
    }

    prepareScene() {
        this.addEventListeners();
    }

    async buildScene() {
        this.createSceneWithShadowsAndFog(true, 0xFFFFFF, 0, 1000, 100);
        this.createSceneRendererWithShadow(0xFFFFFF, true, ShadowMapType.advanced);
        this.createSimpleCamera();
        this.createAllLights();
        this.addPolarGrid();
        // this.addFloor();
        this.prepareAnimationPath01();

        this.nextPositionX = 0;
        this.nextPositionY = 0;
        this.nextPositionZ = 0;

        console.log("then (0) ", this.nextPositionX);

        const planeGeometryCreated1: PlaneGeometryCreated = await this.addMappedObjectOnTile('./assets/images/MongoDB_Logo_only_FullColor_sq.png',
            null, 12, 1,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong,
            0xC56055, 0x666666, MaterialRenderingType.phong);
        console.log(planeGeometryCreated1);
        this.nextPositionX += planeGeometryCreated1.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (1) ", this.nextPositionX);

        const planeGeometryCreated2: PlaneGeometryCreated = await this.addMappedObjectOnTile('./assets/images/mongo.jpg',
            null, 12, 1,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong,
            0xC56055, 0x666666, MaterialRenderingType.phong);
        console.log(planeGeometryCreated2);
        this.nextPositionX += planeGeometryCreated2.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (2) ", this.nextPositionX);

        const planeGeometryCreated3: PlaneGeometryCreated = await this.addMappedObjectOnTile('./assets/images/MongoDB_Logo_only_FullColor_sq.png',
            null, 12, 1,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong,
            0xC56055, 0x666666, MaterialRenderingType.phong);
        console.log(planeGeometryCreated3);
        this.nextPositionX += planeGeometryCreated3.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (3) ", this.nextPositionX);

        const planeGeometryCreated4: PlaneGeometryCreated = await this.addMappedObjectOnTile('./assets/images/MongoDB_Logo_only_FullColor_sq.png',
            null, 12, 1,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong,
            0xC56055, 0x666666, MaterialRenderingType.phong);
        console.log(planeGeometryCreated4);
        this.nextPositionX += planeGeometryCreated4.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (4) ", this.nextPositionX);

    }

    async buildDemoScene1() {
        this.createSceneWithShadowsAndFog(true, 0xFFFFFF, 0, 1000, 100);
        this.createSceneRendererWithShadow(0xFFFFFF, true, ShadowMapType.advanced);
        this.createSimpleCamera();
        this.createAllLights();
        this.addPolarGrid();
        this.addFloor();
        this.prepareAnimationPath01();

        this.addDemoCube();

        this.addPhongCube(9, 3, 7, 0x4488FF, -4, 9, -4);


        this.addMappedObjectDemoOnTile('./assets/images/mongo.jpg', 0.04, 1,
            0, 0, -10,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong,
            0xFF6666, 0x333333, MaterialRenderingType.phong);

        this.addMappedObjectDemoFlatRectangle('./assets/images/mongo.jpg', 0.04,
            10, 0, -10,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong);

        this.addMappedObjectDemoOnTile('./assets/images/MongoDB_Logo_only_FullColor_sq.png', 0.005, 1,
            5, 0, 5,
            0x00FF00, 0x333333, MaterialRenderingType.phong,
            0xFFFF00, 0x333333, MaterialRenderingType.phong,
            0xFF0000, 0x333333, MaterialRenderingType.phong);

        this.addMappedObjectOnSphere('./assets/images/MongoDB_Logo_only_FullColor_sq.png', 5, 10, 1,
            -12, 0, 5,
            0x00FF00, 0x333333, MaterialRenderingType.phong,
            0xFFFF00, 0x333333, MaterialRenderingType.phong,
            0xFF0000, 0x333333, MaterialRenderingType.phong);

        this.addMappedObjectOnExtrudedHexagon('./assets/images/MongoDB_Logo_only_FullColor_sq.png', 5, 10, 1,
            0, 5, 0,
            0x00FF00, 0x333333, MaterialRenderingType.phong,
            0xFFFF00, 0x333333, MaterialRenderingType.phong,
            0xFF0000, 0x333333, MaterialRenderingType.phong);

        this.addMappedObjectOnExtrudedFlatDisk('./assets/images/MongoDB_Logo_only_FullColor_sq.png', 5, 10, 1,
            0, 5, -5,
            0x00FF00, 0x333333, MaterialRenderingType.phong,
            0xFFFF00, 0x333333, MaterialRenderingType.phong,
            0xFF0000, 0x333333, MaterialRenderingType.phong);

        this.addText1();
    }

    async buildDemoScene2() {
        this.createSceneWithShadowsAndFog(true, 0xFFFFFF, 0, 1000, 100);
        this.createSceneRendererWithShadow(0xFFFFFF, true, ShadowMapType.advanced);
        this.createSimpleCamera();
        this.createAllLights();
        this.addPolarGrid();
        this.addFloor();
        this.prepareAnimationPath01();

        this.nextPositionX = -0;
        this.nextPositionY = 0;
        this.nextPositionZ = 0;

        console.log("then (0) ", this.nextPositionX);

        const planeGeometryCreated1: PlaneGeometryCreated = await this.addMappedObjectFlatRectangle('./assets/images/MongoDB_Logo_only_FullColor_sq.png',
            null, 12,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong);
        console.log(planeGeometryCreated1);
        this.nextPositionX += planeGeometryCreated1.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (1) ", this.nextPositionX);

        const planeGeometryCreated2: PlaneGeometryCreated = await this.addMappedObjectFlatRectangle('./assets/images/mongo.jpg',
            null, 12,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong);
        console.log(planeGeometryCreated2);
        this.nextPositionX += planeGeometryCreated2.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (2) ", this.nextPositionX);

        const planeGeometryCreated3: PlaneGeometryCreated = await this.addMappedObjectFlatRectangle('./assets/images/MongoDB_Logo_only_FullColor_sq.png',
            null, 12,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong);
        console.log(planeGeometryCreated3);
        this.nextPositionX += planeGeometryCreated3.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (3) ", this.nextPositionX);

        const planeGeometryCreated4: PlaneGeometryCreated = await this.addMappedObjectFlatRectangle('./assets/images/MongoDB_Logo_only_FullColor_sq.png',
            null, 12,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong);
        console.log(planeGeometryCreated4);
        this.nextPositionX += planeGeometryCreated4.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (4) ", this.nextPositionX);

        const planeGeometryCreated5: PlaneGeometryCreated = await this.addMappedObjectSolidSphere('./assets/images/MongoDB_Logo_only_FullColor_sq.png',
            6, null, 12,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong);
        console.log(planeGeometryCreated5);
        this.nextPositionX += planeGeometryCreated5.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (5) ", this.nextPositionX);
    }

    async buildDemoScene3() {
        this.createSceneWithShadowsAndFog(true, 0xFFFFFF, 0, 1000, 100);
        this.createSceneRendererWithShadow(0xFFFFFF, true, ShadowMapType.advanced);
        this.createSimpleCamera();
        this.createAllLights();
        this.addPolarGrid();
        this.prepareAnimationPath01();

        this.nextPositionX = -0;
        this.nextPositionY = 0;
        this.nextPositionZ = 0;

        console.log("then (0) ", this.nextPositionX);

        const planeGeometryCreated1: PlaneGeometryCreated = await this.addMappedObjectFlatExtrudedRectangle('./assets/images/MongoDB_Logo_only_FullColor_sq.png',
            null, 12,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong);
        console.log(planeGeometryCreated1);
        this.nextPositionX += planeGeometryCreated1.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (1) ", this.nextPositionX);

        const planeGeometryCreated2: PlaneGeometryCreated = await this.addMappedObjectFlatExtrudedRectangle('./assets/images/mongo.jpg',
            null, 12,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong);
        console.log(planeGeometryCreated2);
        this.nextPositionX += planeGeometryCreated2.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (2) ", this.nextPositionX);

        const planeGeometryCreated3: PlaneGeometryCreated = await this.addMappedObjectFlatExtrudedRectangle('./assets/images/MongoDB_Logo_only_FullColor_sq.png',
            null, 12,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong);
        console.log(planeGeometryCreated3);
        this.nextPositionX += planeGeometryCreated3.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (3) ", this.nextPositionX);

        const planeGeometryCreated4: PlaneGeometryCreated = await this.addMappedObjectFlatExtrudedRectangle('./assets/images/MongoDB_Logo_only_FullColor_sq.png',
            null, 12,
            this.nextPositionX, this.nextPositionY, this.nextPositionZ,
            0x5C92F9, 0x333333, MaterialRenderingType.phong,
            0xD2032F, 0x333333, MaterialRenderingType.phong);
        console.log(planeGeometryCreated4);
        this.nextPositionX += planeGeometryCreated4.finalWidth + 1;
        this.nextPositionY += 0;
        this.nextPositionZ += 0;

        console.log("then (4) ", this.nextPositionX);
    }

    postProcessScene(element3dSceneRef, elementStatsRef) {
        this.createOrbitControls();
        this.renderedSize();
        this.attachSceneToHTML(element3dSceneRef, elementStatsRef);
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

    attachSceneToHTML(element3dSceneRef, elementStatsRef) {

        this.scene3dContainer = element3dSceneRef.nativeElement; // this.element3dSceneRef.nativeElement;
        this.statsContainer = elementStatsRef.nativeElement; // this.elementStatsRef.nativeElement;
        this.canvas = this.renderer.domElement;
        this.scene3dContainer.appendChild(this.canvas);
        this.statsContainer.appendChild(this.stats.domElement);
    }

    createSceneWithShadowsAndFog(withAxisHelper: Boolean, fogColor = 0xFFFFFF, near = 0, far = 750, axisHelperSize = 20) {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(fogColor, near, far);
        if (withAxisHelper) {
            this.scene.add(new THREE.AxisHelper(axisHelperSize));
        }
    }

    createSimpleScene(withAxisHelper: Boolean, axisHelperSize = 20) {
        this.scene = new THREE.Scene();
        if (withAxisHelper) {
            this.scene.add(new THREE.AxisHelper(axisHelperSize));
        }
    }

    /*
    ############# CREATE A RENDERER
    */

    createSimpleSceneRenderer(clearColor = 0xFFFFFF) {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(clearColor);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    createSceneRendererWithShadow(clearColor = 0xFFFFFF, setShadowEnabled = true, shadowMapType: ShadowMapType = ShadowMapType.basic) {
        this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true, alpha: true});
        this.renderer.setClearColor(clearColor);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = setShadowEnabled;
        this.renderer.shadowMapType = shadowMapType;
    }

    //
    //
    // ORBIT CONTROLS METHODS
    //
    //

    createOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.rotateSpeed = 1.0;
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 1.2;
        this.controls.minZoom = 0.1;
        this.controls.maxZoom = 100;
        // this.controls.addEventListener('change', this.renderScene);
    }

    //
    //
    // LIGHT METHODS
    //
    //

    createAmbientLight(lightColor = 0x666666) {
        const ambientLight = new THREE.AmbientLight(lightColor);
        this.scene.add(ambientLight);
    }

    createDirectionalLight(lightPosX = 0.5, lightPosY = 1, lightPosZ = 0, lightColor = 0xAAAAAA, intensity = 0.7,
                           near = -30, shadowCameraLeft = -60, shadowCameraBottom = -60, shadowCameraRight = 60,
                           shadowCameraTop = 60) {
        this.light = new THREE.DirectionalLight(lightColor, intensity);
        this.light.position.set(lightPosX, lightPosY, lightPosZ);
        this.light.castShadow = true;
        this.light.shadow.camera.near = near;
        this.light.shadow.camera.left = shadowCameraLeft;
        this.light.shadow.camera.bottom = shadowCameraBottom;
        this.light.shadow.camera.right = shadowCameraRight;
        this.light.shadow.camera.top = shadowCameraTop;
        this.scene.add(this.light);
    }

    createFrontLight(lightColor = 0xAAAAAA, intensity = 0.8, distance = 100) {
        this.frontLight = new THREE.PointLight(lightColor, intensity, distance);
        this.scene.add(this.frontLight);
    }

    createAllLights() {
        this.createAmbientLight();
        this.createDirectionalLight(0.5, 1, 0, 0xAAAAAA, 0.7);
        this.createDirectionalLight(-0.5, 1, 0.1, 0xAAAAAA, 0.2);
        this.createFrontLight();
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
        this.floor.position.y = -0.1;
        this.scene.add(this.floor);
    }

    addPolarGrid() {
        const radius = 60;
        const radials = 16;
        const circles = 24;
        const divisions = 256;

        const helper = new THREE.PolarGridHelper(radius, radials, circles, divisions);
        this.scene.add(helper);
    }

    //
    //
    // CAMERA METHODS
    //
    //

    createSimpleCamera(cameraX = 0, cameraY = 0, cameraZ = 30, fieldOfView = 75, near = 0.1, far = 1000) {
        this.camera = new THREE.PerspectiveCamera(fieldOfView, window.innerWidth / window.innerHeight, near, far);
        this.camera.position.set(cameraX, cameraY, cameraZ);
    }

    createSimpleOrthographicCamera(cameraX = 0, cameraY = 10, cameraZ = 30, caleraLeft = window.innerWidth / -50,
                                   cameraRight = window.innerWidth / 50, cameraTop = window.innerHeight / 50,
                                   cameraBottom = window.innerHeight / -50, near = 0.1, far = 1000) {
        this.camera = new THREE.OrthographicCamera(caleraLeft, cameraRight, cameraTop, cameraBottom, near, far);
        this.camera.position.set(cameraX, cameraY, cameraZ);
    }

    createSimplePerspectiveCamera(cameraX = 0, cameraY = 0, cameraZ = 30, fieldOfView = 75, near = 0.1, far = 1000) {
        this.camera = new THREE.PerspectiveCamera(fieldOfView, window.innerWidth / window.innerHeight, near, far);
        this.camera.position.set(cameraX, cameraY, cameraZ);
    }

    createSimplestCamera(cameraX = 3, cameraY = 3, cameraZ = 3, lookAtX = 0, lookAtY = 0, lookAtZ = 0, fieldOfView = 75, near = 0.1, far = 1000) {
        this.camera = new THREE.PerspectiveCamera(fieldOfView, window.innerWidth / window.innerHeight, near, far);
        this.camera.position.set(cameraX, cameraY, cameraZ);
        this.camera.lookAt(new THREE.Vector3(lookAtX, lookAtY, lookAtZ));
    }

    cameraSize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
    }

    createMouseRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        window.addEventListener( 'mousemove', e => {
            this.mouse.x = ( ( e.clientX - this.canvas.offsetLeft ) / this.canvas.clientWidth ) * 2 - 1;
            this.mouse.y = - ( ( e.clientY - this.canvas.offsetTop ) / this.canvas.clientHeight ) * 2 + 1;
        }, false );
    }

    //
    //
    // 3D RENDERING AND ANIMATION LOOP METHODS
    //
    //

    render(animateScene: Boolean) {
        if (animateScene) {
            const render = () => {
                requestAnimationFrame(render);
                this.renderScene();
                this.animate();
            };
        } else {
            this.renderScene();
        }
    }

    renderScene() {
        if (this.raycaster) {
            this.hoverEffect();
        }
        this.stats.update();
        this.renderer.render(this.scene, this.camera);
    }

    renderedSize() {
        this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    }

    hoverEffect() {
        this.raycaster.setFromCamera( this.mouse, this.camera );
        if (this.highlightObj) {
            const selectedObject = this.scene.getObjectByName('highlightObj');
            if (selectedObject) {
                selectedObject.parent.remove( selectedObject );
            }
        }
        const intersects = this.raycaster.intersectObjects( this.scene.children, true );
        for (let i = 0; i < intersects.length; i++) {
            const intersect = intersects[i];
            if (intersect.object instanceof THREE.Mesh) {
                const obj: THREE.Mesh = intersect.object;
                this.highlightObj = new THREE.Mesh(obj.geometry.clone(), new THREE.MeshBasicMaterial({
                    side: THREE.BackSide,
                    color: 'blue'
                }));
                this.highlightObj.scale.multiplyScalar(1.05);
                const objPos = obj.position.clone();
                this.highlightObj.position.set(objPos.x, objPos.y, objPos.z);
                this.highlightObj.name = 'highlightObj';
                obj.parent.add( this.highlightObj );
                break;
            }
        }
    }

    //
    //
    // EVENTS METHODS
    //
    //

    addEventListeners() {

        // window.addEventListener('load', this.initIt, false);
        window.addEventListener('resize', () => this.onWindowResize());

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

    playAnimation() {
        this.playAnimationRisingLogo01 = true;
    }

    pauseAnimation() {
        this.playAnimationRisingLogo01 = false;
    }

    toggleAnimation() {
        this.playAnimationRisingLogo01 = !this.playAnimationRisingLogo01;
    }

    animate() {
        this.cube.rotateX(0.01);
        this.cube.rotateY(0.01);
        // this.cube.position.addScalar(0.2);
    }

    executeAnimateRisingLogo01 = () => {
        requestAnimationFrame(this.executeAnimateRisingLogo01);
        if (this.playAnimationRisingLogo01) {
            const delta = this.clock.getDelta();
            this.cubeContainer.rotation.y += 0.004;
            this.controls.update();
            if (this.mixer) {
                this.mixer.update(delta);
            }
            this.frontLight.position.set(this.camera.position.clone());
            this.renderScene();
        }
        // tslint:disable-next-line:semicolon
    };

    prepareAnimationPath01() {
        this.cubeContainer = new THREE.Object3D();
        this.scene.add(this.cubeContainer);
        // create an animation sequence with the tracks
        // If a negative time value is passed, the duration will be calculated from the times of the passed tracks array
        this.position = new THREE.VectorKeyframeTrack('.position',
            [ // Keyframes
                2, // 1
                3.6, // 2
                4 // 3
            ], [ // Position X, Y, Z on keyframes
                0, -30, 0, // 1
                0, 2, 0, // 2
                0, 0, 0 // 3
            ], THREE.InterpolateSmooth);
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
        this.geometry = new THREE.BoxGeometry(6, 6, 6);
        this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
    }

    addBasicCube(width = 1, height = 1, depth = 1, color = 0x00FF00, posX = -4, posY = 2, posZ = -4) {
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        this.material = new THREE.MeshBasicMaterial({color: color});
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.set(posX, posY, posZ);
        this.scene.add(this.cube);
    }

    addPhongCube(width = 1, height = 1, depth = 1, color = 0x00FF00, posX = -4, posY = 2, posZ = -4) {
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        this.material = new THREE.MeshPhongMaterial({color: color});
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.set(posX, posY, posZ);
        this.cube.castShadow = true;
        this.cube.receiveShadow = true;
        this.scene.add(this.cube);
    }

    getMaterial(materialType: MaterialRenderingType = MaterialRenderingType.phong, materialColor = 0xFFFFFF,
                materialEmissivity = 0x000000, mapTexture, bumpMapTexture) {
        switch (materialType) {
            case MaterialRenderingType.phong:
                return new THREE.MeshPhongMaterial({
                    color: materialColor,
                    emissive: materialEmissivity,
                    map: mapTexture,
                    bumpMap: bumpMapTexture
                });
            case MaterialRenderingType.physical:
                return new THREE.MeshPhysicalMaterial({
                    color: materialColor,
                    emissive: materialEmissivity,
                    map: mapTexture,
                    bumpMap: bumpMapTexture
                });
            case MaterialRenderingType.normal:
                return new THREE.MeshNormalMaterial();
            case MaterialRenderingType.standard:
                return new THREE.MeshStandardMaterial({
                    color: materialColor,
                    emissive: materialEmissivity,
                    map: mapTexture,
                    bumpMap: bumpMapTexture
                });
            case MaterialRenderingType.lambert:
                return new THREE.MeshLambertMaterial({
                    color: materialColor,
                    emissive: materialEmissivity,
                    map: mapTexture,
                });
            case MaterialRenderingType.depth:
                return new THREE.MeshDepthMaterial();
            case MaterialRenderingType.basic:
                return new THREE.MeshBasicMaterial({
                    color: materialColor,
                    map: mapTexture,
                });
            default:
                return new THREE.MeshPhongMaterial({
                    color: materialColor,
                    emissive: materialEmissivity,
                    map: mapTexture,
                    bumpMap: bumpMapTexture
                });
        }
    }

    addMappedObjectOnSphere(imageURL: string = './assets/images/mongo.jpg',
                            imgWidth: number = 10, imgHeight: number = 10, tileDepth: number = 1,
                            posX: number = 0, posY: number = 0, posZ: number = 0,
                            faceMaterialColor = 0xFFFFFF, faceMaterialEmissivity = 0x000000,
                            faceMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                            backMaterialColor = 0xD2BE49, backMaterialEmissivity = 0x000000,
                            backMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                            sideMaterialColor = 0xFF6666, sideMaterialEmissivity = 0x000000,
                            sideMaterialType: MaterialRenderingType = MaterialRenderingType.phong) {
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "*";
        // loader.crossOrigin = "anonymous";
        loader.load(
            imageURL,
            (texture) => {
                console.log(texture);
                const materialFace = this.getMaterial(faceMaterialType, faceMaterialColor, faceMaterialEmissivity, texture, texture);
                const materialBack = this.getMaterial(backMaterialType, backMaterialColor, backMaterialEmissivity, null, null);
                const materialSide = this.getMaterial(sideMaterialType, sideMaterialColor, sideMaterialEmissivity, null, null);
                const geometry = new THREE.SphereGeometry(10, 64, 64);
                geometry.scale(0.1, 1, 1);
                const cube = new THREE.Mesh(geometry, [
                    materialFace, materialSide,
                    materialSide, materialSide,
                    materialFace, materialBack
                ]);
                cube.position.set(posX, posY, posZ);
                cube.castShadow = true;
                cube.receiveShadow = true;
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

    addMappedObjectOnExtrudedHexagon(imageURL: string = './assets/images/mongo.jpg',
                                     imgWidth: number = 10, imgHeight: number = 10, tileDepth: number = 1,
                                     posX: number = 0, posY: number = 0, posZ: number = 0,
                                     faceMaterialColor = 0xFFFFFF, faceMaterialEmissivity = 0x000000,
                                     faceMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                                     backMaterialColor = 0xD2BE49, backMaterialEmissivity = 0x000000,
                                     backMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                                     sideMaterialColor = 0xFF6666, sideMaterialEmissivity = 0x000000,
                                     sideMaterialType: MaterialRenderingType = MaterialRenderingType.phong) {
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "*";
        // loader.crossOrigin = "anonymous";
        loader.load(
            imageURL,
            (texture) => {
                console.log(texture);
                const materialFace = this.getMaterial(MaterialRenderingType.basic, faceMaterialColor, faceMaterialEmissivity, texture, texture);
                const materialBack = this.getMaterial(backMaterialType, backMaterialColor, backMaterialEmissivity, null, null);
                const materialSide = this.getMaterial(sideMaterialType, sideMaterialColor, sideMaterialEmissivity, null, null);

                const Pi = 3.14159, twoPi = 2 * 3.14159, iMax = 5, twoIMax = 2 * iMax, phi0 = Pi / twoIMax;
                const shape = new THREE.Shape();
                const fx = (i) => {
                    return 10 * Math.cos((i / iMax) * twoPi + phi0);
                };
                const fy = (i) => {
                    return 10 * Math.sin((i / iMax) * twoPi + phi0);
                };
                shape.moveTo(fx(0), fy(0));
                for (let i = 1; i < iMax; i++) {
                    shape.lineTo(fx(i), fy(i));
                }
                shape.lineTo(fx(0), fy(0));
                const extrudeSettings = {
                    steps: 3,
                    amount: 3,
                    bevelEnabled: true,
                    bevelThickness: 1,
                    bevelSize: 2,
                    bevelSegments: 2
                };
                const geometryExtr = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                const material = new THREE.MeshPhongMaterial({color: 0xff0000, map: texture});
                const mesh = new THREE.Mesh(geometryExtr, [materialFace, materialSide]);
                // const geometry = new THREE.SphereGeometry(10, 64, 64);
                // geometry.scale(0.1, 1, 1);
                // const cube = new THREE.Mesh(geometryExtr, [
                //     materialFace
                // ]);
                mesh.position.set(posX, posY, posZ);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                this.cubeContainer.add(mesh);
                // this.controls.target = cube.position.clone();
            },
            undefined,
            (err) => {
                console.log(err);
                throw err;
            }
        );
    }

    addMappedObjectOnExtrudedFlatDisk(imageURL: string = './assets/images/mongo.jpg',
                                      imgWidth: number = 10, imgHeight: number = 10, tileDepth: number = 1,
                                      posX: number = 0, posY: number = 0, posZ: number = 0,
                                      faceMaterialColor = 0xFFFFFF, faceMaterialEmissivity = 0x000000,
                                      faceMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                                      backMaterialColor = 0xD2BE49, backMaterialEmissivity = 0x000000,
                                      backMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                                      sideMaterialColor = 0xFF6666, sideMaterialEmissivity = 0x000000,
                                      sideMaterialType: MaterialRenderingType = MaterialRenderingType.phong) {
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "*";
        // loader.crossOrigin = "anonymous";
        loader.load(
            imageURL,
            (texture) => {
                console.log(texture);
                const materialFace = this.getMaterial(MaterialRenderingType.phong, faceMaterialColor, faceMaterialEmissivity, texture, texture);
                const materialBack = this.getMaterial(backMaterialType, backMaterialColor, backMaterialEmissivity, null, null);
                const materialSide = this.getMaterial(sideMaterialType, sideMaterialColor, sideMaterialEmissivity, null, null);

                const Pi = 3.14159;
                const geometryExtr = new THREE.CircleGeometry(12, 64);
                const mesh = new THREE.Mesh(geometryExtr, materialFace);
                // const geometry = new THREE.SphereGeometry(10, 64, 64);
                // geometry.scale(0.1, 1, 1);
                // const cube = new THREE.Mesh(geometryExtr, [
                //     materialFace
                // ]);
                mesh.position.set(posX, posY, posZ);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                this.cubeContainer.add(mesh);
                const mesh2 = new THREE.Mesh(geometryExtr, materialBack);
                mesh2.position.set(posX, posY, posZ);
                mesh2.castShadow = true;
                mesh2.receiveShadow = true;
                mesh2.rotateY(Pi);
                this.cubeContainer.add(mesh2);
            },
            undefined,
            (err) => {
                console.log(err);
                throw err;
            }
        );
    }

    addMappedObjectDemoFlatRectangle(imageURL: string = './assets/images/mongo.jpg',
                                     scale: number = 0.1,
                                     posX: number = 0, posY: number = 0, posZ: number = 0,
                                     faceMaterialColor = 0xFFFFFF, faceMaterialEmissivity = 0x000000,
                                     faceMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                                     backMaterialColor = 0xD2BE49, backMaterialEmissivity = 0x000000,
                                     backMaterialType: MaterialRenderingType = MaterialRenderingType.phong) {
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "*";
        loader.load(
            imageURL,
            (texture) => {
                console.log(texture);
                const materialFace = this.getMaterial(MaterialRenderingType.phong, faceMaterialColor, faceMaterialEmissivity, texture, texture);
                const materialBack = this.getMaterial(backMaterialType, backMaterialColor, backMaterialEmissivity, null, null);
                const geometry = new THREE.PlaneGeometry(texture.image.width * scale, texture.image.height * scale, 16);
                const mesh = new THREE.Mesh(geometry, materialFace);
                mesh.position.set(posX, posY, posZ);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                this.cubeContainer.add(mesh);
                const mesh2 = new THREE.Mesh(geometry, materialBack);
                mesh2.position.set(posX, posY, posZ);
                mesh2.castShadow = true;
                mesh2.receiveShadow = true;
                mesh2.rotateY(3.14159);
                this.cubeContainer.add(mesh2);
            },
            undefined,
            (err) => {
                console.log(err);
                throw err;
            }
        );
    }

    async addMappedObjectFlatExtrudedRectangleAsync(imageURL: string = './assets/images/mongo.jpg',
                                                    targetWidth: number = 4, targetHeight: number = 4,
                                                    posX: number = 0, posY: number = 0, posZ: number = 0,
                                                    faceMaterialColor = 0xFFFFFF, faceMaterialEmissivity = 0x000000,
                                                    faceMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                                                    backMaterialColor = 0xD2BE49, backMaterialEmissivity = 0x000000,
                                                    backMaterialType: MaterialRenderingType = MaterialRenderingType.phong) {
        const planeGeometryCreated: PlaneGeometryCreated = await this.addMappedObjectFlatExtrudedRectangle(imageURL, targetWidth, targetHeight, posX, posY, posZ,
            faceMaterialColor, faceMaterialEmissivity, faceMaterialType, backMaterialColor, backMaterialEmissivity, backMaterialType);
        return planeGeometryCreated;
    }

    addMappedObjectDemoOnTile(imageURL: string = './assets/images/mongo.jpg',
                              scale: number = 0.05, tileDepth: number = 1,
                              posX: number = 0, posY: number = 0, posZ: number = 0,
                              faceMaterialColor = 0xFFFFFF, faceMaterialEmissivity = 0x000000,
                              faceMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                              backMaterialColor = 0xD2BE49, backMaterialEmissivity = 0x000000,
                              backMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                              sideMaterialColor = 0xFF6666, sideMaterialEmissivity = 0x000000,
                              sideMaterialType: MaterialRenderingType = MaterialRenderingType.phong) {
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "*";
        // loader.crossOrigin = "anonymous";
        loader.load(
            imageURL,
            (texture) => {
                console.log(texture);
                const materialFace = this.getMaterial(faceMaterialType, faceMaterialColor, faceMaterialEmissivity, texture, texture);
                const materialBack = this.getMaterial(backMaterialType, backMaterialColor, backMaterialEmissivity, null, null);
                const materialSide = this.getMaterial(sideMaterialType, sideMaterialColor, sideMaterialEmissivity, null, null);
                const geometry = new THREE.BoxGeometry(texture.image.width * scale, texture.image.height * scale, tileDepth);
                const cube = new THREE.Mesh(geometry, [
                    materialSide, materialSide,
                    materialSide, materialSide,
                    materialFace, materialBack
                ]);
                cube.position.set(posX, posY, posZ);
                cube.castShadow = true;
                cube.receiveShadow = true;
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

    getFinalDimensionsFromTexture(targetWidth: number, targetHeight: number, threeJsTexture) {
        const resultingPlaneGeometryCreated = new PlaneGeometryCreated();
        let finalWidth = 0, finalHeight = 0;
        if (targetHeight != null) {
            finalWidth = threeJsTexture.image.width * (targetHeight / threeJsTexture.image.height);
            finalHeight = targetHeight;
        } else if (targetWidth != null) {
            finalWidth = targetWidth;
            finalHeight = threeJsTexture.image.height * (targetWidth / threeJsTexture.image.width);
        }
        resultingPlaneGeometryCreated.finalWidth = finalWidth;
        resultingPlaneGeometryCreated.finalHeight = finalHeight;
        resultingPlaneGeometryCreated.imageWidth = threeJsTexture.image.width;
        resultingPlaneGeometryCreated.imageHeight = threeJsTexture.image.height;
        return resultingPlaneGeometryCreated;
    }

    addMappedObjectOnTile(imageURL: string = './assets/images/mongo.jpg',
                          targetWidth: number = 4, targetHeight: number = 4, tileDepth: number = 1,
                          posX: number = 0, posY: number = 0, posZ: number = 0,
                          faceMaterialColor = 0xFFFFFF, faceMaterialEmissivity = 0x000000,
                          faceMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                          backMaterialColor = 0xD2BE49, backMaterialEmissivity = 0x000000,
                          backMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                          sideMaterialColor = 0xFF6666, sideMaterialEmissivity = 0x000000,
                          sideMaterialType: MaterialRenderingType = MaterialRenderingType.phong): Promise<PlaneGeometryCreated> {
        return new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            loader.crossOrigin = "*";
            // loader.crossOrigin = "anonymous";
            loader.load(
                imageURL,
                (texture) => {
                    const materialFace = this.getMaterial(faceMaterialType, faceMaterialColor, faceMaterialEmissivity, texture, texture);
                    const materialBack = this.getMaterial(backMaterialType, backMaterialColor, backMaterialEmissivity, null, null);
                    const materialSide = this.getMaterial(sideMaterialType, sideMaterialColor, sideMaterialEmissivity, null, null);
                    const resultingPlaneGeometryCreated = this.getFinalDimensionsFromTexture(targetWidth, targetHeight, texture);
                    const geometry = new THREE.BoxGeometry(resultingPlaneGeometryCreated.finalWidth, resultingPlaneGeometryCreated.finalHeight, tileDepth, 1, 1, 1);
                    const finalPosX = posX + (resultingPlaneGeometryCreated.finalWidth / 2);
                    const finalPosY = posY + (resultingPlaneGeometryCreated.finalHeight / 2);
                    const finalPosZ = posZ;
                    const cube = new THREE.Mesh(geometry, [
                        materialSide, materialSide,
                        materialSide, materialSide,
                        materialFace, materialBack
                    ]);
                    cube.position.set(finalPosX, finalPosY, finalPosZ);
                    cube.castShadow = true;
                    cube.receiveShadow = true;
                    this.cubeContainer.add(cube);
                    return resolve(resultingPlaneGeometryCreated);
                },
                undefined,
                (err) => {
                    console.log(err);
                    // throw err;
                    const errGeometryPlanned = new PlaneGeometryCreated();
                    errGeometryPlanned.isErr = true;
                    errGeometryPlanned.isOK = false;
                    errGeometryPlanned.err = err;
                    return reject(errGeometryPlanned);
                }
            );
        });
    }

    addMappedObjectFlatExtrudedRectangle(imageURL: string = './assets/images/mongo.jpg',
                                         targetWidth: number = 4, targetHeight: number = 4,
                                         posX: number = 0, posY: number = 0, posZ: number = 0,
                                         faceMaterialColor = 0xFFFFFF, faceMaterialEmissivity = 0x000000,
                                         faceMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                                         backMaterialColor = 0xD2BE49, backMaterialEmissivity = 0x000000,
                                         backMaterialType: MaterialRenderingType = MaterialRenderingType.phong): Promise<PlaneGeometryCreated> {
        return new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            loader.crossOrigin = "*";
            loader.load(
                imageURL,
                (texture) => {
                    const materialFace = this.getMaterial(faceMaterialType, faceMaterialColor, faceMaterialEmissivity, texture, texture);
                    const materialBack = this.getMaterial(backMaterialType, backMaterialColor, backMaterialEmissivity, null, null);
                    const resultingPlaneGeometryCreated = this.getFinalDimensionsFromTexture(targetWidth, targetHeight, texture);
                    const geometry = new THREE.PlaneGeometry(resultingPlaneGeometryCreated.finalWidth, resultingPlaneGeometryCreated.finalHeight, 1, 1);

                    const Pi = 3.14159, twoPi = 2 * 3.14159, iMax = 4, twoIMax = 2 * iMax, phi0 = Pi / twoIMax;
                    const radiusX = 4;
                    const radiusY = 4;
                    const shape = new THREE.Shape();
                    const fx = (i) => {
                        return radiusX * Math.cos((i / iMax) * twoPi + phi0);
                    };
                    const fy = (i) => {
                        return radiusY * Math.sin((i / iMax) * twoPi + phi0);
                    };
                    shape.moveTo(fx(0), fy(0));
                    for (let i = 1; i < iMax; i++) {
                        shape.lineTo(fx(i), fy(i));
                    }
                    shape.lineTo(fx(0), fy(0));
                    const extrudeSettings = {
                        steps: 1,
                        amount: 1,
                        bevelEnabled: true,
                        bevelThickness: 1,
                        bevelSize: 2,
                        bevelSegments: 6,
                        material: 0,
                        extrudeMaterial: 1,
                    };
                    const geometryExtr = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                    geometryExtr.rotateZ(Pi / 8);
                    const finalPosX = posX + (resultingPlaneGeometryCreated.finalWidth / 2);
                    const finalPosY = posY + (resultingPlaneGeometryCreated.finalHeight / 2);
                    const finalPosZ = posZ;
                    // geometryExtr.translate(finalPosX, finalPosY, finalPosZ);

                    const mesh = new THREE.Mesh(geometryExtr, [materialFace, materialBack]);
                    mesh.position.set(finalPosX, finalPosY, finalPosZ);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    this.cubeContainer.add(mesh);

                    return resolve(resultingPlaneGeometryCreated);
                },
                undefined,
                (err) => {
                    console.log(err);
                    // throw err;
                    const errGeometryPlanned = new PlaneGeometryCreated();
                    errGeometryPlanned.isErr = true;
                    errGeometryPlanned.isOK = false;
                    errGeometryPlanned.err = err;
                    return reject(errGeometryPlanned);
                }
            );
        });
    }

    copyCanvas(elementImgRef: ElementRef, elementImgLinkRef: ElementRef, showImageShot: boolean) {
        const imgData = this.renderer.domElement.toDataURL("image/png");

        if (showImageShot) {
            // create a new image and add to the document
            elementImgRef.nativeElement.src = imgData;
        }

        // alternative way, which downloads the image
        elementImgLinkRef.nativeElement.href = imgData; // .replace("image/png", "image/octet-stream");
        elementImgLinkRef.nativeElement.download = 'capture.png';
        elementImgLinkRef.nativeElement.click();
    }

    addMappedObjectSolidSphere(imageURL: string = './assets/images/mongo.jpg',
                               radius = 1, targetWidth: number = 4, targetHeight: number = 4,
                               posX: number = 0, posY: number = 0, posZ: number = 0,
                               faceMaterialColor = 0xFFFFFF, faceMaterialEmissivity = 0x000000,
                               faceMaterialType: MaterialRenderingType = MaterialRenderingType.phong): Promise<PlaneGeometryCreated> {
        return new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            loader.crossOrigin = "*";
            loader.load(
                imageURL,
                (texture) => {
                    const materialFace = this.getMaterial(faceMaterialType, faceMaterialColor, faceMaterialEmissivity, texture, texture);
                    const resultingPlaneGeometryCreated = this.getFinalDimensionsFromTexture(targetWidth, targetHeight, texture);
                    const geometry = new THREE.SphereBufferGeometry(radius, 64, 64);

                    const finalPosX = posX + (radius / 2);
                    const finalPosY = posY + (radius / 2);
                    const finalPosZ = posZ;

                    const mesh = new THREE.Mesh(geometry, materialFace);
                    mesh.position.set(finalPosX, finalPosY, finalPosZ);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    this.cubeContainer.add(mesh);

                    const edges = new THREE.EdgesGeometry(geometry, 0.3);
                    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xff0000}));
                    line.position.set(finalPosX, finalPosY, finalPosZ);
                    this.cubeContainer.add(line);

                    return resolve(resultingPlaneGeometryCreated);
                },
                undefined,
                (err) => {
                    console.log(err);
                    // throw err;
                    const errGeometryPlanned = new PlaneGeometryCreated();
                    errGeometryPlanned.isErr = true;
                    errGeometryPlanned.isOK = false;
                    errGeometryPlanned.err = err;
                    return reject(errGeometryPlanned);
                }
            );
        });
    }

    addMappedObjectFlatRectangle(imageURL: string = './assets/images/mongo.jpg',
                                 targetWidth: number = 4, targetHeight: number = 4,
                                 posX: number = 0, posY: number = 0, posZ: number = 0,
                                 faceMaterialColor = 0xFFFFFF, faceMaterialEmissivity = 0x000000,
                                 faceMaterialType: MaterialRenderingType = MaterialRenderingType.phong,
                                 backMaterialColor = 0xD2BE49, backMaterialEmissivity = 0x000000,
                                 backMaterialType: MaterialRenderingType = MaterialRenderingType.phong): Promise<PlaneGeometryCreated> {
        return new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            loader.crossOrigin = "*";
            loader.load(
                imageURL,
                (texture) => {
                    const materialFace = this.getMaterial(faceMaterialType, faceMaterialColor, faceMaterialEmissivity, texture, texture);
                    const materialBack = this.getMaterial(backMaterialType, backMaterialColor, backMaterialEmissivity, null, null);
                    const resultingPlaneGeometryCreated = this.getFinalDimensionsFromTexture(targetWidth, targetHeight, texture);
                    const geometry = new THREE.PlaneGeometry(resultingPlaneGeometryCreated.finalWidth, resultingPlaneGeometryCreated.finalHeight, 1, 1);

                    const finalPosX = posX + (resultingPlaneGeometryCreated.finalWidth / 2);
                    const finalPosY = posY + (resultingPlaneGeometryCreated.finalHeight / 2);
                    const finalPosZ = posZ;
                    const mesh = new THREE.Mesh(geometry, materialFace);
                    mesh.position.set(finalPosX, finalPosY, finalPosZ);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    this.cubeContainer.add(mesh);

                    const mesh2 = new THREE.Mesh(geometry, materialBack);
                    mesh2.position.set(finalPosX, finalPosY, finalPosZ);
                    mesh2.castShadow = true;
                    mesh2.receiveShadow = true;
                    mesh2.rotateY(3.14159);
                    this.cubeContainer.add(mesh2);

                    return resolve(resultingPlaneGeometryCreated);
                },
                undefined,
                (err) => {
                    console.log(err);
                    // throw err;
                    const errGeometryPlanned = new PlaneGeometryCreated();
                    errGeometryPlanned.isErr = true;
                    errGeometryPlanned.isOK = false;
                    errGeometryPlanned.err = err;
                    return reject(errGeometryPlanned);
                }
            );
        });
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
                const materialSide = new THREE.MeshPhongMaterial({
                    color: 0xFF9999
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
                const materialSide = new THREE.MeshPhongMaterial({
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
