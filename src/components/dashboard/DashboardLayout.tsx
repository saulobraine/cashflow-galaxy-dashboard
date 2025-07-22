
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { ChartBar, Wallet, CreditCard, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ThemeProvider } from "next-themes";

const menuItems = [
  { icon: ChartBar, label: "Visão Geral", path: "/" },
  { icon: Wallet, label: "Carteira", path: "/wallet" },
  { icon: CreditCard, label: "Transações", path: "/transactions" },
  { icon: FolderOpen, label: "Categorias", path: "/categories" },
  
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <Sidebar>
            <SidebarHeader className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Finance Dashboard</h2>
                <ThemeToggle />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="flex w-full items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary/10 transition-colors"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <SidebarTrigger />
            </div>
            {children}
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

