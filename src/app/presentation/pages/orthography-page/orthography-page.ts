import { Component, inject, signal } from '@angular/core';
import { MyMessage } from '@components/chat-bubbles/my-message/my-message';
import { ChatMessage, GptMessageOrthography } from '@components/index';
import { TextMessageBox } from '@components/text-boxes/text-message-box/text-message-box';
import { TypingLoader } from '@components/typing-loader/typing-loader';
import { IMessage } from '@interfaces/index';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-orthography-page',
  imports: [GptMessageOrthography, ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './orthography-page.html',
  styleUrl: './orthography-page.css',
})
export default class OrthographyPage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);

  private readonly openAiService = inject(OpenAiService);

  handleMessage(event: string): void {
    console.log({prompt: event});
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: event
      }
    ]);

    this.openAiService.checkOrthography(event).pipe(
      first(),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (resp) => {
        this.messages.update((prev) => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
            info: resp
          }
        ]);
      }
    })
  }
}
