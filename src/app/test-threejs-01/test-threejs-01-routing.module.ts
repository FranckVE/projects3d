import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestThreejs01Component } from './test-threejs-01.component';

const testThreejs01Routes: Routes = [
  {path: 'testThreejs01', component: TestThreejs01Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(testThreejs01Routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class TestThreejs01RoutingModule { }
