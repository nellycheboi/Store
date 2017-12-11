import { Injectable } from '@angular/core';
import { Message } from "../models/message";

/**
 * @Injectable decorator indicates that service might itself have dependencies
 * This service exposes its cache of messages and two methods:
 * One to add a message to the cache and another to clear the cache
 */
@Injectable()
export class MessageService {

    messages: Message[] = [];

    /**
     * Adds the new message to the  messages array
     * @param message
     */
    add(message: Message) {
        this.messages.push(message);
    }

    /**
     * Resets the messages array to empty
     */
    clear() {
        this.messages = [];
    }
}