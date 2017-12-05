import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],

})
export class UserComponent implements OnInit {
    public users: User;

    // Injecting HttpClient. 
    // angular requires injection into components to be public
    constructor(public http: HttpClient) { }

    // The response body doesn't return all the data you may need. Sometimes servers return special headers or status codes to indicate certain conditions, and inspecting those can be necessary. To do this, you can tell HttpClient you want the full response instead of just the body with the observe option:
    // https://angular.io/guide/http#making-a-request-for-json-data
    ngOnInit(): void {
        this.http.get<User>('/api/users', { observe: 'response' }).subscribe(result => {
            // Read the result field from the JSON response.
            this.users = result!.body!;
        }, error => console.error(error));
     
       
    }
}

interface User {
    firstName: string;
    lastName: string;
}