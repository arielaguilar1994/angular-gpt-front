import { environment } from "environments/environment";

// generator function docu(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
export async function* proConsStreamUseCase(prompt: string, abortSignal: AbortSignal) {
  try {
    const response = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal
    });

    if (!response.ok) throw new Error('Some error ocurred when try to get answer');

    // const reader = response.body?.getReader();

    // Alternativa a TextDecoder()
    const responseStream = response.body?.pipeThrough(new TextDecoderStream());
    const reader = responseStream?.getReader();
    
    if(!reader) throw new Error('Cannot generate the reader');

    // const decoder = new TextDecoder();
    let text = '';

    while(true) {
      const { value, done } = await reader.read();

      if(done) {
        break;
      }
    
      // text += decoder.decode(value, { stream: true });
      text += value;
      yield text; //para el stream e ir emitiendo valores
    }
    return text;
  } catch (error) {
    console.log(error);
    return null;
  }
};