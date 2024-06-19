import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
            Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
            la respuesta debe de ser en formato markdown,
            los pros y contras deben de estar en una lista,

            Solo devuelve los pros y contras, no la pregunta o informacion adicional.
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.8,
    max_tokens: 400,
    response_format: {
      type: 'text',
    },
  });
  return response.choices[0].message;
};
