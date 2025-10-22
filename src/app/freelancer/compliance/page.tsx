
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContractDialog } from '@/components/compliance/contract-dialog';
import { Star } from 'lucide-react';

const skillTests = [
  { name: 'React Proficiency', status: 'Passed', score: '92%' },
  { name: 'Node.js Advanced', status: 'Passed', score: '88%' },
  { name: 'English Fluency (C1)', status: 'Passed', score: 'Verified' },
  { name: 'Project Management Basics', status: 'Not Taken', score: null },
];

const contracts = [
  { name: 'Master Services Agreement', status: 'Signed' },
  { name: 'Non-Disclosure Agreement', status: 'Signed' },
  { name: 'Project Phoenix SOW', status: 'Awaiting Signature' },
];

const recommendedTest = { 
  name: 'Advanced TypeScript', 
  status: 'Not Taken', 
  reason: 'High demand on enterprise projects. Passing this test can increase your rate.' 
};

export default function CompliancePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Legal & Compliance Hub</h1>
        <p className="text-muted-foreground">
          Manage your skill verifications and contracts to ensure quality and mitigate risk.
        </p>
      </header>

      <Tabs defaultValue="skill-tests" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="skill-tests">Skill Tests</TabsTrigger>
        </TabsList>
        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Digital Contracts</CardTitle>
              <CardDescription>
                Review and sign all necessary legal documents.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {contracts.map((contract) => (
                <div key={contract.name} className="flex items-center justify-between p-3 rounded-md border">
                    <div>
                        <p className="font-medium">{contract.name}</p>
                        <Badge variant={contract.status === 'Signed' ? 'secondary' : 'destructive'}>{contract.status}</Badge>
                    </div>
                    {contract.status === 'Awaiting Signature' && <ContractDialog />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="skill-tests">
          <Card>
            <CardHeader>
              <CardTitle>Skill Verifications</CardTitle>
              <CardDescription>
                Complete skill tests to enhance your profile and qualify for more projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                        <CardTitle className="text-base font-semibold">Recommended Test</CardTitle>
                        <CardDescription className="text-sm">{recommendedTest.reason}</CardDescription>
                    </div>
                    <Badge variant="default" className="flex items-center gap-1">
                        <Star className="h-3 w-3"/>
                        Recommended
                    </Badge>
                </CardHeader>
                <CardContent className="flex items-center justify-between pt-2">
                    <p className="font-medium">{recommendedTest.name}</p>
                    <Button variant="default">Start Test</Button>
                </CardContent>
            </Card>

              {skillTests.map((test) => (
                 <div key={test.name} className="flex items-center justify-between p-3 rounded-md border">
                    <div>
                        <p className="font-medium">{test.name}</p>
                        {test.score && <p className="text-sm text-muted-foreground">Score: {test.score}</p>}
                    </div>
                    {test.status === 'Not Taken' ? (
                        <Button variant="outline">Start Test</Button>
                    ) : (
                        <Badge variant={test.status === 'Passed' ? 'secondary' : 'default'}>{test.status}</Badge>
                    )}
                 </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
