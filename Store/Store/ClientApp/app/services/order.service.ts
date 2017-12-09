import { Injectable } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Order } from '../models/order'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { catchError, map, tap } from 'rxjs/operators';

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
    getOrder(id: number): Observable<Order> {
        const url = `${this.ordersUrl}/${id}`;
        return this.http.get<Order>(url).pipe(
            tap(_ => this.log(`fetched order id=${id}`)),
            catchError(this.handleError<Order>(`getOrder id=${id}`))
        );
    }
    /** POST: add a new order to the server */
    addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.ordersUrl, order, httpOptions).pipe(
            tap((order: Order) => this.log(`added order w/ id=${order.trackingId}`)),
            catchError(this.handleError<Order>('addOrder'))
        );
    }

    /** PUT: update the order on the server */
    updateOrder(order: Order): Observable<any> {
        const url = `${this.ordersUrl}/${order.trackingId}`;
        return this.http.put(url, order, httpOptions).pipe(
            tap(_ => this.log(`updated order id=${order.trackingId}`)),
            catchError(this.handleError<any>('updateOrder'))
        );
    }

    /**
     * Delete: delet the order from the server
     * @param trackingId
     */
    deleteUser(trackingId: string): Observable<Order> {
        const url = `${this.ordersUrl}/$(trackingId}`;
        return this.http.delete<Order>(url, httpOptions).pipe(
            tap(_ => this.log(`Deleted order trackingId = ${trackingId}`)),
            catchError(this.handleError<Order>('deleteOrder')
            )
        );
    }

    // Logging a OrderService message with the MessageService
    private log(message: string) {
        this.messageService.add('OrderService: ' + message);
    }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @see https://angular.io/tutorial/toh-pt6#error-handling
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}