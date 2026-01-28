import { Injectable } from '@angular/core';
import { IProConsResponse } from '@interfaces/pro-cons.response';
import {
  audioToTextUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  orthographyUseCase,
  proConsDiscusserUseCase,
  proConsStreamUseCase,
  transformTextToAudioUseCase,
  translateUseCase,
} from '@use-cases/index';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  proCons(prompt: string) {
    return from(proConsDiscusserUseCase(prompt)).pipe(
      map((response) => {
        return {
          text: response.parts[0]?.text ?? '',
          role: response.role,
        } as IProConsResponse;
      }),
    );
  }

  proConsStream(prompt: string, abortSignal: AbortSignal) {
    return proConsStreamUseCase(prompt, abortSignal);
  }

  translate(prompt: string, lang: string) {
    return from(translateUseCase(prompt, lang));
  }

  transformToAudio(prompt: string, voice: string) {
    return from(transformTextToAudioUseCase(prompt, voice));
  }

  audioToText(file: File, prompt?: string | null) {
    return from(audioToTextUseCase(file, prompt));
  }

  imageGeneration(prompt: string, image?: string, maskImage?: string) {
    return from(imageGenerationUseCase(prompt, image, maskImage))
  }

  imageVariation(image: string) {
    return from(imageVariationUseCase(image));
  }
}
