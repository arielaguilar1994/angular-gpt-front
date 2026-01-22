import { Component, inject, signal } from '@angular/core';
import {
  ChatMessage,
  ITextMessageEvent,
  MyMessage,
  TextMessageBoxFile,
  TypingLoader,
} from '@components/index';
import { IMessage } from '@interfaces/message.interface';
import { ITranscriptionResponse } from '@interfaces/transcription.response';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBoxFile],
  templateUrl: './audio-to-text-page.html',
  styleUrl: './audio-to-text-page.css',
})
export default class AudioToTextPage {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);

  private readonly openAiService = inject(OpenAiService);

  handleMessageWithFile(event: ITextMessageEvent): void {
    this.isLoading.set(true);
    this.addMessage(`${event.prompt ?? event.file?.name}`, false);

    if (event.file) {
      this.openAiService.audioToText(event.file, event.prompt).subscribe({
        next: (response) => this.handleResponse(response),
      });
    }
  }

  private handleResponse( resp: ITranscriptionResponse | null ) {
    this.isLoading.set(false);
    if (!resp) return;

    const text = `## Transcription:
__Duracion:__ ${ Math.round( resp.duration ) } seconds.

## El Text is:
${ resp.text }`;

    this.addMessage(text, true);

    for (const segment of resp.segments) {
      const segmentMessage = `__Segment from ${ Math.round(segment.start) }s to ${ Math.round(segment.end) }s:__
      ${ segment.text }`;
      this.addMessage(segmentMessage, true);
    }
  }

  private addMessage(message: string, isGpt = true) {
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: isGpt,
        text: message,
      },
    ]);
  }
}
