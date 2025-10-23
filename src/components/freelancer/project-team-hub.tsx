'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Clock,
  Send,
  Users,
  Paperclip,
  MessageSquareWarning,
  CircleDot,
  FileCheck2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const project = {
  name: 'E-commerce Platform',
  deliverable: 'Frontend Development',
  status: 'In Progress',
};

const teamMembers = [
  {
    name: 'Ethan Davis',
    role: 'Team Lead',
    avatar: 'https://picsum.photos/seed/freelancer-avatar/100/100',
  },
  {
    name: 'Olivia Smith',
    role: 'UI/UX Designer',
    avatar: 'https://picsum.photos/seed/olivia/100/100',
  },
  {
    name: 'Liam Brown',
    role: 'QA Tester',
    avatar: 'https://picsum.photos/seed/liam/100/100',
  },
];

const initialChecklist = [
  { id: 'task-1', label: 'Component library setup', completed: true },
  { id: 'task-2', label: 'Product page development', completed: true },
  { id: 'task-3', label: 'Shopping cart implementation', completed: false },
  { id: 'task-4', label: 'Code review and linting', completed: false },
];

type ReviewStatus = 'Not Submitted' | 'In PM Review' | 'Sent Back by PM' | 'In Client Review' | 'Approved';

export function ProjectTeamHub() {
  const [checklist, setChecklist] = useState(initialChecklist);
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>('Not Submitted');
  const [pmComments, setPmComments] = useState('');
  const { toast } = useToast();

  const handleChecklistItem = (id: string, checked: boolean) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, completed: checked } : item)));
  };

  const allTasksCompleted = checklist.every((item) => item.completed);

  const handleSubmitToPM = () => {
    if (allTasksCompleted) {
      setReviewStatus('In PM Review');
      toast({
        title: 'Submitted for PM Review',
        description: 'Your deliverable has been sent to the project manager.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Incomplete Checklist',
        description: 'Please complete all internal checklist items before submitting.',
      });
    }
  };
  
  // This would be triggered by the PM in their portal
  const simulatePmFeedback = () => {
      setReviewStatus('Sent Back by PM');
      setPmComments('Client feedback: Please adjust the color palette on the product cards to better match the brand guide. Otherwise, looking good.');
  }

  const getStatusIcon = (status: ReviewStatus) => {
    switch(status) {
        case 'Not Submitted': return <CircleDot className="h-5 w-5 text-muted-foreground" />;
        case 'In PM Review': return <Clock className="h-5 w-5 text-yellow-500" />;
        case 'Sent Back by PM': return <MessageSquareWarning className="h-5 w-5 text-destructive" />;
        case 'In Client Review': return <Clock className="h-5 w-5 text-blue-500" />;
        case 'Approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  }


  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{project.name}: {project.deliverable}</CardTitle>
            <CardDescription>
              Status: <Badge>{project.status}</Badge>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck2 /> Internal Deliverables Checklist
            </CardTitle>
            <CardDescription>
              Ensure all items are completed before submitting to the PM for review.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {checklist.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-md">
                <Checkbox
                  id={item.id}
                  checked={item.completed}
                  onCheckedChange={(checked) => handleChecklistItem(item.id, Boolean(checked))}
                />
                <Label htmlFor={item.id} className={`flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {item.label}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
             <Send /> Submission & Review Queue
            </CardTitle>
            <CardDescription>
                Submit your work and track its progress through the review cycle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-md border bg-muted/30">
                <div className="flex items-center gap-3">
                    {getStatusIcon(reviewStatus)}
                    <span className="font-medium">{reviewStatus}</span>
                </div>
                {reviewStatus === 'Not Submitted' && (
                    <Button onClick={handleSubmitToPM} disabled={!allTasksCompleted}>
                        Submit to PM
                    </Button>
                )}
                 {reviewStatus === 'Sent Back by PM' && (
                    <Button onClick={handleSubmitToPM}>
                        Re-submit to PM
                    </Button>
                )}
            </div>
            {reviewStatus === 'Sent Back by PM' && pmComments && (
                <Card className="bg-destructive/10 border-destructive">
                    <CardHeader>
                        <CardTitle className="text-base text-destructive flex items-center gap-2"><MessageSquareWarning />PM Feedback</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-destructive-foreground">{pmComments}</p>
                    </CardContent>
                </Card>
            )}
            <div className="flex justify-center">
                 {/* This is a mock button to simulate PM action */}
                <Button variant="link" size="sm" onClick={simulatePmFeedback} className={reviewStatus === 'In PM Review' ? '' : 'hidden'}>
                    (Simulate PM Sending Feedback)
                </Button>
            </div>
          </CardContent>
        </Card>

      </div>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users /> Team Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={member.avatar} data-ai-hint="person avatar"/>
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Internal Team Chat</CardTitle>
                <CardDescription>Visible only to your team.</CardDescription>
            </Header>
            <CardContent>
                <p className="text-sm text-muted-foreground">Internal chat coming soon...</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
