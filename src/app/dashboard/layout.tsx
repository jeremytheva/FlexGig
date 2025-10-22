import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function DeprecatedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <Briefcase className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold font-headline mb-2">This Portal has Moved</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
            We've reorganized our platform to provide dedicated portals for Clients, Project Managers, and Freelancers. Please select the appropriate portal from the homepage.
        </p>
        <Button asChild>
            <Link href="/">Return to Homepage</Link>
        </Button>
    </div>
  );
}
