"use client"

import { usePathname } from 'next/navigation';
import { MODULES_CONFIG } from '@/lib/config/modules';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { TeamSwitcher } from './team-switcher';
import { UserNav } from './user-nav';

export const AppSidebar = () => {
  const pathname = usePathname();
  const moduleKey = pathname.split('/')[1];
  const moduleConfig = MODULES_CONFIG[moduleKey];

  if (!moduleConfig) return null;

  return (
    <Sidebar className="w-64 border-r">
      <SidebarHeader>
        <TeamSwitcher 
          teams={[{ 
            name: moduleConfig.name, 
            logo: moduleConfig.icon, 
            plan: "Active" 
          }]} 
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={moduleConfig.navItems} />
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
};