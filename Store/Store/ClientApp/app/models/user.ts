import { Order } from "./order";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    
    // handling concurency
    rowNumber: string;
   
}