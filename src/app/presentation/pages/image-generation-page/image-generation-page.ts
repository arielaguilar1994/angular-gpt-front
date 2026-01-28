import { Component, inject, signal } from '@angular/core';
import { ChatMessage, MyMessage, TextMessageBox, TypingLoader } from '@components/index';
import { IMessage } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-generation-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox],
  templateUrl: './image-generation-page.html',
  styleUrl: './image-generation-page.css',
})
export default class ImageGenerationPage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);

  private readonly openAiService = inject(OpenAiService);

  handleMessage(event: string): void {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: event, isGpt: false }]);

    this.openAiService.imageGeneration(event).subscribe({
      next: (response) => {
        if (!response) return;

        this.messages.update((prev) => [
          ...prev,
          {
            isGpt: true,
            text: response.alt || 'Here is the image I generated for you.',
            imageInfo: response
          }
        ])
        this.isLoading.set(false);
      }
    })
  }
}
