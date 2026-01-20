import { environment } from "environments/environment"

export const transformTextToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const response = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice })
    });

    if(!response.ok) throw new Error('The audio could not be generated');

    const audioFile = await response.blob();
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioUrl
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Some error ocurred to transform text to audio',
      audioUrl: null
    }
  }
}