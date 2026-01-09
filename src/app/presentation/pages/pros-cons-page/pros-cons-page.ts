import { Component, inject, signal } from '@angular/core';
import { ChatMessage, MyMessage, TextMessageBox, TypingLoader } from '@components/index';
import { IMessage } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { finalize, first } from 'rxjs';

@Component({
  selector: 'app-pros-cons-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './pros-cons-page.html',
  styleUrl: './pros-cons-page.css',
})
export default class ProsConsPage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);

  private readonly openAiService = inject(OpenAiService);

  handleMessage(event: string): void {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: event,
      },
    ]);

    this.getAnswer(event);
  }

  private getAnswer(prompt: string): void {
    this.openAiService
      .proCons(prompt)
      .pipe(
        first(),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.messages.update((prev) => [
            ...prev,
            {
              isGpt: true,
              text: response.text
            }
          ]);
        },
      });
  }
}
