import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestThreejs02Component } from './test-threejs-02.component';
import { TestThreejs02RoutingModule } from "./test-threejs-02-routing.module";

@NgModule({
    imports: [
        CommonModule,
        TestThreejs02RoutingModule,
    ],
    exports: [
        TestThreejs02Component,
    ],
    declarations: [TestThreejs02Component]
})
export class TestThreejs02Module {
}
