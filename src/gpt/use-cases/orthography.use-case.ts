import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Te serán provistos textos con posibles errores ortográficos y gramaticales, por favor corrígelos.
                  Debes responder en formato JSON.
                  Tu tarea es corregir los errores ortográficos y gramaticales, retornar información de las soluciones.
                  Debes de dar un porcentaje de aciertos por el usuario (porcentaje de palabras bien escritas por el usuario).
                  Si no hay errores ortográficos o gramaticales, debes retornar un 100% de aciertos y un mensaje de felicitación.

                  La respuesta debe seguir siempre el siguiente formato, estructura de respuesta:
                  {
                    "userScore": number,
                    "errors": [
                      {
                        "original": string,
                        "corrected": string,
                      }
                      // Añade más errores si los hay
                    ],
                    "message": string // Mensaje de felicitación, usa emojis para darle un toque más amigable
                  }

                  Ejemplo respuesta:
                  {
                    "userScore": 90,
                    "errors": [
                      {
                        "original": "caye",
                        "corrected": "calle",
                      },
                      {
                        "original": "beyos",
                        "corrected": "bellos",
                      },
                      {
                        "original": "del",
                        "corrected": "de la",
                      }
                    ],
                    "message":  //mensajes aleatorios no tan largos
                  }
            `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.2,
    max_tokens: 200,
    response_format: {
      type: 'json_object',
    }
  });

  console.log(completion);
  console.log('completion.choices[0].message.content::: ', completion.choices[0].message.content)


  try {
    
    const jsonResponse = JSON.parse(completion.choices[0].message.content)
    return jsonResponse;
  } catch (error) {
     // display nest error
    console.log('error:::', error)
    
  }



  // return completion.choices[0].message.content

};
