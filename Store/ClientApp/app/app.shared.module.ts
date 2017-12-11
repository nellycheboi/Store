import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'angular2-markdown';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { OrderComponent } from './components/order/order.component';
import {MessagesComponent } from './components/messages/messages.component';

import { AppRoutingModule } from './app-routing.module'
import { ModalModule } from 'ngx-bootstrap';
import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { MessageService } from './services/message.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterUserPipe } from './pipes/filterUser';
import { FilterOrderBasedOnUser } from './pipes/filterOrderBasedOnUser';
import { FilterOrderPipe } from './pipes/filterOrder';



@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        UserComponent,
        OrderComponent,
        MessagesComponent,
        FilterUserPipe,
        FilterOrderBasedOnUser,
        FilterOrderPipe
    ],
    // create a single instance of the following service and make them available to any class that asks for it
    providers: [UserService, OrderService, MessageService],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        MarkdownModule.forRoot(),
        ModalModule.forRoot(),
        NgxPaginationModule,
    ]
})
export class AppModuleShared {
}
