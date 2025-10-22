import { MatchingForm } from '@/components/matching/matching-form';

export default function MatchingPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Intelligent Freelancer Matching</h1>
        <p className="text-muted-foreground">
          Describe your project and we'll find the perfect freelancers from our talent pool.
        </p>
      </header>
      <MatchingForm />
    </div>
  );
}
