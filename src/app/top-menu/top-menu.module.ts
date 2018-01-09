import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { TestThreejs01Module } from "../test-threejs-01/test-threejs-01.module";
import { TestThreejs02Module } from "../test-threejs-02/test-threejs-02.module";
import { TestThreejs03Module } from "../test-threejs-03/test-threejs-03.module";
import { TestThreejs04Module } from "../test-threejs-04/test-threejs-04.module";
import { TestThreejs05Module } from "../test-threejs-05/test-threejs-05.module";
import { TestLoadImage01Module } from "../test-load-image-01/test-load-image-01.module";

// ref : https://angular.io/docs/ts/latest/guide/router.html
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/testThreejs03',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/testThreejs03',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    TestThreejs01Module,
    TestThreejs02Module,
    TestThreejs03Module,
    TestThreejs04Module,
    TestThreejs05Module,
    TestLoadImage01Module,
    RouterModule.forRoot(appRoutes /*, { enableTracing: true }*/),
  ],
  exports: [
    TopMenuComponent,
    RouterModule,
  ],
  declarations: [
    TopMenuComponent
  ]
})
export class TopMenuModule {
}
