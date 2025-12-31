import { Component, inject, signal } from '@angular/core';
import { ChatMessage } from '@components/chat-bubbles/chat-message/chat-message';
import { MyMessage } from '@components/chat-bubbles/my-message/my-message';
import { ITextMessageEvent, TextMessageBoxFile } from '@components/text-boxes/text-message-box-file/text-message-box-file';
import { ITextMessageBoxEventSelect, TextMessageBoxSelect } from '@components/text-boxes/text-message-box-select/text-message-box-select';
import { TextMessageBox } from '@components/text-boxes/text-message-box/text-message-box';
import { TypingLoader } from '@components/typing-loader/typing-loader';
import { IMessage } from '@interfaces/index';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-orthography-page',
  imports: [ChatMessage, MyMessage, TypingLoader, TextMessageBox, TextMessageBoxFile, TextMessageBoxSelect],
  templateUrl: './orthography-page.html',
  styleUrl: './orthography-page.css',
})
export default class OrthographyPage {
  public messages = signal<IMessage[]>([{ text: 'dime que quieres consultar', isGpt: true }, { text: 'Tengo una consulta', isGpt: false }]);
  public isLoading = signal(false);

  private readonly openAiService = inject(OpenAiService);

  handleMessage(event: string): void {
    console.log({prompt: event});
  }

  handleMessageWithFile(event: ITextMessageEvent): void {
    console.log({prompt: event.prompt, file: event.file });
  }

  handleMessageWithSelect(event: ITextMessageBoxEventSelect): void {
    console.log({prompt: event.prompt, selectedOption: event.selectedOption });
  }
}
