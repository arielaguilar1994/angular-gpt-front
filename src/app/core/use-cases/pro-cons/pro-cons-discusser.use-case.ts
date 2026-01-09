import { environment } from 'environments/environment';

export const proConsDiscusser = async (prompt: string) => {
  try {
    const response = await fetch(`${environment.backendApi}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if(!response.ok) throw new Error('Some error ocurred when try to get answer');

    const data = await response.json();
    return {
      ok: true,
      ...data
    };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      role: 'None',
      text: error
    };
  }
};
