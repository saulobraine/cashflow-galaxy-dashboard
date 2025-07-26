
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ChartBar, CreditCard, FolderOpen, Receipt, Repeat, User, Gear, SignOut, ArrowsLeftRight } from "phosphor-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ThemeProvider } from "next-themes";
import { FloatingMenu } from "@/components/ui/floating-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: ChartBar, label: "Visão Geral", path: "/" },
  { icon: CreditCard, label: "Transações", path: "/transactions" },
  { icon: FolderOpen, label: "Envelopes", path: "/categories" },
  { icon: Receipt, label: "Contas a Receber", path: "/receivables" },
  { icon: Repeat, label: "Pagamentos Recorrentes", path: "/recurring-payments" },
];

const UserDropdown = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@usuario" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">João Silva</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              joao@exemplo.com
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Gear className="mr-2 h-4 w-4" />
          <span>Configurações do perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ArrowsLeftRight className="mr-2 h-4 w-4" />
          <span>Trocar de conta</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Receipt className="mr-2 h-4 w-4" />
          <span>Integrações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AppSidebar = () => {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className={isCollapsed ? "w-14" : "w-60"}>
        <SidebarHeader className={isCollapsed ? "p-2" : "p-4"}>
          <div className="flex items-center justify-between">
            {!isCollapsed && <h2 className="text-lg font-semibold">Finance Dashboard</h2>}
            <ThemeToggle />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              const buttonContent = (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex w-full items-center py-3 text-sm font-medium rounded-lg transition-colors ${
                    isCollapsed ? "justify-center px-2" : "px-4"
                  } ${
                    active 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary/10"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isCollapsed ? "mr-0" : "mr-3"}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      {buttonContent}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return buttonContent;
            })}
          </nav>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  );
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <SidebarTrigger />
              <UserDropdown />
            </div>
            {children}
          </main>
          <FloatingMenu />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

