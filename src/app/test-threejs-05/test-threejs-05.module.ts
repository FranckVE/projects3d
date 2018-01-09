import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestThreejs05Component } from './test-threejs-05.component';
import { TestThreejs05RoutingModule } from "./test-threejs-05-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        TestThreejs05RoutingModule,
        NgbModule
    ],
    exports: [
        TestThreejs05Component,
    ],
    declarations: [TestThreejs05Component]
})
export class TestThreejs05Module {
}
