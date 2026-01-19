import { Component, inject, signal } from '@angular/core';
import { ChatMessage, MyMessage, TypingLoader, TextMessageBoxSelect, ITextMessageBoxEventSelect } from '@components/index';
import { IMessage } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-translate-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBoxSelect],
  templateUrl: './translate-page.html',
  styleUrl: './translate-page.css',
})
export default class TranslatePage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);

  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);

  private readonly openAiService = inject(OpenAiService);

  handleMessageWithSelect(event: ITextMessageBoxEventSelect): void {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: `${ event.prompt } To ${ event.selectedOption }`
      }
    ])

    this.translate(event);
    
  }

  private translate(event: ITextMessageBoxEventSelect) {
    this.openAiService.translate(event.prompt, event.selectedOption)
    .pipe(
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: ({ message }) => this.addMessage(message)
    });
  }

  private addMessage(message: string) {
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: true,
        text: message
      }
    ]);
  }
}
