'use server';

/**
 * @fileOverview An AI-powered assistant for project managers to assess project feasibility and potential risks.
 *
 * - aiScopeVetting - A function that handles the scope vetting process.
 * - AiScopeVettingInput - The input type for the aiScopeVetting function.
 * - AiScopeVettingOutput - The return type for the aiScopeVetting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiScopeVettingInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A detailed description of the new project.'),
});
export type AiScopeVettingInput = z.infer<typeof AiScopeVettingInputSchema>;

const AiScopeVettingOutputSchema = z.object({
  clarifyingQuestions: z
    .array(z.string())
    .describe(
      'A list of clarifying questions for the project manager to ask the client.'
    ),
  scopeRiskScore: z
    .number()
    .describe(
      'A risk score from 0 to 100 indicating the potential risks associated with the project scope.'
    ),
  riskFactors: z
    .array(z.string())
    .describe('A list of risk factors identified in the project scope.'),
});
export type AiScopeVettingOutput = z.infer<typeof AiScopeVettingOutputSchema>;

export async function aiScopeVetting(
  input: AiScopeVettingInput
): Promise<AiScopeVettingOutput> {
  return aiScopeVettingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiScopeVettingPrompt',
  input: {schema: AiScopeVettingInputSchema},
  output: {schema: AiScopeVettingOutputSchema},
  prompt: `You are an AI assistant helping project managers assess the feasibility and potential risks of new projects.

  Based on the project description provided, generate a list of clarifying questions for the project manager to ask the client. Also, provide a risk score (0-100) indicating the potential risks associated with the project scope and list the risk factors you identified.

  Project Description: {{{projectDescription}}}
  Output should be in JSON format.
  `,
});

const aiScopeVettingFlow = ai.defineFlow(
  {
    name: 'aiScopeVettingFlow',
    inputSchema: AiScopeVettingInputSchema,
    outputSchema: AiScopeVettingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
