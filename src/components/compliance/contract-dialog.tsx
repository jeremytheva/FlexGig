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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ContractDialog() {
    const [agreed, setAgreed] = useState(false);
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleSign = () => {
        if (agreed) {
            toast({
                title: 'Contract Signed',
                description: 'The Statement of Work has been successfully signed.',
            });
            setOpen(false);
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Review &amp; Sign</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Statement of Work: Project Phoenix</DialogTitle>
          <DialogDescription>
            Please review the terms below and sign to proceed.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 w-full rounded-md border p-4">
            <div className="space-y-4">
              <h4 className="font-bold">1. Scope of Work</h4>
              <p className="text-sm text-muted-foreground">The freelancer will develop a complete e-commerce platform as per the specifications document. This includes frontend development using Next.js and Tailwind CSS, backend API development, and Stripe integration for payments.</p>
              <h4 className="font-bold">2. Deliverables</h4>
              <p className="text-sm text-muted-foreground">Final source code, deployment scripts, and documentation.</p>
              <h4 className="font-bold">3. Payment Schedule</h4>
              <p className="text-sm text-muted-foreground">Payments will be released upon client approval of milestones: Wireframes (20%), Frontend (40%), Backend &amp; Integration (40%).</p>
              <h4 className="font-bold">4. Mandatory Arbitration Clause</h4>
              <p className="text-sm text-muted-foreground">Any disputes arising out of or in connection with this contract shall be finally settled under the Rules of Arbitration of the International Chamber of Commerce by one or more arbitrators appointed in accordance with the said Rules. The seat of arbitration shall be New York, NY.</p>
            </div>
        </ScrollArea>
        <div className="flex items-center space-x-2 pt-4">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
          <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I agree to the terms and conditions, including the mandatory arbitration clause.
          </Label>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSign} disabled={!agreed}>
            Sign Contract
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
