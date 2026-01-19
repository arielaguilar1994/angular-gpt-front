import { ITranslateResponse } from "@interfaces/index";
import { environment } from "environments/environment";

export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const response = await fetch(`${environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, lang })
    });

    if (!response.ok) throw new Error ('Error on request to translate');

    const { message } = await response.json() as ITranslateResponse;

    return {
      ok: true,
      message
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Some error ocurred!'
    };
  }
};