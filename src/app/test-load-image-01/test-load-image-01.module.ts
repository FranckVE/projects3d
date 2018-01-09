import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestLoadImage01Component } from './test-load-image-01.component';
import { TestLoadImage01RoutingModule } from "./test-load-image-01-routing.module";

@NgModule({
    imports: [
        CommonModule,
        TestLoadImage01RoutingModule,
    ],
    exports: [
        TestLoadImage01Component,
    ],
    declarations: [TestLoadImage01Component]
})
export class TestLoadImage01Module {
}
