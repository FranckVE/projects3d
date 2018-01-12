import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThreePrimitivesService } from "../appServices/three-primitives.service";
import { showWarningOnce } from "tslint/lib/error";

@Component({
    selector: 'app-test-threejs-05',
    templateUrl: './test-threejs-05.component.html',
    styleUrls: ['./test-threejs-05.component.css']
})
export class TestThreejs05Component implements OnInit {

    @ViewChild('containerel') element3dSceneRef: ElementRef;
    @ViewChild('statsel') elementStatsRef: ElementRef;
    @ViewChild('imgsel') elementImgRef: ElementRef;
    @ViewChild('imglinksel') elementImgLinkRef: ElementRef;
    private scene3dContainer: HTMLElement;
    private statsContainer: HTMLElement;
    private imgContainer: HTMLElement;

    private showImageShot = false;

    constructor(private threePrimitiveService: ThreePrimitivesService) {
    }

    ngOnInit() {
        const self: TestThreejs05Component = this;
        this.threePrimitiveService.prepareScene();

        this.threePrimitiveService.buildScene();
        // this.threePrimitiveService.buildDemoScene1();
        // this.threePrimitiveService.buildDemoScene2();
        // this.threePrimitiveService.buildDemoScene3();

        this.threePrimitiveService.postProcessScene(this.element3dSceneRef, this.elementStatsRef);

        this.threePrimitiveService.createMouseRaycaster();
    }

    onDownload3DCapture() {
        this.threePrimitiveService.copyCanvas(this.elementImgRef, this.elementImgLinkRef, this.showImageShot);
    }

    onPlayAnimation() {
        this.threePrimitiveService.playAnimation();
    }

    onPauseAnimation() {
        this.threePrimitiveService.pauseAnimation();
    }

    onToggleAnimation() {
        this.threePrimitiveService.toggleAnimation();
    }

}
