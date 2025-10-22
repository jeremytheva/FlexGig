'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, PlusCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const templates = [
  { id: 'tmpl-1', name: 'Standard Website Build', budget: 25000, timeline: '6 weeks' },
  { id: 'tmpl-2', name: 'Monthly SEO Retainer', budget: 5000, timeline: 'Monthly' },
];

export function ProjectTemplates() {
  const { toast } = useToast();

  const handleReorder = (templateName: string) => {
    toast({
      title: "Project Reordered",
      description: `A new project based on "${templateName}" has been created. A project manager will be in touch shortly.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Templates</CardTitle>
        <CardDescription>
          Instantly reorder successful projects or create new ones from your saved templates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {templates.map((template) => (
          <div key={template.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-md border gap-4">
            <div className="flex-1">
              <p className="font-semibold text-lg">{template.name}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <span>Budget: <Badge variant="secondary">${template.budget.toLocaleString()}</Badge></span>
                <span>Timeline: <Badge variant="secondary">{template.timeline}</Badge></span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Copy className="mr-2 h-4 w-4" /> Duplicate</Button>
              <Button size="sm" onClick={() => handleReorder(template.name)}>
                <RefreshCw className="mr-2 h-4 w-4" /> Reorder Now
              </Button>
            </div>
          </div>
        ))}
         <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-md">
            <Button variant="ghost" className="text-muted-foreground">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Template
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
