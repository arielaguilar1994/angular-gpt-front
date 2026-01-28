import { Component, inject, signal } from '@angular/core';
import {
  ChatMessage,
  GptMessageEditableImage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from '@components/index';
import { IMessage } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox, GptMessageEditableImage],
  templateUrl: './image-tunning-page.html',
  styleUrl: './image-tunning-page.css',
})
export default class ImageTunningPage {
  public messages = signal<IMessage[]>([
    {
      isGpt: true,
      text: 'Dummy message',
      imageInfo: {
        url: 'http://localhost:3000/api/gpt/image-generation/1769604117547.png',
        alt: 'some alte here',
      },
    },
  ]);
  public isLoading = signal(false);
  public originalImage = signal<string | undefined>(undefined);
  public maskImage = signal<string | undefined>(undefined);

  private readonly openAiService = inject(OpenAiService);

  handleMessage(event: string): void {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: event, isGpt: false }]);

    this.openAiService.imageGeneration(event, this.originalImage(), this.maskImage()).subscribe({
      next: (response) => {
        if (!response) return;

        this.messages.update((prev) => [
          ...prev,
          {
            isGpt: true,
            text: response.alt || 'Here is the image I generated for you.',
            imageInfo: response,
          },
        ]);
        this.isLoading.set(false);
      },
    });
  }

  generateVariation() {
    if (!this.originalImage()) return;

    this.isLoading.set(true);
    this.openAiService.imageVariation(this.originalImage()!).subscribe({
      next: (resp) => {
        if (!resp) return;

        this.messages.update((prev) => [
          ...prev,
          {
            isGpt: true,
            text: resp.alt || 'Here is the image I generated for you.',
            imageInfo: resp,
          },
        ]);
        this.isLoading.set(false);
      },
    });
  }

  onEditImage(newImage: string, originalImage: string) {
    console.log(newImage, originalImage);
    this.maskImage.set(newImage);
    this.originalImage.set(originalImage);
  }
}
