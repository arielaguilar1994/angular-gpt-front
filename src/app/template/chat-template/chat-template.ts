import { Component, inject, signal } from '@angular/core';
import { ChatMessage } from '@components/chat-bubbles/chat-message/chat-message';
import { MyMessage } from '@components/chat-bubbles/my-message/my-message';
import { TextMessageBox } from '@components/text-boxes/text-message-box/text-message-box';
import { TypingLoader } from '@components/typing-loader/typing-loader';
import { IMessage } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-chat-template',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './chat-template.html',
})
export class ChatTemplate {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);

  private readonly openAiService = inject(OpenAiService);

  handleMessage(event: string): void {
    console.log({prompt: event});
  }
}
