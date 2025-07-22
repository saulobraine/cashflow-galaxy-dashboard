import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ReceivablesManager } from "@/components/receivables/ReceivablesManager";

export default function ReceivablesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contas a Receber</h1>
          <p className="text-muted-foreground">Gerencie seus valores a receber</p>
        </div>
        <ReceivablesManager />
      </div>
    </DashboardLayout>
  );
}