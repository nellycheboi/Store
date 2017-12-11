import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';

import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'users', component: UserComponent },
    { path: 'users/:id', component: UserComponent },
    { path: 'orders', component: OrderComponent },
    { path: 'orders/:id', component: OrderComponent },
    { path: '**', redirectTo: 'home' }
];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }