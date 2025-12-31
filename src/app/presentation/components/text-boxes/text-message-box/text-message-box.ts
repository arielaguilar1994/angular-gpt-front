import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box.html',
})
export class TextMessageBox {
  placeholder = input('');
  disableCorrections = input(false);
  onMessage = output<string>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required]
  })

  handleSubmit(): void {
    if (this.form.invalid) return;

    const { prompt } = this.form.value;
    this.onMessage.emit(prompt ?? '');
    this.form.reset();
  }
}
