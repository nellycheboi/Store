import { Order } from "./order";

export class User {
    id: number | null;
    firstName: string;
    lastName: string;
    constructor(id: number | null, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;

        // you have to bind function in case you want to filter by getName function
        this.getName = this.getName.bind(this);
    }
    // handling concurency
    rowNumber: string;
    fullName() {
        return `${this.firstName}, ${this.lastName}`;
    }
    getName() {
        return `${this.firstName}, ${this.lastName}`;
    }
}