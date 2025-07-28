import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ReceivablesManager } from "@/components/receivables/ReceivablesManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReceivablesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contas a Receber</h1>
          <p className="text-muted-foreground">Gerencie seus valores a receber</p>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Todas as Contas</TabsTrigger>
            <TabsTrigger value="services">Serviços/Produtos</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <ReceivablesManager />
          </TabsContent>
          
          <TabsContent value="services" className="space-y-4">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Funcionalidade de Serviços/Produtos em desenvolvimento</p>
            </div>
          </TabsContent>
          
          <TabsContent value="clients" className="space-y-4">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Funcionalidade de Clientes em desenvolvimento</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}