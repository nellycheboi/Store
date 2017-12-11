import { Pipe, PipeTransform } from '@angular/core';
import { Order } from "../models/order";

@Pipe({
    name: 'filterOrderBasedOnUser'
})

export class FilterOrderBasedOnUser implements PipeTransform {
    /**
     * Filters and array of orders based on the order.userID
     * @param items
     * @param orderId
     */
    transform(items: Order[], userId: number):Order[] {
        if (!items) return [];
        if (!userId) return items;
        return items.filter(it => {
            return it.userId == userId;
        });
    }
}