import { GeneratedImage, ImageGenerationResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const imageGenerationUseCase = async (promp: string, originalImage?: string): Promise<GeneratedImage> => {
  try {
    const resp = await fetch(`${environment.backendApi}/image-generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: promp, originalImage }),
    });

    // Este :alt es para renombrar la propiedad
    const { url, revised_prompt: alt } = await resp.json();

    return {
      url,
      alt,
    } as ImageGenerationResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
};
