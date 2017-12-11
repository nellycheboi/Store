import { Pipe, PipeTransform } from '@angular/core';
import { Order } from "../models/order";

@Pipe({
    name: 'filterOrder'
})

export class FilterOrderPipe implements PipeTransform {
    /**
     * Accepts and array of Orders and a filter text.
     * Return the array if the search text is empty and
     * returns an empty array if items are missing.
     * Calls get getOrderBlob to retrieve the search criteria.
     * return array that have matching fields from the getOrderBlob.
     * @param items
     * @param searchText
     */
    transform(items: Order[], searchText: string): Order[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return this.getOrderBlob(it).toLowerCase().includes(searchText);
        });
    }
    /**
     * Concats select order fields separated by spaces.
     * Cast the result lowerCase before returning it.
     * @param it
     */
    getOrderBlob(it: Order): string {
        const order: string = it.trackingId + ' ' + it.city + ' ' + it.streetAddress + ' ' + it.streetName + ' ' + it.state;
        return (order).toLowerCase();
    }
}