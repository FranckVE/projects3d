import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestLoadImage01Component } from './test-load-image-01.component';

const testLoadImage01Routes: Routes = [
  {path: 'testLoadImage01', component: TestLoadImage01Component},
];

@NgModule({
  imports: [
    RouterModule.forChild(testLoadImage01Routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class TestLoadImage01RoutingModule { }
