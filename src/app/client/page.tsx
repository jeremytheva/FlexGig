'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, ArrowUpCircle, FileText, Save, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectTemplates } from '@/components/client/project-templates';

const project = {
  name: 'E-commerce Platform',
  client: 'Global Retail Inc.',
  budget: 50000,
  timeline: '3 months',
  progress: 65,
  status: 'Active',
  freelancer: 'Ethan Davis',
  deliverables: [
    { id: 1, name: 'UI/UX Wireframes', status: 'Approved' },
    { id: 2, name: 'Frontend Development', status: 'In Review' },
    { id: 3, name: 'Backend API', status: 'Pending' },
  ],
};

export default function ProjectPage() {
  const { toast } = useToast();
  const [revisionCount, setRevisionCount] = useState(0);
  const [deliverables, setDeliverables] = useState(project.deliverables);
  
  const handleApprove = (id: number) => {
    setDeliverables(deliverables.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
    toast({
      title: "Deliverable Approved",
      description: "Funds for this milestone have been released to the freelancer.",
    });
  };

  const handleRevisionRequest = () => {
    setRevisionCount(prev => prev + 1);
    toast({
      title: "Revision Requested",
      description: `You have requested revision ${revisionCount + 1}.`,
    });
  };

  const handleUpsell = () => {
    toast({
      title: "Upgrade Request Sent",
      description: "A project manager will contact you shortly to discuss upgrading to Managed Service for dedicated support.",
    });
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Project Saved as Template",
      description: `"${project.name}" has been saved to your templates.`,
    });
  };
  
  const handleNewProject = () => {
    toast({
      title: "New Project Started",
      description: "A project manager will be in touch shortly to scope your new project.",
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Projects</h1>
          <p className="text-muted-foreground">Manage your active and past projects.</p>
        </div>
        <Button onClick={handleNewProject}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
        </Button>
      </header>

      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
            <div>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>Client: {project.client}</CardDescription>
            </div>
            <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>{project.status}</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Budget</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${project.budget.toLocaleString()}</div>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{project.timeline}</div>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={project.progress} className="mb-2" />
                    <p className="text-2xl font-bold text-right">{project.progress}%</p>
                </CardContent>
                </Card>
            </div>

            <div>
                <h3 className="font-semibold mb-2">Deliverables & Approval</h3>
                <div className="space-y-4">
                    {deliverables.map(d => (
                    <div key={d.id} className="flex items-center justify-between p-3 rounded-md border">
                        <div className="flex items-center gap-3">
                            {d.status === 'Approved' && <CheckCircle className="h-5 w-5 text-green-500"/>}
                            {d.status === 'In Review' && <Clock className="h-5 w-5 text-yellow-500"/>}
                            {d.status === 'Pending' && <AlertTriangle className="h-5 w-5 text-muted-foreground"/>}
                            <span className="font-medium">{d.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                        <Badge variant={d.status === 'Approved' ? 'secondary' : 'outline'}>{d.status}</Badge>
                        {d.status === 'In Review' && (
                            <Button size="sm" onClick={() => handleApprove(d.id)}>Approve</Button>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Project Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
                <h3 className="font-semibold">Need a change?</h3>
                <p className="text-sm text-muted-foreground">Request a revision from the freelancer. You have made {revisionCount} revision requests.</p>
            </div>
            <Button variant="outline" onClick={handleRevisionRequest}>Request Revision</Button>
        </CardContent>
        <CardContent className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-t pt-6">
            <div>
                <h3 className="font-semibold">Re-order this project?</h3>
                <p className="text-sm text-muted-foreground">Save this project's scope and settings as a template for future use.</p>
            </div>
            <Button variant="outline" onClick={handleSaveTemplate}><Save className="mr-2 h-4 w-4" /> Save as Template</Button>
        </CardContent>
         {revisionCount >= 2 && (
            <CardContent className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-t pt-6 mt-4 bg-accent/10">
                <div>
                    <h3 className="font-semibold flex items-center gap-2 text-accent"><ArrowUpCircle />Need More Help?</h3>
                    <p className="text-sm text-muted-foreground">For complex changes or dedicated oversight, consider upgrading to our Managed Service.</p>
                </div>
                <Button onClick={handleUpsell}>Upgrade to Managed</Button>
            </CardContent>
        )}
      </Card>

      <ProjectTemplates />
    </div>
  );
}
