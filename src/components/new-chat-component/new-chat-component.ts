import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../../interfaces/chat';
import { ChatService } from '../../services/chat-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-chat-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-chat-component.html',
  styleUrl: './new-chat-component.css',
})
export class NewChatComponent {
  name = '';
  initial = '';
  constructor(
    private chatService: ChatService,
    private router: Router
  ) { }

  createChat() {
    if (!this.name.trim() || !this.initial.trim()) {
      return;
    }
    const newChat: Chat = {
      id: (Math.random() * 1000000).toString(),
      name: this.name,
      lastMessage: this.initial,
      messages: [
        {
          id: '1',
          text: this.initial,
          fromMe: true,
          date: new Date().toISOString(),
        }
      ]
    };
    this.chatService.addChat(newChat);
    this.router.navigate(['/chat', newChat.id]);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
