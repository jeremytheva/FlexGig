'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  matchProjectToFreelancer,
  MatchProjectToFreelancerOutput,
} from '@/ai/flows/project-freelancer-matching';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  projectDescription: z.string().min(20, 'Please provide a project description.'),
  requiredSkills: z.string().min(3, 'Please list required skills, separated by commas.'),
  projectTimeline: z.string().min(3, 'Please specify the project timeline.'),
  projectBudget: z.string().min(1, 'Please specify the project budget.'),
  projectManagerWorkload: z.string().min(3, 'Please describe the PM workload.'),
});

export function MatchingForm() {
  const [result, setResult] = useState<MatchProjectToFreelancerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescription: '',
      requiredSkills: '',
      projectTimeline: '3 months',
      projectBudget: '$10,000',
      projectManagerWorkload: 'Medium',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await matchProjectToFreelancer({
        ...values,
        requiredSkills: values.requiredSkills.split(',').map(s => s.trim()),
      });
      setResult(response);
    } catch (error) {
      console.error('Error matching freelancers:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to find freelancer matches. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the project..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requiredSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Skills</FormLabel>
                      <FormControl>
                        <Input placeholder="React, Node.js, ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectTimeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Timeline</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3 months" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectBudget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Budget</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $10,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectManagerWorkload"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PM Workload</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Low, Medium, High" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Zap className="mr-2 h-4 w-4" /> Find Matches
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center pt-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <div>
          <h2 className="text-2xl font-bold font-headline mb-4">Top Matches</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.freelancerMatches.map((match) => (
              <Card key={match.freelancerId} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://picsum.photos/seed/${match.freelancerId}/100/100`} data-ai-hint="person avatar" />
                      <AvatarFallback>{match.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{match.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{match.availability}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Match Score</span>
                    <Badge variant="default" className="flex items-center gap-1">
                      <Star className="h-4 w-4"/>
                      {match.matchScore} / 100
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {match.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </div>
                  </div>
                  <CardDescription>{match.justification}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
