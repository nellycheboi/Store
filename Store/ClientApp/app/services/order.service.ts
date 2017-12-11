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

/**
 * @Injectable decorator indicates that service might itself have dependencies
 */
@Injectable()
export class OrderService {

    private ordersUrl = 'api/orders';
    /**
     * Declares and injects httpClient and MessageService to the services.
     * The implemetation of the server is found in the __ROOT__/controllers/orders
     * @param http httpClient methods return an Observable of something.
     * @param messageService Use to log any messages. Message component displays the messages to the user
     */
    constructor(private http: HttpClient, private messageService: MessageService) { }

    /**
     * asynchronous makes a GET request to the server and returns an Observable of Order objects.
     */
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.ordersUrl);
            
    }
    /**
     * Accepting a trackingId as string, it appends id to the ordersUrl makes a GET request to retieve an order
     * The tap operator looks at the observable values, logs a message to the messageServices and passes the along.
     * Tap call back doesn't modify the values.
     * To catch errors the observable request is piped from the http.get through RxJS catchError() operator.
     * The catch error intercepts the failed observalble and passes to the HandleError.
     * The returns an Observable of user object
     * @param trackingId
     */
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
     /**
     * Accepting a order instance. It makes a POST request to the server to persist the new order.
     * The tap operator looks at the observable values, logs a message to the messageServices and passes the along.
     * Tap call back doesn't modify the values.
     * To catch errors the observable request is piped from the http.get through RxJS catchError() operator.
     * The catch error intercepts the failed observalble and passes to the HandleError.
     * The returns an Observable of order object
     * @param trackingId
     */
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
     /**
     * Accepting a order instance. It makes a PUT request to the server to update the current order.
     * The tap operator looks at the observable values, logs a message to the messageServices and passes the along.
     * Tap call back doesn't modify the values.
     * To catch errors the observable request is piped from the http.get through RxJS catchError() operator.
     * The catch error intercepts the failed observalble and passes to the HandleError.
     * The returns an Observable of order object
     * @param trackingId
     */
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
     * Accepting trackingId as a string. It makes a DELETE request to the server to remove the order idenified by that key.
     * The tap operator looks at the observable values, logs a message to the messageServices and passes the along.
     * Tap call back doesn't modify the values.
     * To catch errors the observable request is piped from the http.get through RxJS catchError() operator.
     * The catch error intercepts the failed observalble and passes to the HandleError.
     * The returns an Observable of order object
     * @param trackingId
     */
    deleteOrder(trackingId: string): Observable<Order> {
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

   /**
    * Accepting a message of type Message. It pushes it to the message service so as to be available to component for rendering
    * @param message
    */
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
        return (err: HttpErrorResponse): Observable<T> => {
            let errorMessage = "";
            if (err.error instanceof Error) {
                // A client-side or network error occurred. 
                errorMessage = `An error occurred while ${operation}:, ${err.error.message}`;
            } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                errorMessage = `An error occurred while ${operation}: Server returned ${err.error}`;
            }

            // TODO: send the error to remote logging infrastructure
            // log to console instead
            console.error(err); 


            const message: Message = {
                type: MessageType.ERROR,
                message: errorMessage
            }
            this.log(message);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}