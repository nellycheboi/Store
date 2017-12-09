import { Component, OnInit, Input } from '@angular/core';

import { Order } from '../../models/order';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../services/order.service'
import { User } from "../../models/user";

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],

})
export class OrderComponent implements OnInit {
    order: Order;
    public orders: Order[];
    model: Order = {
        trackingId: "",
        userId: "",
        streetName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        rowNumber: "orderRowNumber",
        user: new User
    }



    // Inject OrderService. 
    // the constructor defines a orderService property and further identifies it as a OrderService injection
    // The constructor is reserved for simple intiliization.
    // ngOnInit other heavy duty setup i.e HTTP requests.
    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.getOrders()
    }

    // observable is subscribe in the template using async pipe.
    // with this angular deals with the subscription during the
    // the lifecycle of the component.
    // read more : https://hackernoon.com/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3
    // we are making a call to orderService getOrders which returns 
    // an observable that we assing to the users$ property of this class.
    // It is best practice to use $ in observable instance
    getOrders(): void {
        this.orderService.getOrders().subscribe(orders => this.orders = orders);
    }


    addOrder(order: Order): void {
        if (!order) { return; }
        this.orderService.addOrder(order)
            .subscribe(order => {
                this.orders.push(order);
            });
    }

    updateOrder(order: Order): void {
        this.orderService.updateOrder(order).subscribe();
    }

    deleteOrder(order: Order): void {
        this.orders = this.orders.filter(o => o != order);
        this.orderService.deleteUser(order.trackingId).subscribe;
    }
}
