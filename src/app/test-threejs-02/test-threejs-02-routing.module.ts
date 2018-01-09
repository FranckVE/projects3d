import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestThreejs02Component } from './test-threejs-02.component';

const testThreejs02Routes: Routes = [
  {path: 'testThreejs02', component: TestThreejs02Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(testThreejs02Routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class TestThreejs02RoutingModule { }
