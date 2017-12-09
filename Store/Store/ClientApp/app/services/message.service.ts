import { Injectable } from '@angular/core';
import { Message } from "../models/message";
// This service exposes its cache of messages and two methods:
// One to add a message to the cache and another to clear the cache
@Injectable()
export class MessageService {
    messages: Message[] = [];

    add(message: Message) {
        this.messages.push(message);
    }

    clear() {
        this.messages = [];
    }
}