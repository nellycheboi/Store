import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { UserComponent } from './components/user/user.component';
import { OrderComponent } from './components/order/order.component';
import {MessagesComponent } from './components/messages/messages.component';

import { AppRoutingModule } from './app-routing.module'

import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { MessageService } from './services/message.service'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        UserComponent,
        OrderComponent,
        MessagesComponent
    ],
    // create a single instance of the following service and make them available to any class that asks for it
    providers: [UserService, OrderService, MessageService],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,

    ]
})
export class AppModuleShared {
}
