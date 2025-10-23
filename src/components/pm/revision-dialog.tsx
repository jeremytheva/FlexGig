'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { Deliverable } from '@/app/pm/projects/page';
import Image from 'next/image';

interface RevisionDialogProps {
    deliverable: Deliverable;
    onConfirmRevision: (id: number, comments: string) => void;
    onConfirmSend: (id: number) => void;
}

export function RevisionDialog({ deliverable, onConfirmRevision, onConfirmSend }: RevisionDialogProps) {
    const [comments, setComments] = useState('');
    const [open, setOpen] = useState(false);

    const handleRequestRevisions = () => {
        if (comments.trim()) {
            onConfirmRevision(deliverable.id, comments);
            setOpen(false);
            setComments('');
        }
    }

    const handleSendToClient = () => {
        onConfirmSend(deliverable.id);
        setOpen(false);
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Review Deliverable: {deliverable.name}</DialogTitle>
          <DialogDescription>
            Review the deliverable. You can approve and send it to the client, or request revisions from the freelancer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Submitted Deliverable</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                           <Image 
                                src="https://picsum.photos/seed/deliverable-1/600/400" 
                                alt="Deliverable preview"
                                width={600}
                                height={400}
                                className="rounded-md"
                                data-ai-hint="website design"
                           />
                        </div>
                        <Button variant="link" className="w-full mt-2">View Full Asset</Button>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="comments">Revision Comments</Label>
                    <Textarea 
                        id="comments"
                        placeholder="e.g., 'Please adjust the color palette on the product cards to better match the brand guide...'"
                        className="min-h-[200px]"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>
            </div>
        </div>
        <DialogFooter className="justify-between sm:justify-between">
            <Button type="button" onClick={handleRequestRevisions} disabled={!comments.trim()} variant="outline">
                Send Feedback to Freelancer
            </Button>
            <div className="flex gap-2">
                <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="button" onClick={handleSendToClient}>
                    Approve & Send to Client
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
