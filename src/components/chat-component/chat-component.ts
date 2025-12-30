import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-chat-component',
  imports: [CommonModule],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.css',
})
export class ChatComponent {
  constructor(public chatService: ChatService, private router: Router) { }

  openChat(id: string) {
    this.router.navigate(['/chat', id]);
  }

  createNewChat() {
    this.router.navigate(['/nuevo']);
  }
}
