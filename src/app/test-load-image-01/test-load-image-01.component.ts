import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-test-load-image-01',
    templateUrl: './test-load-image-01.component.html',
    styleUrls: ['./test-load-image-01.component.css']
})
export class TestLoadImage01Component implements OnInit {

    // Ref :
    //  http://blog.brecht.io/safe-image-requests-in-angular/
    //  https://stackoverflow.com/questions/45530752/getting-image-from-api-in-angular-4

    img = {
        src: './assets/images/mongo.jpg'
    };

    constructor() {
    }

    ngOnInit() {
    }

}
