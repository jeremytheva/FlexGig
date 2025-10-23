import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, UserCheck, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-semibold font-headline">FlexGig Marketplace</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                Your Flexible Workforce Solution
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Choose the portal that fits your role. Get matched with top talent, seamlessly.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Briefcase className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-headline">Project Manager</CardTitle>
                  </div>
                  <CardDescription className="pt-4 text-base">
                    Oversee projects, manage talent, and ensure quality delivery from a centralized hub.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Link href="/pm">
                    <Button className="w-full text-lg" size="lg">
                      Enter PM Portal <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <UserCheck className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-headline">Client</CardTitle>
                  </div>
                  <CardDescription className="pt-4 text-base">
                    Track your project's progress, approve deliverables, and communicate with your team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Link href="/client">
                    <Button variant="default" className="w-full text-lg bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                      Enter Client Portal <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
               <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary p-3 rounded-full">
                      <Users className="h-8 w-8 text-secondary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-headline">Freelancer</CardTitle>
                  </div>
                  <CardDescription className="pt-4 text-base">
                    Manage your availability, complete skill tests, and collaborate on exciting new projects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Link href="/freelancer">
                    <Button variant="secondary" className="w-full text-lg" size="lg">
                      Enter Talent Portal <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 FlexGig Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
}
