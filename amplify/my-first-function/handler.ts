import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  // your function code goes here
  const { name } = event.arguments
  return `<h1>Hello  ${name}!<h1>`;
};