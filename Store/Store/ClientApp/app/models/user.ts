import { Order } from "./order";

export class User {
    firstName: string;
    lastName: string;

    // handling concurency
    rowNumber: string;

}