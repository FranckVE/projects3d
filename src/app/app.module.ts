import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TopMenuModule } from "./top-menu/top-menu.module";
import { HttpClientModule } from "@angular/common/http";
import { ThreePrimitivesService } from "./appServices/three-primitives.service";
import { NgbDropdownConfig, NgbPopoverConfig, NgbTooltipConfig } from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TopMenuModule,
    ],
    providers: [ThreePrimitivesService, NgbDropdownConfig, NgbTooltipConfig, NgbPopoverConfig],
    bootstrap: [AppComponent]
})
export class AppModule {
}
