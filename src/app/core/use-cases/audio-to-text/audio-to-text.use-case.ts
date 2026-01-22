import { ITranscriptionResponse } from "@interfaces/transcription.response";
import { environment } from "environments/environment";

export const audioToTextUseCase = async (file: File, prompt?: string | null) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    if (prompt) {
      formData.append('prompt', prompt);
    }

    const response = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'POST',
      body: formData
    });

    if(!response.ok) throw new Error('The audio could not be transcribed');

    const data = await response.json();

    return data as ITranscriptionResponse;
  } catch (error) {
    console.log('Some error ocurred to transcribe audio to text', error);
    return null;
  }
}