
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
  ClipboardList,
  UserCog,
  Receipt
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
  { title: 'Contatos', icon: Users, path: '/contacts' },
  { title: 'Negócios', icon: DollarSign, path: '/deals' },
  { title: 'Calendário', icon: Calendar, path: '/calendar' },
  { title: 'Tarefas', icon: ClipboardList, path: '/tasks' },
  { title: 'Finanças', icon: Receipt, path: '/finances' },
  { title: 'Usuários', icon: UserCog, path: '/users' },
];

const secondaryNavItems: NavItem[] = [
  { title: 'Relatórios', icon: BarChart4, path: '/reports' },
  { title: 'Mensagens', icon: MessageSquare, path: '/messages' },
  { title: 'Configurações', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out z-30 shadow-md",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-center h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-semibold text-sidebar-foreground tracking-tight">
            Zapyer CRM
          </h1>
        )}
        {collapsed && (
          <span className="mx-auto text-xl font-bold text-sidebar-foreground">Z</span>
        )}
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-4 px-2">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <TooltipProvider key={item.title} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground",
                          collapsed ? "justify-center" : ""
                        )
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right" className="bg-popover text-popover-foreground border-border">
                      <p>{item.title}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          
          <div className="pt-4 border-t border-sidebar-border">
            <p className={cn("px-3 py-1 text-xs font-semibold text-sidebar-foreground/50 uppercase", 
                           collapsed && "text-center"
            )}>
              {!collapsed && "Sistema"}
            </p>
            <div className="space-y-1 mt-2">
              {secondaryNavItems.map((item) => (
                <TooltipProvider key={item.title} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground",
                            collapsed && "justify-center"
                          )
                        }
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="bg-popover text-popover-foreground border-border">
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
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-2">Recolher</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
