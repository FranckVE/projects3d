import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestThreejs04Component } from './test-threejs-04.component';

const testThreejs04Routes: Routes = [
  {path: 'testThreejs04', component: TestThreejs04Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(testThreejs04Routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class TestThreejs04RoutingModule { }
