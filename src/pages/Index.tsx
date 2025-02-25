
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { FinancialChart } from "@/components/dashboard/FinancialChart";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bem-vindo ao seu Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe seus investimentos e finanças em um só lugar
          </p>
        </div>
        <OverviewCards />
        <FinancialChart />
      </div>
    </DashboardLayout>
  );
};

export default Index;
