import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent{

  // messageService property must be public to be bound to a template
  /**
   * The constructor defines a public message service and further indetifies it as an injection
   * It is made public in order to be bound to be bound to a template
   * @param messageService
   */
  constructor(public messageService: MessageService) {}

}