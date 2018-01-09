import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestThreejs03Component } from './test-threejs-03.component';
import { TestThreejs03RoutingModule } from "./test-threejs-03-routing.module";

@NgModule({
    imports: [
        CommonModule,
        TestThreejs03RoutingModule,
    ],
    exports: [
        TestThreejs03Component,
    ],
    declarations: [TestThreejs03Component]
})
export class TestThreejs03Module {
}
