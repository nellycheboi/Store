import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public users: User[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/orders').subscribe(result => {
            this.users = result.json() as User[];
        }, error => console.error(error));
    }
}

interface User {
    firstName: string;
    lastName: string;
}

