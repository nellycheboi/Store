import { Order } from "./order";

export class User {
    id: number | null;
    firstName: string;
    lastName: string;

    // handling concurency
    rowNumber: string;
}