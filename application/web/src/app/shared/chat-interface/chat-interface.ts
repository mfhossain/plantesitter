import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CHAT_CONFIG } from './chat-config';
import { TwilioWhatsAppService } from './twilio-whatsapp.service';

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
  selectedChannel: 'whatsapp' = 'whatsapp';
  isSending = false;

  // Configuration
  config = CHAT_CONFIG;

  constructor(
    private twilioWhatsAppService: TwilioWhatsAppService
  ) {}

  ngAfterViewInit() {
    // Scroll to bottom of chat messages
    this.scrollToBottom();
  }

  onCloseChat() {
    this.closeChat.emit();
  }

  sendMessage() {
    if (this.userMessage.trim() && !this.isSending) {
      this.sendToWhatsApp();
    }
  }



  private sendToWhatsApp() {
    this.isSending = true;
    
    // Add user message to chat
    this.addMessage(this.userMessage, 'user');
    
    // Format WhatsApp message
    const formattedMessage = this.formatWhatsAppMessage(this.userMessage);
    
    // Check if direct API is enabled and configured
    if (this.config.whatsapp.useDirectAPI && this.twilioWhatsAppService.isConfigured()) {
      // Send directly via Twilio WhatsApp API
      this.addMessage('Jeg sender din besked direkte via WhatsApp...', 'bot');
      
      this.twilioWhatsAppService.sendToBusiness(formattedMessage).subscribe({
        next: (response: any) => {
          if (response.success) {
            // this.addMessage('✅ Din besked er blevet sendt direkte via WhatsApp!', 'bot');
          } else {
            this.addMessage('❌ Kunne ikke sende. Åbner WhatsApp web som backup...', 'bot');
            setTimeout(() => {
              this.twilioWhatsAppService.openWhatsAppWeb(formattedMessage);
            }, 1000);
          }
          this.isSending = false;
        },
        error: (error: any) => {
          console.error('Error:', error);
          this.addMessage('❌ Kunne ikke sende via API. Åbner WhatsApp web som backup...', 'bot');
          setTimeout(() => {
            this.twilioWhatsAppService.openWhatsAppWeb(formattedMessage);
          }, 1000);
          this.isSending = false;
        }
      });
    } else {
      // Fallback to web WhatsApp
      this.addMessage('Jeg åbner WhatsApp for dig. Din besked er klar til at blive sendt!', 'bot');
      
      setTimeout(() => {
        this.twilioWhatsAppService.openWhatsAppWeb(formattedMessage);
        this.isSending = false;
      }, 1500);
    }
    
    this.userMessage = '';
  }



  private formatWhatsAppMessage(message: string): string {
    const timestamp = new Date().toLocaleString('da-DK');
    const businessName = this.config.whatsapp.businessName;
    
    return `Hej ${businessName}!

Jeg har et spørgsmål:
${message}

Sendt fra PlanteSitter hjemmeside
${timestamp}`;
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



  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatMessages) {
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      }
    }, 100);
  }

  getPlaceholderText(): string {
    return 'Skriv din besked...';
  }
}
