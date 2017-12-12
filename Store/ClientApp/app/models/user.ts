import { Order } from "./order";

export class User {
    id: number;
    firstName: string;
    lastName: string;

    // Handling concurency
    rowNumber: string | null;
   
}