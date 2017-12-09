import { Injectable } from '@angular/core';
import { MessageService } from '../services/message.service';
import { User } from '../models/user'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { catchError, map, tap } from 'rxjs/operators';

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
        return this.http.get<User>(url).pipe(
            tap(_ => this.log(`fetched order id=${id}`)),
            catchError(this.handleError<User>(`getUser id=${id}`))
        );
    }

    /** PUT: update the user on the server */
    updateUser(user: User): Observable<any> {
        return this.http.put(this.usersUrl, user, httpOptions).pipe(
            tap(_ => this.log(`updated user first name=${user.firstName}`)),
            catchError(this.handleError<any>('updateOrder'))
        );
    }

    // Logging a UserService message with the MessageService
    private log(message: string) {
        this.messageService.add('UserService: ' + message);
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
            tap((user: User) => this.log(`added user w/ name=${user.firstName}`)),
            catchError(this.handleError<User>('addUser'))
        );
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