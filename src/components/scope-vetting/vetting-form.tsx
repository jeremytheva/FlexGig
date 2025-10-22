'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  aiScopeVetting,
  AiScopeVettingOutput,
} from '@/ai/flows/ai-scope-vetting';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ListChecks, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  projectDescription: z.string().min(50, 'Please provide a detailed project description of at least 50 characters.'),
});

export function VettingForm() {
  const [result, setResult] = useState<AiScopeVettingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await aiScopeVetting(values);
      setResult(response);
    } catch (error) {
      console.error('Error vetting scope:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to analyze the project scope. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Build a responsive e-commerce website with user authentication, product catalog, shopping cart, and Stripe integration..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Scope
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div>
        {isLoading && (
          <Card className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">AI is analyzing the scope...</p>
            </div>
          </Card>
        )}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="text-destructive"/>Scope Risk Analysis</h3>
                <div className="flex items-center gap-4">
                   <Progress value={result.scopeRiskScore} className="w-full h-4" />
                   <span className="font-bold text-lg">{result.scopeRiskScore}/100</span>
                </div>
                 <ul className="list-disc pl-5 space-y-2 text-sm mt-4">
                  {result.riskFactors.map((factor, i) => <li key={i}>{factor}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2"><ListChecks className="text-primary"/>Clarifying Questions</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {result.clarifyingQuestions.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
