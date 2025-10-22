'use server';
/**
 * @fileOverview Matches projects to freelancers based on skills, availability, and PM workload.
 *
 * - matchProjectToFreelancer - A function that handles the matching process.
 * - MatchProjectToFreelancerInput - The input type for the matchProjectToFreelancer function.
 * - MatchProjectToFreelancerOutput - The return type for the matchProjectToFreelancer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchProjectToFreelancerInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A detailed description of the project requirements.'),
  requiredSkills: z.array(z.string()).describe('An array of required skills for the project.'),
  projectTimeline: z.string().describe('The project timeline and deadlines.'),
  projectBudget: z.string().describe('The budget allocated for the project.'),
  projectManagerWorkload: z
    .string()
    .describe('The current workload of the project manager.'),
});
export type MatchProjectToFreelancerInput = z.infer<typeof MatchProjectToFreelancerInputSchema>;

const MatchProjectToFreelancerOutputSchema = z.object({
  freelancerMatches: z.array(
    z.object({
      freelancerId: z.string().describe('The unique identifier of the freelancer.'),
      name: z.string().describe('The name of the freelancer.'),
      skills: z.array(z.string()).describe('The skills possessed by the freelancer.'),
      availability: z.string().describe('The availability of the freelancer.'),
      matchScore: z.number().describe('A score indicating how well the freelancer matches the project.'),
      justification: z
        .string()
        .describe('Explanation of why the freelancer is a good match for the project'),
    })
  ).describe('A list of freelancers who are a good match for the project.'),
});
export type MatchProjectToFreelancerOutput = z.infer<typeof MatchProjectToFreelancerOutputSchema>;

export async function matchProjectToFreelancer(
  input: MatchProjectToFreelancerInput
): Promise<MatchProjectToFreelancerOutput> {
  return matchProjectToFreelancerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchProjectToFreelancerPrompt',
  input: {schema: MatchProjectToFreelancerInputSchema},
  output: {schema: MatchProjectToFreelancerOutputSchema},
  prompt: `You are an expert at matching projects to the best-suited freelancers.

Given the following project details, identify the freelancers who would be the best fit.

Project Description: {{{projectDescription}}}
Required Skills: {{#each requiredSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Project Timeline: {{{projectTimeline}}}
Project Budget: {{{projectBudget}}}
Project Manager Workload: {{{projectManagerWorkload}}}

Consider freelancer skills, availability, and the project manager's current workload when making your recommendations. Explain your reasoning for each match.

Output a JSON array of freelancer matches, including their ID, name, skills, availability, match score (0-100), and a justification for the match. Ensure that the output matches the MatchProjectToFreelancerOutputSchema. Limit the number of results to maximum of 5 best matches.
`,
});

const matchProjectToFreelancerFlow = ai.defineFlow(
  {
    name: 'matchProjectToFreelancerFlow',
    inputSchema: MatchProjectToFreelancerInputSchema,
    outputSchema: MatchProjectToFreelancerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
