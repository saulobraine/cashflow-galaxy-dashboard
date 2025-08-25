import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Percent, CurrencyCircleDollar } from "phosphor-react";
import { useToast } from "@/hooks/use-toast";

interface Envelope {
  id: number;
  name: string;
  valueType: "percentage" | "fixed";
  value: number;
  parentEnvelope?: string;
}

interface EditEnvelopeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  envelope: Envelope | null;
  onSave: (envelope: Envelope) => void;
  envelopes: Array<{ id: number; name: string; valueType: "percentage" | "fixed"; value: number }>;
}

export function EditEnvelopeDialog({ open, onOpenChange, envelope, onSave, envelopes }: EditEnvelopeDialogProps) {
  const [name, setName] = useState("");
  const [valueType, setValueType] = useState<"percentage" | "fixed">("percentage");
  const [value, setValue] = useState("");
  const [parentEnvelope, setParentEnvelope] = useState("Remuneração");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  useEffect(() => {
    if (envelope) {
      setName(envelope.name);
      setValueType(envelope.valueType);
      setValue(envelope.value.toString());
      setParentEnvelope(envelope.parentEnvelope || "Remuneração");
    }
  }, [envelope]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (!value.trim()) newErrors.value = "Valor é obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !envelope) return;
    
    const updatedEnvelope: Envelope = {
      ...envelope,
      name: name.trim(),
      valueType,
      value: parseFloat(value),
      parentEnvelope: valueType === "percentage" ? parentEnvelope : undefined,
    };

    onSave(updatedEnvelope);
    setErrors({});
    
    toast({
      title: "Envelope atualizado",
      description: "O envelope foi atualizado com sucesso.",
    });
  };

  if (!envelope) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Envelope</DialogTitle>
          <DialogDescription>
            Atualize as informações do envelope
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Envelope *</Label>
              <Input
                id="name"
                placeholder="Ex: Alimentação, Transporte..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <Label>Tipo de Valor *</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant={valueType === "percentage" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setValueType("percentage")}
                >
                  <Percent className="mr-2 h-4 w-4" />
                  Percentual (%)
                </Button>
                <Button
                  type="button"
                  variant={valueType === "fixed" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setValueType("fixed")}
                >
                  <CurrencyCircleDollar className="mr-2 h-4 w-4" />
                  Valor Fixo (R$)
                </Button>
              </div>
            </div>

            {valueType === "percentage" && (
              <div>
                <Label htmlFor="parentEnvelope">Calcular % de *</Label>
                <Select value={parentEnvelope} onValueChange={setParentEnvelope}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remuneração">Remuneração</SelectItem>
                    {envelopes
                      .filter(env => env.valueType === "fixed" && env.id !== envelope.id)
                      .map(env => (
                        <SelectItem key={env.id} value={env.name}>
                          {env.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div>
              <Label htmlFor="value">Valor *</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                placeholder={valueType === "percentage" ? "0%" : "R$ 0,00"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={errors.value ? "border-red-500" : ""}
              />
              {errors.value && (
                <p className="text-sm text-red-500 mt-1">{errors.value}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}