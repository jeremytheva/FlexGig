
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { freelancers } from "@/lib/mock-data";
import { MessageSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

export default function FindTalentPage() {
    const { toast } = useToast();

    const handleContact = (freelancerName: string) => {
        toast({
            title: "Contact Initiated",
            description: `A direct message channel has been opened with ${freelancerName}.`,
        });
    };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Find Talent</h1>
        <p className="text-muted-foreground">
          Search our vetted pool of freelancers and start a conversation directly.
        </p>
      </header>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name or keyword..." className="pl-10" />
              </div>
              <Select>
                  <SelectTrigger>
                      <SelectValue placeholder="Filter by skill" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="ui-ux">UI/UX</SelectItem>
                  </SelectContent>
              </Select>
              <Select>
                  <SelectTrigger>
                      <SelectValue placeholder="Filter by availability" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="this-week">This week</SelectItem>
                      <SelectItem value="next-week">Next week</SelectItem>
                      <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                      <SelectItem value="next-month">Next month</SelectItem>
                  </SelectContent>
              </Select>
          </div>
        </CardContent>
      </Card>


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((freelancer) => (
          <Card key={freelancer.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={freelancer.avatarUrl} data-ai-hint="person avatar" />
                  <AvatarFallback>{freelancer.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{freelancer.name}</CardTitle>
                  <CardDescription>Capacity: {100 - freelancer.capacity}% available</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Top Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {freelancer.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/client/chat">
                    <MessageSquare className="mr-2 h-4 w-4"/>
                    Message
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
