import { Injectable, signal, WritableSignal } from '@angular/core';
import { Chat } from '../interfaces/chat';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chats: WritableSignal<Chat[]> = signal(this.createMock());
  public readonly chats$ = this.chats.asReadonly();

  constructor() { }

  private createMock(): Chat[] {
    const now = new Date().toISOString();
    return [
      {
        id: '1',
        name: 'Melina',
        lastMessage: '¡Hola, ¿cómo estás?',
        messages: [
          {
            id: '2',
            text: '¡Todo bien, vos?',
            fromMe: false,
            date: now,
          },
          {
            id: '3',
            text: 'Acordate de la reunión mañana.',
            fromMe: true,
            date: now,
          },
        ],
      },
    ];
  }

  getChatById(id: string): Chat | undefined {
    return this.chats().find(chat => chat.id === id);
  }

  addChat(chat: Chat): void {
    this.chats.update(chats => [...chats, chat]);
  }

  updateChat(updatedChat: Chat): void {
    this.chats.update(chats =>
      chats.map(chat => (chat.id === updatedChat.id ? updatedChat : chat))
    );
  }

  deleteChat(id: string): void {
    this.chats.update(chats => chats.filter(chat => chat.id !== id));
  }

  addMessageToChat(chatId: string, message: Message): void {
    this.chats.update(chats =>
      chats.map(chat => {
        if (chat.id === chatId) {

          const exists = chat.messages.some(m => m.id === message.id);
          if (exists) return chat;

          return {
            ...chat,
            lastMessage: message.text,
            messages: [...chat.messages, message],
          };
        }
        return chat;
      })
    );
  }

  sendMessage(chatId: string, text: string): void {
    const message = {
      id: Date.now().toString(),
      text,
      fromMe: true,
      date: new Date().toISOString(),
    };
    this.addMessageToChat(chatId, message);
  }

}
