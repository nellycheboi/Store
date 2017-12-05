import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],

})
export class OrderComponent implements OnInit {

    
    // Inject HttpClient. 
    // angular requires injection into components to be public
    constructor(public http: HttpClient) { }

    ngOnInit() {

    }


}

interface User {
    firstName: string;
    lastName: string;
}