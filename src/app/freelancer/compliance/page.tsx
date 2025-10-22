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

export default function CompliancePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Legal & Compliance Hub</h1>
        <p className="text-muted-foreground">
          Manage your skill verifications and contracts to ensure quality and mitigate risk.
        </p>
      </header>

      <Tabs defaultValue="contracts" className="w-full">
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
              {skillTests.map((test) => (
                 <div key={test.name} className="flex items-center justify-between p-3 rounded-md border">
                    <div>
                        <p className="font-medium">{test.name}</p>
                        {test.score && <p className="text-sm text-muted-foreground">Score: {test.score}</p>}
                    </div>
                    {test.status === 'Not Taken' ? (
                        <Button variant="outline">Start Test</Button>
                    ) : (
                        <Badge variant={test.status === 'Passed' ? 'default' : 'destructive'}>{test.status}</Badge>
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
