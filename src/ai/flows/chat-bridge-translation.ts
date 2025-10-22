'use server';

/**
 * @fileOverview Implements a Genkit flow for translating and filtering messages in a three-way chat between a client, freelancer, and project manager.
 *
 * - `translateAndFilterMessage` - A function that translates messages between participants and filters out irrelevant details.
 * - `ChatBridgeInput` - The input type for the `translateAndFilterMessage` function, including sender, receiver, and message content.
 * - `ChatBridgeOutput` - The return type for the `translateAndFilterMessage` function, providing the translated and filtered message.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatBridgeInputSchema = z.object({
  sender: z.enum(['client', 'freelancer']).describe('The sender of the message.'),
  receiver: z.enum(['client', 'freelancer', 'pm']).describe('The intended receiver of the message.  PM stands for Project Manager'),
  message: z.string().describe('The original message content.'),
  projectDetails: z.string().optional().describe('Details about the project for context.'),
});
export type ChatBridgeInput = z.infer<typeof ChatBridgeInputSchema>;

const ChatBridgeOutputSchema = z.object({
  translatedMessage: z.string().describe('The translated and filtered message content.'),
});
export type ChatBridgeOutput = z.infer<typeof ChatBridgeOutputSchema>;

export async function translateAndFilterMessage(
  input: ChatBridgeInput
): Promise<ChatBridgeOutput> {
  return chatBridgeFlow(input);
}

const chatBridgePrompt = ai.definePrompt({
  name: 'chatBridgePrompt',
  input: {schema: ChatBridgeInputSchema},
  output: {schema: ChatBridgeOutputSchema},
  prompt: `You are a project manager acting as a communication bridge between a client and a freelancer.
Your role is to:
1.  Translate messages between the client and freelancer.
2.  Filter out any irrelevant details to maintain project quality and focus.
3.  Ensure clear and concise communication.

Project Details: {{{projectDetails}}}

Original Message from {{sender}} to {{receiver}}:
{{{message}}}

Translated and Filtered Message:
`,
});

const chatBridgeFlow = ai.defineFlow(
  {
    name: 'chatBridgeFlow',
    inputSchema: ChatBridgeInputSchema,
    outputSchema: ChatBridgeOutputSchema,
  },
  async input => {
    const {output} = await chatBridgePrompt(input);
    return output!;
  }
);
