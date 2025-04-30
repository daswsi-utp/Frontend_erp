// 'use client';
// import { ChevronRight } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';

// export function NavMain({ items }) {
//   const pathname = usePathname();

//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Módulos</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => {
//           const isActive = item.exact 
//             ? pathname === item.path
//             : pathname.startsWith(item.path);

//           return (
//             <Collapsible
//               key={item.path}
//               asChild
//               defaultOpen={isActive}
//               className="group/collapsible"
//             >
//               <SidebarMenuItem>
//                 <CollapsibleTrigger asChild>
//                   <SidebarMenuButton tooltip={item.title}>
//                     {item.icon && <item.icon className="w-4 h-4" />}
//                     <span>{item.title}</span>
//                     {item.subItems && (
//                       <ChevronRight
//                         className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
//                       />
//                     )}
//                   </SidebarMenuButton>
//                 </CollapsibleTrigger>

//                 {item.subItems && (
//                   <CollapsibleContent>
//                     <SidebarMenuSub>
//                       {item.subItems.map((subItem) => (
//                         <SidebarMenuSubItem key={subItem.path}>
//                           <SidebarMenuSubButton asChild>
//                             <Link href={subItem.path}>
//                               <span>{subItem.title}</span>
//                             </Link>
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                       ))}
//                     </SidebarMenuSub>
//                   </CollapsibleContent>
//                 )}
//               </SidebarMenuItem>
//             </Collapsible>
//           );
//         })}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }
// src/components/nav-main.jsx
'use client';
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/providers/UserContext';

export function NavMain({ items }) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Función para verificar si un item está activo
  const isItemActive = (item) => {
    if (item.exact) return pathname === item.path;
    return pathname.startsWith(item.path);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Módulos</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = isItemActive(item);

          return (
            <Collapsible
              key={item.path}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.title}</span>
                    {item.subItems && item.subItems.length > 0 && (
                      <ChevronRight
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item.subItems && item.subItems.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.path}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.path}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}