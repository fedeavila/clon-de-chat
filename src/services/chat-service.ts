import { Injectable, signal, WritableSignal } from '@angular/core';
import { Chat } from '../interfaces/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chats: WritableSignal<Chat[]> = signal(this.createMok());
  public readonly chats$ = this.chats.asReadonly();

  constructor() { }

  getChats(): WritableSignal<Chat[]> {
    return this.chats;
  }

  private createMok(): Chat[] {
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

  getChatsSnapshots(): Chat[] {
    return this.chats();
  }

  /* Obtener char por ID */
  getChatById(id: string): Chat | undefined {
    return this.chats().find(chat => chat.id === id);
  }

  /* Agregar nuevo chat */
  addChat(chat: Chat): void {
    this.chats.update(chats => [...chats, chat]);
  }

  /* Actualizar chat existente */
  updateChat(updatedChat: Chat): void {
    this.chats.update(chats =>
      chats.map(chat => (chat.id === updatedChat.id ? updatedChat : chat))
    );
  }

  /* Eliminar chat por ID */
  deleteChat(id: string): void {
    this.chats.update(chats => chats.filter(chat => chat.id !== id));
  }

  /* Crear nuevo mensaje en un chat */
  addMessageToChat(chatId: string, message: { id: string; text: string; fromMe: boolean; date: string }): void {
    this.chats.update(chats =>
      chats.map(chat => {
        if (chat.id === chatId) {
          // Chequeamos si el ID ya existe en la lista de mensajes
          const exists = chat.messages.some(m => m.id === message.id);
          if (exists) return chat; // Si ya está, devolvemos el chat sin cambios

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

  /* Enviar mensaje (simulado) */
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
