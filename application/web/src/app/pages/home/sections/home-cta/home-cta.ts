import { Component } from '@angular/core';
import { ChatInterface } from '../../../../shared/chat-interface/chat-interface';
import { ChatbotWidget } from '../../../../shared/chatbot-widget/chatbot-widget';

@Component({
  selector: 'app-home-cta',
  imports: [ChatInterface, ChatbotWidget],
  templateUrl: './home-cta.html',
  styleUrl: './home-cta.scss'
})
export class HomeCta {
  isChatOpen = false;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
}
