import { CommonModule } from '@angular/common';
import { Component, computed, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../../interfaces/chat';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-chat-details-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-details-component.html',
  styleUrl: './chat-details-component.css',
})
export class ChatDetailsComponent {
  chatSignal: Signal<Chat | undefined>;
  newMessageText: string = '';
  private id?: string;

  constructor(
    private route: ActivatedRoute,
    public chatService: ChatService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || undefined;
    this.chatSignal = computed(() =>
      this.chatService.getChatById(this.id || '')
    );
  }
  ngOnInit() {
    this.chatSignal = computed(() =>
      this.chatService.getChatById(this.id || '')
    );
  }

  sendMessage() {
    if (!this.newMessageText.trim() || !this.id) {
      return;
    }

    const chat = this.chatService.getChatById(this.id);
    if (chat) {
      const newMessage = {
        id: (chat.messages.length + 1).toString(),
        text: this.newMessageText,
        fromMe: true,
        date: new Date().toISOString(),
      };
      const updatedChat: Chat = {
        ...chat,
        lastMessage: this.newMessageText,
        messages: [...chat.messages, newMessage],
      };
      this.chatService.updateChat(updatedChat);
      this.newMessageText = '';
    }
  }
}
