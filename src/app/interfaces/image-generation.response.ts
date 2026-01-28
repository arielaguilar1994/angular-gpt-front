export interface ImageGenerationResponse {
  url: string;
  alt?: string;
}

export type GeneratedImage = ImageGenerationResponse | null;