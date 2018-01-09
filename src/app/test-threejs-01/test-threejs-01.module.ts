import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestThreejs01Component } from './test-threejs-01.component';
import { TestThreejs01RoutingModule } from "./test-threejs-01-routing.module";

@NgModule({
    imports: [
        CommonModule,
        TestThreejs01RoutingModule,
    ],
    exports: [
        TestThreejs01Component,
    ],
    declarations: [TestThreejs01Component]
})
export class TestThreejs01Module {
}
