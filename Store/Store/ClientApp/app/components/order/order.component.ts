import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../services/order.service'

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],

})
export class OrderComponent implements OnInit {
    order: Order;
    public orders$: Observable<Order[]>;
    model: Order = {
        trackingId: "",
        userId: "",
        streetName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        rowNumber: "orderRowNumber"
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
        this.orders$ = this.orderService.getOrders();
    }

    
    //save(): void {
    //    this.orderService.updateOrder(this.order)
    //        .subscribe(() => this.goBack());
    //}
    //// Todo
    //add(name: string): void {
    //    name = name.trim();
    //    if (!name) { return; }
    //    this.orderService.addOrder({ name } as Order)
    //        .subscribe(order => {
    //            this.orders$.push(order);
    //        });
    //}

}
