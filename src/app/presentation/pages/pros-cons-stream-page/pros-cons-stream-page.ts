import { afterNextRender, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ChatMessage, MyMessage, TypingLoader, TextMessageBox } from '@components/index';
import { IMessage } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './pros-cons-stream-page.html',
  styleUrl: './pros-cons-stream-page.css',
})
export default class ProsConsStreamPage {
  public scrollContainer = viewChild<ElementRef>('scrollContainer');
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);
  public abortSignal = signal(new AbortController());

  private readonly openAiService = inject(OpenAiService);

  async handleMessage(event: string): Promise<void> {
    this.abortSignal().abort();
    this.abortSignal.set(new AbortController());

    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: event,
      },
      {
        isGpt: true,
        text: '...',
      },
    ]);

    const stream = this.openAiService.proConsStream(event, this.abortSignal().signal);
    this.isLoading.set(false);

    for await (const text of stream) {
      this.handelStreamResponse(text);
    }
  }

  private handelStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();

    this.messages.set([...messages, { isGpt: true, text: message }]);
  }
}
