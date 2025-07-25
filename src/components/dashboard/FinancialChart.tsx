
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", entradas: 65000, saidas: 20000 },
  { name: "Fev", entradas: 72000, saidas: 20000 },
  { name: "Mar", entradas: 69000, saidas: 20000 },
  { name: "Abr", entradas: 83000, saidas: 20000 },
  { name: "Mai", entradas: 78000, saidas: 20000 },
  { name: "Jun", entradas: 91000, saidas: 20000 },
  { name: "Jul", entradas: 104950, saidas: 20000 },
];

export const FinancialChart = () => {
  return (
    <Card className="p-6 mt-6">
      <h3 className="text-lg font-semibold mb-6">Evolução Patrimonial</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis
              stroke="#888"
              tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `R$ ${value.toLocaleString()}`, 
                name === "entradas" ? "Entradas" : "Saídas"
              ]}
            />
            <Line
              type="monotone"
              dataKey="entradas"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#22c55e" }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="saidas"
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
