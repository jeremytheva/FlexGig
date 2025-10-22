import { ProjectTeamHub } from '@/components/freelancer/project-team-hub';

export default function FreelancerProjectsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Team Project Hub</h1>
        <p className="text-muted-foreground">
          Collaborate with your team and manage project deliverables.
        </p>
      </header>
      <ProjectTeamHub />
    </div>
  );
}
