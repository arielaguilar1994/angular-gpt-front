import { Injectable } from '@angular/core';
import { IProConsResponse } from '@interfaces/pro-cons.response';
import { orthographyUseCase, proConsDiscusser } from '@use-cases/index';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  proCons(prompt: string) {
    return from(proConsDiscusser(prompt)).pipe(
      map((response) => {
        return {
          text: response.parts[0]?.text ?? '',
          role: response.role,
        } as IProConsResponse;
      })
    );
  }
}
