export class Order {
   trackingId: number;
   userId: string;
   streetAddress: string;
   city: string;
   state: string;
   zipCode: string;

    // Handling concurency
   rowNumber: string;

}