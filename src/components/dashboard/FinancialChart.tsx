
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const periodsData = {
  "this-month": [
    { name: "01", orcamento: 1000, gasto: 800 },
    { name: "02", orcamento: 1200, gasto: 900 },
    { name: "03", orcamento: 800, gasto: 600 },
    { name: "04", orcamento: 1500, gasto: 1200 },
    { name: "05", orcamento: 900, gasto: 700 },
    { name: "06", orcamento: 1100, gasto: 850 },
    { name: "07", orcamento: 1300, gasto: 1000 },
    { name: "08", orcamento: 1000, gasto: 750 },
    { name: "09", orcamento: 1400, gasto: 1100 },
    { name: "10", orcamento: 1200, gasto: 950 },
    { name: "11", orcamento: 800, gasto: 650 },
    { name: "12", orcamento: 1600, gasto: 1300 },
    { name: "13", orcamento: 1100, gasto: 880 },
    { name: "14", orcamento: 1000, gasto: 800 },
    { name: "15", orcamento: 1350, gasto: 1050 },
  ],
  "last-month": [
    { name: "01", orcamento: 900, gasto: 700 },
    { name: "02", orcamento: 1100, gasto: 850 },
    { name: "03", orcamento: 750, gasto: 580 },
    { name: "04", orcamento: 1400, gasto: 1100 },
    { name: "05", orcamento: 850, gasto: 650 },
    { name: "06", orcamento: 1050, gasto: 800 },
    { name: "07", orcamento: 1250, gasto: 950 },
    { name: "08", orcamento: 950, gasto: 720 },
    { name: "09", orcamento: 1300, gasto: 1000 },
    { name: "10", orcamento: 1150, gasto: 900 },
    { name: "11", orcamento: 750, gasto: 600 },
    { name: "12", orcamento: 1500, gasto: 1200 },
    { name: "13", orcamento: 1000, gasto: 800 },
    { name: "14", orcamento: 950, gasto: 750 },
    { name: "15", orcamento: 1280, gasto: 980 },
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
