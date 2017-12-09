import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

import { UserService } from '../../services/user.service'
import { Observable } from "rxjs/Observable";




@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],

})
export class UserComponent implements OnInit {
    user: User;
    public users: User[];
    model: User = {
        id: null,
        firstName: "",
        lastName: "",
        rowNumber: "rowNumber"

    };

  
    // Injecting UserService. 
    // the constructor defines a userService property and further identifies it as a UserService injection
    // The constructor is reserved for simple intiliization.
    // ngOnInit other heavy duty setup i.e HTTP requests.
    constructor(private userService: UserService) { }


    ngOnInit() {
        this.getUsers();
    }

    // observable is subscribe in the template using async pipe.
    // with this angular deals with the subscription during the
    // the lifecycle of the component.
    // read more : https://hackernoon.com/understanding-creating-and-subscribing-to-observables-in-angular-426dbf0b04a3
    // we are making a call to userService getUsers which returns 
    // an observable that we assing to the users$ property of this class.
    // It is best practice to use $ in observable instance
    getUsers(): void {
        this.userService.getUsers().subscribe(users => this.users = users);
    }

    // Todo https://angular.io/tutorial/toh-pt6#add-a-new-hero
    addUser(user: User): void {
        if (!user) { return; }
        this.userService.addUser(user)
            .subscribe(user => {
                this.users.push(user);
        });
    }


    updateUser(user: User): void {
        this.userService.updateUser(user)
            .subscribe();
    }

    deleteUser(user: User): void {
        this.users = this.users.filter(u => u != user);
        this.userService.deleteUser(user).subscribe();
    }
    get diagnostic() { return JSON.stringify(this.model); }
}
