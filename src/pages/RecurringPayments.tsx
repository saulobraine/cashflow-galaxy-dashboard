import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RecurringPaymentsManager } from "@/components/recurring/RecurringPaymentsManager";

export default function RecurringPaymentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pagamentos Recorrentes</h1>
          <p className="text-muted-foreground">Gerencie seus pagamentos automáticos</p>
        </div>
        <RecurringPaymentsManager />
      </div>
    </DashboardLayout>
  );
}