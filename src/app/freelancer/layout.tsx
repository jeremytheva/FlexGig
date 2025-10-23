'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
  Briefcase,
  Calendar,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/freelancer', icon: <Calendar />, label: 'My Schedule' },
  { href: '/freelancer/projects', icon: <Briefcase />, label: 'Projects' },
  { href: '/freelancer/compliance', icon: <ShieldCheck />, label: 'Compliance' },
  { href: '/freelancer/chat', icon: <MessageSquare />, label: 'Messages' },
];

export default function FreelancerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold font-headline">FlexGig Talent</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href) && (item.href !== '/freelancer' || pathname === '/freelancer')}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton tooltip="Profile">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/seed/freelancer-avatar/100/100" data-ai-hint="person avatar" />
                    <AvatarFallback>FL</AvatarFallback>
                  </Avatar>
                  <span>Ethan Davis</span>
                </SidebarMenuButton>
             </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-6 lg:p-8">
          <div className="absolute top-4 right-4 md:hidden">
            <Button variant="ghost" size="icon" asChild>
                <SidebarTrigger />
            </Button>
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
