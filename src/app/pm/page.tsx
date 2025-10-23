
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, DollarSign, Activity } from "lucide-react";
import { projects, freelancers } from "@/lib/mock-data";
import { CapacityChart } from "@/components/dashboard/capacity-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@/lib/mock-data";

const statusVariantMap: { [key: string]: "default" | "destructive" | "secondary" } = {
  "Active": "default",
  "At Risk": "destructive",
  "Completed": "secondary",
};

function ProjectTable({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return <p className="text-muted-foreground text-center p-8">No projects in this category.</p>;
    }

    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.id}>
                <TableCell>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">PM: {project.pm}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[project.status]}>{project.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                    <p className="font-medium">${project.budget.toLocaleString()}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );
}

export default function PmDashboardPage() {
  const activeProjects = projects.filter(p => p.status === 'Active');
  const atRiskProjects = projects.filter(p => p.status === 'At Risk');
  const completedProjects = projects.filter(p => p.status === 'Completed');
  const availableFreelancers = freelancers.filter(f => f.capacity < 100).length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">PM Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a real-time overview of your projects and team.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">Projects currently in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Freelancers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableFreelancers}</div>
            <p className="text-xs text-muted-foreground">Talent with current capacity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget Managed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">Overall project status is stable</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Freelancer Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <CapacityChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <Tabs defaultValue="active">
                <CardHeader>
                    <CardTitle>All Projects</CardTitle>
                     <TabsList className="grid w-full grid-cols-3 mt-2">
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="at-risk">At Risk</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <CardContent className="p-0">
                    <TabsContent value="active">
                        <ProjectTable projects={activeProjects} />
                    </TabsContent>
                    <TabsContent value="at-risk">
                        <ProjectTable projects={atRiskProjects} />
                    </TabsContent>
                    <TabsContent value="completed">
                        <ProjectTable projects={completedProjects} />
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
      </div>
    </div>
  );
}
