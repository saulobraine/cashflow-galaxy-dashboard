
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { ChartBar, Wallet, CreditCard, DollarSign } from "lucide-react";

const menuItems = [
  { icon: ChartBar, label: "Visão Geral", href: "#overview" },
  { icon: Wallet, label: "Carteira", href: "#wallet" },
  { icon: CreditCard, label: "Transações", href: "#transactions" },
  { icon: DollarSign, label: "Investimentos", href: "#investments" },
];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Finance Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary/10 transition-colors"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </a>
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
  );
};
