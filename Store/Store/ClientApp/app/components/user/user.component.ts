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
    public users$: Observable<User[]>;

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
        this.users$ = this.userService.getUsers();
    }

    //save(): void {
    //    this.userService.updateUser(this.user)
    //        .subscribe(() => this.goBack());
    //}
    // Todo https://angular.io/tutorial/toh-pt6#add-a-new-hero
    //add(firstName: string): void {
    //    firstName = firstName.trim();
    //    if (!firstName) { return; }
    //    this.userService.addUser({{ firstName }} as User)
    //        .subscribe(user => {
    //            this.users$.push(user);
    //    });
    //}

}
