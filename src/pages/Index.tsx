
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { EnvelopesBarChart } from "@/components/dashboard/EnvelopesBarChart";
import { CashFlowAreaChart } from "@/components/dashboard/CashFlowAreaChart";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bem-vindo ao seu Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe suas finanças em um só lugar
          </p>
        </div>
        <OverviewCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnvelopesBarChart />
          <CashFlowAreaChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
