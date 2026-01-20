import { Component, inject, signal } from '@angular/core';
import { ChatMessage, ITextMessageBoxEventSelect, MyMessage, TextMessageBoxSelect, TypingLoader } from '@components/index';
import { IMessage } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-text-to-audio-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBoxSelect],
  templateUrl: './text-to-audio-page.html',
  styleUrl: './text-to-audio-page.css',
})
export default class TextToAudioPage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);

  public data = signal([
    { id: 'Kore', text: 'Kore' },
    { id: 'Orus', text: 'Orus' },
    { id: 'Autonoe', text: 'Autonoe' },
    { id: 'Umbriel', text: 'Umbriel' },
    { id: 'Erinome', text: 'Erinome' },
    { id: 'Laomedeia', text: 'Laomedeia' },
    { id: 'Schedar', text: 'Schedar' },
    { id: 'Achird', text: 'Achird' },
    { id: 'Puck', text: 'Puck' },
    { id: 'Fenrir', text: 'Fenrir' },
  ]);

  private readonly openAiService = inject(OpenAiService);

  handleMessageWithSelect(event: ITextMessageBoxEventSelect): void {
    this.isLoading.set(true);
    this.addMessage(`${ event.selectedOption } - ${ event.prompt }`, false);

    this.transforme(event);
  }

  private transforme(event: ITextMessageBoxEventSelect) {
    this.openAiService.transformToAudio(event.prompt, event.selectedOption)
    .pipe(
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: ({ message, audioUrl }) => this.addMessage(message, true, audioUrl)
    });
  }

  private addMessage(message: string, isGpt = true, audioUrl?: string | null) {
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: isGpt,
        text: message,
        audioUrl: audioUrl
      }
    ]);
  }
}
