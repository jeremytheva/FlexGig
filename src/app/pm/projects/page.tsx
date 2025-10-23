'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, ArrowUpCircle, FileText, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const project = {
  name: 'E-commerce Platform',
  client: 'Global Retail Inc.',
  budget: 50000,
  timeline: '3 months',
  progress: 65,
  status: 'Active',
  freelancer: 'Ethan Davis',
  deliverables: [
    { id: 1, name: 'UI/UX Wireframes', status: 'Approved', freelancer: 'Olivia Smith' },
    { id: 2, name: 'Frontend Development', status: 'In Review', freelancer: 'Ethan Davis' },
    { id: 3, name: 'Backend API', status: 'Pending', freelancer: 'Ethan Davis' },
  ],
};

export default function PmProjectPage() {
  const { toast } = useToast();
  const [deliverables, setDeliverables] = useState(project.deliverables);
  
  const sendToClient = (id: number) => {
     setDeliverables(deliverables.map(d => d.id === id ? { ...d, status: 'In Client Review' as any } : d));
    toast({
      title: "Deliverable Sent to Client",
      description: "The deliverable is now awaiting client approval.",
    });
  };

  const requestRevisions = (id: number) => {
    setDeliverables(deliverables.map(d => d.id === id ? { ...d, status: 'Revisions Requested' as any } : d));
    toast({
        variant: "destructive",
      title: "Revisions Requested",
      description: "The deliverable has been sent back to the freelancer with your comments.",
    });
  };


  return (
    <div className="space-y-8">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline">{project.name}</h1>
          <p className="text-muted-foreground">Client: {project.client} / Freelancer: {project.freelancer}</p>
        </div>
        <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>{project.status}</Badge>
      </header>

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

      <Card>
        <CardHeader>
          <CardTitle>Deliverables Review</CardTitle>
          <CardDescription>Review freelancer submissions before sending them to the client.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliverables.map(d => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-3">
                    {d.status === 'Approved' && <CheckCircle className="h-5 w-5 text-green-500"/>}
                    {d.status === 'In Review' && <Clock className="h-5 w-5 text-yellow-500"/>}
                    {d.status === 'Pending' && <AlertTriangle className="h-5 w-5 text-muted-foreground"/>}
                    {d.status === 'In Client Review' && <Send className="h-5 w-5 text-blue-500"/>}
                    {d.status === 'Revisions Requested' && <AlertTriangle className="h-5 w-5 text-destructive"/>}
                    <div>
                        <span className="font-medium">{d.name}</span>
                        <p className="text-sm text-muted-foreground">From: {d.freelancer}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                      d.status === 'Approved' ? 'secondary' 
                      : d.status === 'Revisions Requested' ? 'destructive'
                      : 'outline'
                    }>{d.status}</Badge>
                  {d.status === 'In Review' && (
                    <>
                        <Button size="sm" variant="outline" onClick={() => requestRevisions(d.id)}>Request Revisions</Button>
                        <Button size="sm" onClick={() => sendToClient(d.id)}>Send to Client</Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
