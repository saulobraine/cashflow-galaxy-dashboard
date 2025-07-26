
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ChartBar, CreditCard, FolderOpen, Receipt, Repeat } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ThemeProvider } from "next-themes";
import { FloatingMenu } from "@/components/ui/floating-menu";

const menuItems = [
  { icon: ChartBar, label: "Visão Geral", path: "/" },
  { icon: CreditCard, label: "Transações", path: "/transactions" },
  { icon: FolderOpen, label: "Envelopes", path: "/categories" },
  { icon: Receipt, label: "Contas a Receber", path: "/receivables" },
  { icon: Repeat, label: "Pagamentos Recorrentes", path: "/recurring-payments" },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className={isCollapsed ? "w-14" : "w-60"}>
      <SidebarHeader className={isCollapsed ? "p-2" : "p-4"}>
        <div className="flex items-center justify-between">
          {!isCollapsed && <h2 className="text-lg font-semibold">Finance Dashboard</h2>}
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center py-3 text-sm font-medium rounded-lg hover:bg-secondary/10 transition-colors ${
                isCollapsed ? "justify-center px-2" : "px-4"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isCollapsed ? "mr-0" : "mr-3"}`} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </SidebarContent>
    </Sidebar>
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
            </div>
            {children}
          </main>
          <FloatingMenu />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

