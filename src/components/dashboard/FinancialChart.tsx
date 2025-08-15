
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const periodsData = {
  "this-month": [
    { name: "Sem 1", orcamento: 15000, gasto: 8000 },
    { name: "Sem 2", orcamento: 18000, gasto: 12000 },
    { name: "Sem 3", orcamento: 22000, gasto: 9000 },
    { name: "Sem 4", orcamento: 25000, gasto: 11000 },
  ],
  "last-month": [
    { name: "Sem 1", orcamento: 12000, gasto: 7000 },
    { name: "Sem 2", orcamento: 16000, gasto: 10000 },
    { name: "Sem 3", orcamento: 19000, gasto: 8500 },
    { name: "Sem 4", orcamento: 21000, gasto: 9500 },
  ],
  "6-months": [
    { name: "Fev", orcamento: 72000, gasto: 32000 },
    { name: "Mar", orcamento: 69000, gasto: 29000 },
    { name: "Abr", orcamento: 83000, gasto: 35000 },
    { name: "Mai", orcamento: 78000, gasto: 31000 },
    { name: "Jun", orcamento: 91000, gasto: 38000 },
    { name: "Jul", orcamento: 95000, gasto: 40000 },
  ],
  "12-months": [
    { name: "Ago", orcamento: 45000, gasto: 20000 },
    { name: "Set", orcamento: 52000, gasto: 22000 },
    { name: "Out", orcamento: 48000, gasto: 21000 },
    { name: "Nov", orcamento: 58000, gasto: 25000 },
    { name: "Dez", orcamento: 62000, gasto: 28000 },
    { name: "Jan", orcamento: 65000, gasto: 30000 },
    { name: "Fev", orcamento: 72000, gasto: 32000 },
    { name: "Mar", orcamento: 69000, gasto: 29000 },
    { name: "Abr", orcamento: 83000, gasto: 35000 },
    { name: "Mai", orcamento: 78000, gasto: 31000 },
    { name: "Jun", orcamento: 91000, gasto: 38000 },
    { name: "Jul", orcamento: 95000, gasto: 40000 },
  ],
  "all-time": [
    { name: "2022", orcamento: 580000, gasto: 240000 },
    { name: "2023", orcamento: 720000, gasto: 310000 },
    { name: "2024", orcamento: 890000, gasto: 380000 },
  ],
};

export const FinancialChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<keyof typeof periodsData>("this-month");
  const currentData = periodsData[selectedPeriod];

  return (
    <Card className="p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Evolução de Envelopes</h3>
        <Select value={selectedPeriod} onValueChange={(value: keyof typeof periodsData) => setSelectedPeriod(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">Este mês</SelectItem>
            <SelectItem value="last-month">Último mês</SelectItem>
            <SelectItem value="6-months">Últimos 6 meses</SelectItem>
            <SelectItem value="12-months">Últimos 12 meses</SelectItem>
            <SelectItem value="all-time">Máximo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis
              stroke="#888"
              tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `R$ ${value.toLocaleString()}`, 
                name === "orcamento" ? "Orçamento" : "Gasto"
              ]}
            />
            <Line
              type="monotone"
              dataKey="orcamento"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="gasto"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
