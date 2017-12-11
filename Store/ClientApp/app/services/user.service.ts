import { Injectable } from '@angular/core';
import { MessageService } from '../services/message.service';
import { User } from '../models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Message } from "../models/message";
import { MessageType } from "../models/messageType";
import { HttpErrorResponse } from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * @Injectable decorator indicates that service might itself have dependencies
 */
@Injectable()
export class UserService {

    private usersUrl = 'api/users';

    /**
    * Declares and injects httpClient and MessageService to the services.
    * The implemetation of the server is found in the __ROOT__/controllers/users
    * @param http httpClient methods return an Observable of something.
    * @param messageService Use to log any messages. Message component displays the messages to the user
    */
    constructor(private http: HttpClient, private messageService: MessageService) { }


    /**
     * asynchronous makes a call to the server and returns an Observable of User objects.
     */
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl);
    }
    /**
     * Accepting a userId as number. It appends to the usersUrl and makes a GET Request to retrive the user
     * The tap operator looks at the observable values, logs a message to the messageServices and passes the along.
     * Tap call back doesn't modify the values.
     * To catch errors the observable request is piped from the http.get through RxJS catchError() operator.
     * The catch error intercepts the failed observalble and passes to the HandleError.
     * The returns an Observable of user object
     * @param id
     */
    getHero(id: number): Observable<User> {
        const url = `${this.usersUrl}/${id}`;
        const message: Message = {
            type: MessageType.SUCCESS,
            message: `Fetched order id=${id}`
        }
        return this.http.get<User>(url).pipe(
            tap(_ => this.log(message)),
            catchError(this.handleError<User>(`Getting User id=${id}`))
        );
    }
    /**
    * Accepting a user instance. It makes a POST request to the server to persist the new user.
    * The tap operator looks at the observable values, logs a message to the messageServices and passes the along.
    * Tap call back doesn't modify the values.
    * To catch errors the observable request is piped from the http.get through RxJS catchError() operator.
    * The catch error intercepts the failed observalble and passes to the HandleError.
    * The returns an Observable of user object
    * @param id
    */
    addUser(user: User): Observable<User> {
        console.log(JSON.stringify(user));
        const message: Message = {
            type: MessageType.SUCCESS,
            message: `Added ${user.lastName}, ${user.firstName}`
        }
        return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
            tap((user: User) => this.log(message)),
            catchError(this.handleError<User>(`Adding User: ${user.lastName}, ${user.firstName}`))
        );
    }

    /**
    * Accepting a user instance. It makes a PUT request to the server to update the repspective user.
    * The tap operator looks at the observable values, logs a message to the messageServices and passes the along.
    * Tap call back doesn't modify the values.
    * To catch errors the observable request is piped from the http.get through RxJS catchError() operator.
    * The catch error intercepts the failed observalble and passes to the HandleError.
    * The returns an Observable of user object
    * @param id
    */
    updateUser(user: User): Observable<any> {
        const url = `${this.usersUrl}/${user.id}`;
        const message: Message = {
            type: MessageType.SUCCESS,
            message: `Updated User:  ${user.lastName}, ${user.firstName}`
        }
        return this.http.put(url, (user.id, user), httpOptions).pipe(
            tap(_ => this.log(message)),
            catchError(this.handleError<any>(`Updating User: ${user.lastName}, ${user.firstName}`))
        );
    }
    /**
    * Accepting a user instance. It extracts userId and append its to the userUrl before making a DELETE request to the server to remove the respectice user.
    * The tap operator looks at the observable values, logs a message to the messageServices and passes the along.
    * Tap call back doesn't modify the values.
    * To catch errors the observable request is piped from the http.get through RxJS catchError() operator.
    * The catch error intercepts the failed observalble and passes to the HandleError.
    * The returns an Observable of user object.
    * @param id
    */
    deleteUser(user: User): Observable<User> {
        const url = `${this.usersUrl}/${user.id}`;
        const message: Message = {
            type: MessageType.SUCCESS,
            message: `Deleted: ${user.lastName}, ${user.firstName}`
        }
        return this.http.delete<User>(url, httpOptions).pipe(
            tap(_ => this.log(message),
                catchError(this.handleError<User>(`Deleting User: ${user.lastName}, ${user.firstName}`))
            )
        );
    }

    // Logging a UserService message with the MessageService
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