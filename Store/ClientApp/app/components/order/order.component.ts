import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Order } from '../../models/order';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../services/order.service'
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";


@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],

})
export class OrderComponent implements OnInit {
    order: Order;
    public users: User[];
    public orders: Order[];
    model: Order = this.getNewModel();
    page: number = 1;

    /**
     * Both the UserService and the OrderService are injected into the component.
     * The constructor defines both properties and further indetifies them as their respective service injections
     * The constructor is reserved for simple initilization leaving the heavy duty such as HTTP Request to the server to ngOnInit.
     * @param orderService used to interact with the order's API
     * @param userService used to interact with the user's  API.
     *      Every order is associated with a user. Users are need when edditing, adding and searching orders.
     *      TODO: interact with the user compenent directly to get this information.
     */
    constructor(private orderService: OrderService, private userService: UserService) { }

    /**
     * In Angular's lifeCycle hook this method is called once after the first ngOnChanges.
     *      ngOnChanges is called before ngOnInit and whenever one or more data-bound input properties change.
     * Populates  the users and the orders array.
     * I considered putting this on ngOnChanges but this means we have to make Api calls anytime either of this is updated.
     * For performance benefits, I will trigger array repopulation on select API Method calls.
     */
    ngOnInit() {
        this.getOrders();
        this.getUsers();
    }
    /**
     * return an order object with empty strings and null in its properties.
     */
    getNewModel(): Order {
      const  order: Order = {
            trackingId: "",
            userId: null,
            streetName: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            rowNumber: null,
            user: new User
        }
      this.model = order;
      return order;
    }

    /**
       * Polulates the users array asynchronously.
       * Makes a call the getOrders() of userService, which returns an Observable array of orders.
       * It waits for the observable to emit the array of orders then subscribe passes the emitted array to the callback.
       */
    getOrders(): void {
        this.orderService.getOrders().subscribe(orders => this.orders = orders);
    }

    /**
     * Every order has an associated user.
     * This methods populates the users array by making a call to userService
     */
    getUsers(): void {
        this.userService.getUsers().subscribe(users => this.users = users);
    }
    /**
    * Accepting an order instance. It passes the order instance to the addOrder of orderService.
    * If the order saves successfully, the subscribe callback receives the new order and pushes it to the order list.
    * @param user
    */
    addOrder(order: Order): void {
        if (!order) { return; }
        this.orderService.addOrder(order)
            .subscribe(order => {
                this.orders.push(order);
            });
    }
    /**
     * Accepting an order instance. It passes the order instance to the updateOrder of orderService.
     * There is nothing for the component to do with the Observalble returned by the orderService.updateOrder but it must subscribe anyway.
     * [https://angular.io/tutorial/toh-pt6#delete-a-hero] As a rule observable does nothing until something subscribes
     * @param order
     */
    updateOrder(order: Order): void {
        this.orderService.updateOrder(order).subscribe();

    }
   /**
     * Accepting an order instance. It passes the order instance to the deleteOrder of orderService.
     * There is nothing for the component to do with the Observalble returned by the orderService.deleteOrder but it must subscribe anyway.
     * [https://angular.io/tutorial/toh-pt6#delete-a-hero] As a rule observable does nothing until something subscribes
     * @param order
     */
    deleteOrder(order: Order): void {
        this.orders = this.orders.filter(o => o != order);
        this.orderService.deleteOrder(order.trackingId).subscribe;
    }

    // debbuging {{diagnostic}} to use it in the components view
    get diagnostic() { return JSON.stringify(this.model); }
}