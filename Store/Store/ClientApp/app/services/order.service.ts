import { Injectable } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Order } from '../models/order'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageType } from "../models/messageType";
import { Message } from "../models/message";
import { HttpErrorResponse } from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// @Injectable decorator indicates that service might itself have dependencies
@Injectable()
export class OrderService {

    private ordersUrl = 'api/orders';

    constructor(private http: HttpClient, private messageService: MessageService) { }

    // asynchronous signature
    // returns an Observalbe of orders
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.ordersUrl);
            
    }

    // construct a request url with the desired order id
    // the server should respond with a single order
    getOrder(trackingId: string): Observable<Order> {
        const url = `${this.ordersUrl}/${trackingId}`;
        const message: Message = {
            type: MessageType.SUCCESS,
            message: `Fetched Order =${trackingId}`
        }
        return this.http.get<Order>(url).pipe(
            tap(_ => this.log(message)),
            catchError(this.handleError<Order>(`Getting Order: ${trackingId}`))
        );
    }
    /** POST: add a new order to the server */
    addOrder(order: Order): Observable<Order> {
        const message: Message = {
            type: MessageType.SUCCESS,
            message: `Added order: ${order.trackingId}`
        }
        return this.http.post<Order>(this.ordersUrl, order, httpOptions).pipe(
            tap((order: Order) => this.log(message)),
            catchError(this.handleError<Order>(`Adding Order ${order.trackingId}`))
        );
    }

    /** PUT: update the order on the server */
    updateOrder(order: Order): Observable<any> {
        const url = `${this.ordersUrl}/${order.trackingId}`;
        const message: Message = {
            type: MessageType.SUCCESS,
            message: `Updated Order: ${order.trackingId}`
        }
        return this.http.put(url, order, httpOptions).pipe(
            tap(_ => this.log(message)),
            catchError(this.handleError<any>(`Updating Order  ${order.trackingId}`))
        );
    }

    /**
     * Delete: delet the order from the server
     * @param trackingId
     */
    deleteUser(trackingId: string): Observable<Order> {
        const url = `${this.ordersUrl}/$(trackingId}`;
        const message: Message = {
            type: MessageType.SUCCESS,
            message: `Deleted Order:  ${trackingId}`
        }
        return this.http.delete<Order>(url, httpOptions).pipe(
            tap(_ => this.log(message)),
            catchError(this.handleError<Order>(`Deleting Order  ${trackingId}`)
            )
        );
    }

    // Logging a OrderService message with the MessageService
    private log(message: Message) {
        this.messageService.add(message);
    }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @see https://angular.io/tutorial/toh-pt6#error-handling
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (httpErrorResponse: HttpErrorResponse): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(httpErrorResponse); // log to console instead

            const message: Message = {
                type: MessageType.ERROR,
                message: `${operation} Failed: ${httpErrorResponse.error}`
            }
            // TODO: better job of transforming error for user consumption
            this.log(message);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}