
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Envelope as EnvelopeIcon, Plus, X, PencilSimple } from "phosphor-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AddEnvelopeDialog } from "@/components/envelopes/AddEnvelopeDialog";
import { EditEnvelopeDialog } from "@/components/envelopes/EditEnvelopeDialog";

interface Envelope {
  id: number;
  name: string;
  valueType: "percentage" | "fixed";
  value: number;
  parentEnvelope?: string;
}

const Categories = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingEnvelope, setEditingEnvelope] = useState<Envelope | null>(null);
  const [envelopes, setEnvelopes] = useState<Envelope[]>([
    { id: 1, name: "Remuneração", valueType: "fixed", value: 5000 },
    { id: 2, name: "Alimentação", valueType: "percentage", value: 30, parentEnvelope: "Remuneração" },
    { id: 3, name: "Transporte", valueType: "percentage", value: 15, parentEnvelope: "Remuneração" },
    { id: 4, name: "Lazer", valueType: "fixed", value: 500 },
  ]);
  const { toast } = useToast();

  // Mock transactions to calculate current values
  const mockTransactions = [
    { envelope: "Alimentação", amount: 800, type: "expense" },
    { envelope: "Transporte", amount: 450, type: "expense" },
    { envelope: "Lazer", amount: 200, type: "expense" },
    { envelope: "Remuneração", amount: 5000, type: "income" },
  ];

  const calculateCurrentValue = (envelope: Envelope) => {
    const transactions = mockTransactions.filter(t => t.envelope === envelope.name);
    const total = transactions.reduce((sum, t) => sum + (t.type === "income" ? t.amount : -t.amount), 0);
    return total;
  };

  const calculateBudgetValue = (envelope: Envelope) => {
    if (envelope.valueType === "fixed") {
      return envelope.value;
    } else {
      // Find parent envelope
      const parentEnv = envelopes.find(e => e.name === envelope.parentEnvelope);
      if (parentEnv) {
        const parentValue = parentEnv.valueType === "fixed" ? parentEnv.value : calculateBudgetValue(parentEnv);
        return (parentValue * envelope.value) / 100;
      }
      return envelope.value;
    }
  };

  const handleAddEnvelope = (envelopeData: {
    name: string;
    valueType: "percentage" | "fixed";
    value: number;
    parentEnvelope?: string;
  }) => {
    const newEnvelope: Envelope = {
      id: envelopes.length + 1,
      ...envelopeData,
    };
    setEnvelopes([...envelopes, newEnvelope]);
    setAddDialogOpen(false);
  };

  const handleEditEnvelope = (envelope: Envelope) => {
    setEditingEnvelope(envelope);
    setEditDialogOpen(true);
  };

  const handleSaveEnvelope = (updatedEnvelope: Envelope) => {
    setEnvelopes(envelopes.map(env => 
      env.id === updatedEnvelope.id ? updatedEnvelope : env
    ));
    setEditDialogOpen(false);
    setEditingEnvelope(null);
  };

  const handleDeleteEnvelope = (id: number) => {
    setEnvelopes(envelopes.filter((env) => env.id !== id));
    toast({
      title: "Envelope removido",
      description: "O envelope foi removido com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Envelopes</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie os envelopes das suas transações com valores ou percentuais
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Envelopes Existentes</h2>
            <p className="text-muted-foreground">
              Gerencie seus envelopes orçamentários
            </p>
          </div>
          <Button onClick={() => setAddDialogOpen(true)} className="purple-gradient shadow-purple-glow">
            <Plus className="mr-2 h-4 w-4" />
            Novo Envelope
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {envelopes.map((envelope) => {
            const currentValue = calculateCurrentValue(envelope);
            const budgetValue = calculateBudgetValue(envelope);
            const percentage = budgetValue > 0 ? (Math.abs(currentValue) / budgetValue) * 100 : 0;
            
            return (
              <Card key={envelope.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <EnvelopeIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditEnvelope(envelope)}
                      >
                        <PencilSimple className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteEnvelope(envelope.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{envelope.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {envelope.valueType === "percentage" 
                        ? `${envelope.value}% de ${envelope.parentEnvelope}`
                        : `Valor fixo`
                      }
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Orçamento:</span>
                      <span className="font-medium">R$ {budgetValue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Atual:</span>
                      <span className={`font-medium ${currentValue < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        R$ {Math.abs(currentValue).toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      {percentage.toFixed(1)}% utilizado
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <AddEnvelopeDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onAdd={handleAddEnvelope}
          envelopes={envelopes}
        />

        <EditEnvelopeDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          envelope={editingEnvelope}
          onSave={handleSaveEnvelope}
          envelopes={envelopes}
        />
      </div>
    </DashboardLayout>
  );
};

export default Categories;
