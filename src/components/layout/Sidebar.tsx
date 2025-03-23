
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Calendar, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  BarChart4,
  MessageSquare,
  ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type NavItem = {
  title: string;
  icon: React.ElementType;
  path: string;
};

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'Contacts', icon: Users, path: '/contacts' },
  { title: 'Deals', icon: DollarSign, path: '/deals' },
  { title: 'Calendar', icon: Calendar, path: '/calendar' },
  { title: 'Tasks', icon: ClipboardList, path: '/tasks' },
];

const secondaryNavItems: NavItem[] = [
  { title: 'Reports', icon: BarChart4, path: '/reports' },
  { title: 'Messages', icon: MessageSquare, path: '/messages' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out z-30",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-semibold text-sidebar-foreground tracking-tight">
            Zapyer CRM
          </h1>
        )}
        {collapsed && (
          <span className="mx-auto text-xl font-semibold text-sidebar-foreground">Z</span>
        )}
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-6 px-2">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <TooltipProvider key={item.title} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground",
                          collapsed && "justify-center"
                        )
                      }
                    >
                      <item.icon className={cn("h-5 w-5", collapsed ? "mx-0" : "mr-2")} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          
          <div className="pt-4 border-t border-sidebar-border">
            <div className="space-y-1">
              {secondaryNavItems.map((item) => (
                <TooltipProvider key={item.title} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground",
                            collapsed && "justify-center"
                          )
                        }
                      >
                        <item.icon className={cn("h-5 w-5", collapsed ? "mx-0" : "mr-2")} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        <p>{item.title}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-center text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
