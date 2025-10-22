'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";

export default function SchedulePage() {
  const [range, setRange] = useState<DateRange | undefined>();
  const { toast } = useToast();

  const handleConfirm = () => {
    if (range?.from && range?.to) {
        toast({
            title: "Availability Updated",
            description: "Your new availability has been saved.",
        });
    } else {
        toast({
            variant: "destructive",
            title: "Incomplete Selection",
            description: "Please select a valid date range.",
        });
    }
  }

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">My Availability</h1>
        <p className="text-muted-foreground">
          Set and lock in your flexible availability. Clients will see these dates when considering you for projects.
        </p>
      </header>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
           <Card>
              <CardContent className="p-0 sm:p-2 flex justify-center">
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={2}
                  className="w-full"
                />
              </CardContent>
           </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Selected Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {range?.from ? (
                <div className="space-y-2">
                  <Badge variant="default" className="w-full justify-center py-2 text-base">
                    {footer}
                  </Badge>
                  <p className="text-sm text-muted-foreground">This range will be marked as your available time.</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Select a date range on the calendar to mark your availability.</p>
              )}
               <Button className="w-full" onClick={handleConfirm}>Confirm Availability</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">You have no upcoming bookings.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
