import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-interface',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-interface.html',
  styleUrl: './chat-interface.scss'
})
export class ChatInterface implements AfterViewInit {
  @ViewChild('chatMessages') chatMessages!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;
  @Input() isOpen = false;
  @Output() closeChat = new EventEmitter<void>();

  userMessage = '';

  ngAfterViewInit() {
    // Scroll to bottom of chat messages
    this.scrollToBottom();
  }

  onCloseChat() {
    this.closeChat.emit();
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      // Add user message
      this.addMessage(this.userMessage, 'user');
      
      // Simulate bot response
      setTimeout(() => {
        this.addBotResponse(this.userMessage);
      }, 1000);
      
      this.userMessage = '';
    }
  }

  private addMessage(message: string, type: 'user' | 'bot') {
    const messagesContainer = this.chatMessages.nativeElement;
    const messageDiv = document.createElement('div');
    messageDiv.className = `ps-message ps-${type}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'ps-message-content';
    contentDiv.textContent = message;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    this.scrollToBottom();
  }

  private addBotResponse(userMessage: string) {
    const responses = [
      'Tak for din besked! Jeg vil gerne hjælpe dig med det.',
      'Det er et godt spørgsmål. Lad mig tjekke det for dig.',
      'Jeg kan se du har brug for hjælp. Hvad mere kan jeg hjælpe med?',
      'Perfekt! Jeg noterer det ned og vender tilbage til dig snart.',
      'Det lyder interessant! Kan du fortælle mig mere om det?'
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    this.addMessage(randomResponse, 'bot');
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatMessages) {
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
