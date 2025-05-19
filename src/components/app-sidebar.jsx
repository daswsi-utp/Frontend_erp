"use client"
import { usePathname } from 'next/navigation';
import { MODULES_CONFIG } from '@/lib/config/modules';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { TeamSwitcher } from './team-switcher';
import { UserNav } from './user-nav';
import { useAuth } from '@/providers/UserContext';

export const AppSidebar = ({ user }) => {
  const pathname = usePathname();
  const moduleKey = pathname.split('/')[1];
  const moduleConfig = MODULES_CONFIG[moduleKey];

  if (!moduleConfig) return null;

  const filteredNavItems = moduleConfig.navItems?.filter(item => {
    if (!item.allowedRoles || user?.role === 'ADMIN') return true;
    return item.allowedRoles.includes(user?.role);
  }).map(item => {
    if (item.subItems) {
      return {
        ...item,
        subItems: item.subItems.filter(subItem =>
          !subItem.allowedRoles ||
          user?.role === 'ADMIN' ||
          subItem.allowedRoles.includes(user?.role)
        )
      };
    }
    return item;
  }).filter(item => !item.subItems || item.subItems.length > 0);

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
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};