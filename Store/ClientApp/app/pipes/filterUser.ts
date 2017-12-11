import { Pipe, PipeTransform } from '@angular/core';
import { User } from "../models/user";

@Pipe({
    name: 'filterUser'
})

export class FilterUserPipe implements PipeTransform {
    /**
     * Accepts and array of Users and a filter text.
     * Return the array if the search text is empty a
     * returns an empty array if items are missing.
     * Calls get getUserBlob to retrieve the search criteria.
     * return array that have matching fields from the get user blob.
     * @param items
     * @param searchText
     */
    transform(items: User[], searchText: string): User[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return this.getUserBlob(it).toLowerCase().includes(searchText);
        });
    }

    /**
     * Concats first and last name separated by spaces.
     * Cast the result lowerCase before returning it.
     * @param user
     */
    getUserBlob(user: User): string{
        return (user.firstName + ' ' + user.lastName).toLowerCase();
    }
}