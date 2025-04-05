import { Injectable } from '@angular/core';
import { Message } from '../_models/app.models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  add(message: string) {
    this.messages.push({message: message, severity: 'error', summary: 'Info'});
  }
  addMessage(message: Message) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

