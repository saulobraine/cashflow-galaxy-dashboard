
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Envelope, Plus, X } from "phosphor-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Categories = () => {
  const [newEnvelope, setNewEnvelope] = useState("");
  const [newValueType, setNewValueType] = useState<"percentage" | "fixed">("percentage");
  const [newValue, setNewValue] = useState("");
  const [envelopes, setEnvelopes] = useState([
    { id: 1, name: "Alimentação", valueType: "percentage" as const, value: 30 },
    { id: 2, name: "Transporte", valueType: "percentage" as const, value: 15 },
    { id: 3, name: "Lazer", valueType: "fixed" as const, value: 500 },
    { id: 4, name: "Salário", valueType: "fixed" as const, value: 5000 },
  ]);
  const { toast } = useToast();

  const handleAddEnvelope = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEnvelope.trim() && newValue.trim()) {
      setEnvelopes([
        ...envelopes,
        { 
          id: envelopes.length + 1, 
          name: newEnvelope,
          valueType: newValueType,
          value: parseFloat(newValue)
        },
      ]);
      setNewEnvelope("");
      setNewValue("");
      toast({
        title: "Envelope adicionado",
        description: "O envelope foi criado com sucesso.",
      });
    }
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

        <Card>
          <CardHeader>
            <CardTitle>Adicionar Envelope</CardTitle>
            <CardDescription>
              Crie um novo envelope com valor fixo ou percentual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddEnvelope} className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Nome do envelope"
                  value={newEnvelope}
                  onChange={(e) => setNewEnvelope(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="valueType">Tipo de Valor</Label>
                  <Select value={newValueType} onValueChange={(value) => setNewValueType(value as "percentage" | "fixed")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentual (%)</SelectItem>
                      <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="value">Valor</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    placeholder={newValueType === "percentage" ? "0%" : "R$ 0,00"}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="purple-gradient shadow-purple-glow">
                <Plus className="mr-2" />
                Adicionar
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Envelopes Existentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {envelopes.map((envelope) => (
                <div
                  key={envelope.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Envelope className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <span className="font-medium">{envelope.name}</span>
                      <div className="text-sm text-muted-foreground">
                        {envelope.valueType === "percentage" 
                          ? `${envelope.value}%` 
                          : `R$ ${envelope.value.toFixed(2)}`
                        }
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteEnvelope(envelope.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
