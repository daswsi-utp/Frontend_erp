"use client"

import { ChevronRight } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavDash({
  items
}) {
  return (
    (<SidebarGroup>
      <SidebarGroupLabel>Principal</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
            <SidebarMenuItem
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible">
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <a href={item.url}>
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
            </SidebarMenuItem>

        ))}
      </SidebarMenu>
    </SidebarGroup>)
  );
}