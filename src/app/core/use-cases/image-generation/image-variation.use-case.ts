import { GeneratedImage, ImageGenerationResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const imageVariationUseCase = async (originalImage: string): Promise<GeneratedImage> => {
  try {
    const nameImage = getNameImageFromUrl(originalImage);
    const resp = await fetch(`${environment.backendApi}/image-variation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ baseImage: nameImage }),
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

const getNameImageFromUrl = (url?: string): string | undefined => {
  if(!url?.length) return undefined;

  const arrayParts = url.split('/');
  const arrayName = arrayParts[arrayParts.length - 1 ].split('.');
  return arrayName[0];
}