import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Chat } from '../../interfaces/chat';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-chat-details-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chat-details-component.html',
  styleUrl: './chat-details-component.css',
})
export class ChatDetailsComponent {

  // Inyectamos las dependencias acá arriba
  private route = inject(ActivatedRoute);
  public chatService = inject(ChatService);

  // Ahora sí, podemos usar 'this.route' porque inject ya se ejecutó
  private id = this.route.snapshot.paramMap.get('id');

  // La signal reactiva
  chatSignal = computed(() => this.chatService.getChatById(this.id || ''));

  newMessageText: string = '';

  constructor() {
    // El constructor queda vacío, ¡más limpio todavía!
  }

  sendMessage() {
    if (!this.newMessageText.trim() || !this.id) {
      return;
    }

    this.chatService.sendMessage(this.id, this.newMessageText);
    this.newMessageText = '';
  }
}
