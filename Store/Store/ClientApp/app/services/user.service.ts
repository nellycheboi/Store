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

// @Injectable decorator indicates that service might itself have dependencies
@Injectable()
export class UserService {
    private usersUrl = 'api/users';

    constructor(private http: HttpClient, private messageService: MessageService) { }

    // asynchronous signature
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl);
    }

    // construct a request url with the desired order id
    // the server should respond with a single user
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
    ///Create
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

    /** PUT: update the user on the server */
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
            console.error(err); // log to console instead


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