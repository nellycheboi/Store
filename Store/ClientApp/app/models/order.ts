import { User } from "./user";

export class Order {
   trackingId: string;
   userId: number | null;
   streetName: string;
   streetAddress: string;
   city: string;
   state: string;
   zipCode: string;

   // Handling concurency
   rowNumber: string;
   user: User;
}