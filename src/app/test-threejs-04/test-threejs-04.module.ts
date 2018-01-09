import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestThreejs04Component } from './test-threejs-04.component';
import { TestThreejs04RoutingModule } from "./test-threejs-04-routing.module";

@NgModule({
    imports: [
        CommonModule,
        TestThreejs04RoutingModule
    ],
    exports: [
        TestThreejs04Component,
    ],
    declarations: [TestThreejs04Component]
})
export class TestThreejs04Module {
}
