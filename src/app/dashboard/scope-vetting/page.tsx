import { VettingForm } from '@/components/scope-vetting/vetting-form';

export default function ScopeVettingPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">AI-Powered Scope Vetting</h1>
        <p className="text-muted-foreground">
          Assess project feasibility and identify potential risks early. Paste the project description below.
        </p>
      </header>
      <VettingForm />
    </div>
  );
}
