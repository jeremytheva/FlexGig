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
  Home,
  MessageSquare,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', icon: <Home />, label: 'Dashboard' },
  { href: '/dashboard/scope-vetting', icon: <Search />, label: 'Scope Vetting' },
  { href: '/dashboard/matching', icon: <Users />, label: 'Find Talent' },
  { href: '/dashboard/projects', icon: <Briefcase />, label: 'Projects' },
  { href: '/dashboard/schedule', icon: <Calendar />, label: 'My Schedule' },
  { href: '/dashboard/chat', icon: <MessageSquare />, label: 'Messages' },
  {
    href: '/dashboard/compliance',
    icon: <ShieldCheck />,
    label: 'Compliance',
  },
];

export default function DashboardLayout({
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
            <span className="text-xl font-semibold font-headline">FlexGig</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton tooltip="Profile">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/seed/pm-avatar/100/100" data-ai-hint="person avatar" />
                    <AvatarFallback>PM</AvatarFallback>
                  </Avatar>
                  <span>Project Manager</span>
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
