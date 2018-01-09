import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestThreejs03Component } from './test-threejs-03.component';

const testThreejs03Routes: Routes = [
  {path: 'testThreejs03', component: TestThreejs03Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(testThreejs03Routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class TestThreejs03RoutingModule { }
