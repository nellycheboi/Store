import { Component, OnInit, Input } from '@angular/core';
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
    users: User[];
    model: User = this.getNewModel();

    page: number = 1;



    /**
     * The UserService is injected into this component.
     * The constructor defenes a userService property and further identifies it as a UserService injections.
     * The constructor is reserved for simple intiliization, leaving ngOnInit to do other heavy duty setup i.e HTTP Resquests
     * @param userService used to interact with the API.
     */
    constructor(private userService: UserService) { }

    /**
    * In Angular's lifeCycle hook this method is called once after the first ngOnChanges.
    *      ngOnChanges is called before ngOnInit and whenever one or more data-bound input properties change.
    * Populates  the users and the orders array.
    * I considered putting this on ngOnChanges but this means we have to make Api calls anytime either of this is updated.
    * For performance benefits, I will trigger array repopulation on select API Method calls.
    */
    ngOnInit() {
        this.getUsers();
    }
    /**
     * Returns a new user with it fields nullified or set to empty strings
     */
    getNewModel(): User {
        const user: User = {
            id: 0,
            firstName: "",
            lastName: "",
            rowNumber: null
        }
        this.model = user;
        return user;
    }
    /**
     * Polulates the users array asynchronously.
     * Makes a call the getUsers() of userService, which returns an Observable array of users.
     * It waits for the observable to emit the array of users then subscribe passes the emitted array to the callback.
     */
    getUsers(): void {
        this.userService.getUsers().subscribe(users => this.users = users);
    }


    /**
     * Accepting a user instance. It passes the user instance to the addUser of userService.
     * If the user saves successfully, the subscribe callback receives the new user and pushes it to the users list.
     * @param user
     */
    addUser(user: User): void {
        if (!user) { return; }
        this.userService.addUser(user)
            .subscribe(user => {
                this.users.push(user);
            });
    }

    /**
     * Accepting an user instance. It passes the user instance to the updateuser of userService.
     * There is nothing for the component to do with the Observalble returned by the userService.updateUser but it must subscribe anyway.
     * [https://angular.io/tutorial/toh-pt6#delete-a-hero] As a rule observable does nothing until something subscribes
     * @param user
     */
    updateUser(user: User): void {
        this.userService.updateUser(user)
            .subscribe();
    }
    /**
     * Accepting an user instance. It passes the user instance to the deleteuser of userService.
     * There is nothing for the component to do with the Observalble returned by the userService.deleteUser but it must subscribe anyway.
     * [https://angular.io/tutorial/toh-pt6#delete-a-hero] As a rule observable does nothing until something subscribes
     * @param user
     */
    deleteUser(user: User): void {
        this.users = this.users.filter(u => u != user);
        this.userService.deleteUser(user).subscribe();
    }

    // debbuging {{diagnostic }} to use it in the components view
    get diagnostic() { return JSON.stringify(this.model); }
}
