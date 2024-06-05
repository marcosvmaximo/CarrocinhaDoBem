import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppLayoutModule} from "./layout/app.layout.module";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routes";
import {RouterModule} from "@angular/router";
import {ProductService} from "./demo/service/product.service";
import {PhotoService} from "./demo/service/photo.service";
import {CountryService} from "./demo/service/country.service";
import {CustomerService} from "./demo/service/customer.service";
import {EventService} from "./demo/service/event.service";
import {IconService} from "./demo/service/icon.service";
import {NodeService} from "./demo/service/node.service";
import { ReactiveFormsModule } from '@angular/forms';
import {NotfoundComponent} from "./demo/components/notfound/notfound.component";
import {DragDropModule} from "primeng/dragdrop";
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [AppRoutingModule, AppLayoutModule, NgxTippyModule, ReactiveFormsModule],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    CountryService, CustomerService, EventService, IconService, NodeService,
    PhotoService, ProductService, MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
