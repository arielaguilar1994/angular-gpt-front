import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface ISelectOption {
  id: string;
  text: string;
}

export interface ITextMessageBoxEventSelect {
  prompt: string;
  selectedOption: string;
}

@Component({
  selector: 'app-text-message-box-select',
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-select.html',
})
export class TextMessageBoxSelect {
  placeholder = input('');
  options = input.required<ISelectOption[]>();
  onMessage = output<ITextMessageBoxEventSelect>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOption: ['', Validators.required]
  })

  handleSubmit(): void {
    if (this.form.invalid) return;

    const { prompt, selectedOption } = this.form.value;
    this.onMessage.emit({ prompt: prompt!, selectedOption: selectedOption! });
    this.form.reset();
  }
}
