import { Routes } from '@angular/router';
import { ChatComponent } from '../components/chat-component/chat-component';
import { ChatDetailsComponent } from '../components/chat-details-component/chat-details-component';
import { NewChatComponent } from '../components/new-chat-component/new-chat-component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'chat', pathMatch: 'full',
  },
  {
    path: 'chat', component: ChatComponent,
  },
  {
    path: 'chat/:id', component: ChatDetailsComponent,
  },
  {
    path: 'nuevo', component: NewChatComponent,
  },
  {
    path: '**', redirectTo: 'chat',
  }
];
