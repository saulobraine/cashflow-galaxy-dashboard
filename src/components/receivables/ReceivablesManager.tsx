import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, DollarSign, User, Clock } from "lucide-react";
import { AddReceivableDialog } from "./AddReceivableDialog";

interface Receivable {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  client: string;
  status: "pending" | "received" | "overdue";
}

export function ReceivablesManager() {
  const [receivables, setReceivables] = useState<Receivable[]>([
    {
      id: "1",
      description: "Projeto Website",
      amount: 2500.00,
      dueDate: "2024-01-15",
      client: "Empresa ABC",
      status: "pending"
    },
    {
      id: "2",
      description: "Consultoria Marketing",
      amount: 1800.00,
      dueDate: "2024-01-10",
      client: "Cliente XYZ",
      status: "overdue"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addReceivable = (receivable: Omit<Receivable, "id">) => {
    const newReceivable = {
      ...receivable,
      id: Date.now().toString()
    };
    setReceivables([...receivables, newReceivable]);
  };

  const getStatusBadge = (status: Receivable["status"]) => {
    const variants = {
      pending: "default",
      received: "secondary",
      overdue: "destructive"
    } as const;

    const labels = {
      pending: "Pendente",
      received: "Recebido",
      overdue: "Vencido"
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const totalPending = receivables
    .filter(r => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalOverdue = receivables
    .filter(r => r.status === "overdue")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-purple">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(totalPending)}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-purple">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valores Vencidos</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(totalOverdue)}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-purple">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {receivables.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Contas a Receber */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contas a Receber</CardTitle>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="purple-gradient shadow-purple-glow"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Conta
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {receivables.map((receivable) => (
              <div
                key={receivable.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{receivable.description}</h3>
                    {getStatusBadge(receivable.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {receivable.client}
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-lg font-semibold text-primary">
                    {formatCurrency(receivable.amount)}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(receivable.dueDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddReceivableDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAdd={addReceivable}
      />
    </div>
  );
}