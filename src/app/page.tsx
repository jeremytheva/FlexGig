import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, UserCheck } from "lucide-react";
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
                Choose the service model that fits your project needs. Get matched with top talent, seamlessly.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Briefcase className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold font-headline">Managed Service</CardTitle>
                  </div>
                  <CardDescription className="pt-4 text-base">
                    Premium, hands-off experience. Our project managers handle everything from vetting to delivery, ensuring top-quality results with zero hassle. Perfect for complex projects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Link href="/dashboard">
                    <Button className="w-full text-lg" size="lg">
                      Get Started <ArrowRight className="ml-2" />
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
                    <CardTitle className="text-3xl font-bold font-headline">Direct Service</CardTitle>
                  </div>
                  <CardDescription className="pt-4 text-base">
                    A low-fee, direct-to-freelancer model. You manage the project and communications. Ideal for straightforward tasks and when you have time to oversee the work.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Link href="/dashboard">
                    <Button variant="secondary" className="w-full text-lg" size="lg">
                      Find a Freelancer <ArrowRight className="ml-2" />
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
