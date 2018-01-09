import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestThreejs05Component } from './test-threejs-05.component';

const testThreejs05Routes: Routes = [
  {path: 'testThreejs05', component: TestThreejs05Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(testThreejs05Routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class TestThreejs05RoutingModule { }
