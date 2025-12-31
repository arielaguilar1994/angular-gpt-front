import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface ITextMessageEvent {
  file?: File | null,
  prompt?: string | null
}

@Component({
  selector: 'app-text-message-box-file',
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-file.html',
})
export class TextMessageBoxFile {
  placeholder = input('');
  disableCorrections = input(false);
  onMessage = output<ITextMessageEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [],
    file: [null, Validators.required]
  })

  public file: File | undefined;

  handleSelectedFile(event: any): void {
    const file = event.target?.files.item(0);
    if (file) {
      this.form.controls.file.setValue(file);
    }
  }

  handleSubmit(): void {
    if (this.form.invalid) return;

    const { prompt, file } = this.form.value;
    this.onMessage.emit({ prompt, file });
    this.form.reset();
  }
}
