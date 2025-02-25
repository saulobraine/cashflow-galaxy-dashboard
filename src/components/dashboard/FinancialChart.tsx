
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 45000 },
  { name: "Fev", value: 52000 },
  { name: "Mar", value: 49000 },
  { name: "Abr", value: 63000 },
  { name: "Mai", value: 58000 },
  { name: "Jun", value: 71000 },
  { name: "Jul", value: 84950 },
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
              formatter={(value: number) => [`R$ ${value.toLocaleString()}`, "Valor"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#9b87f5"
              strokeWidth={2}
              dot={{ fill: "#9b87f5" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
