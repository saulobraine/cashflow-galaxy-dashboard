import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";

const cashFlowData = [
  { month: "Jan", income: 12000, expenses: 8500 },
  { month: "Fev", income: 11500, expenses: 9200 },
  { month: "Mar", income: 13200, expenses: 8800 },
  { month: "Abr", income: 12800, expenses: 9500 },
  { month: "Mai", income: 14000, expenses: 10200 },
  { month: "Jun", income: 13500, expenses: 9800 },
  { month: "Jul", income: 15000, expenses: 11000 },
  { month: "Ago", income: 14200, expenses: 10500 },
  { month: "Set", income: 13800, expenses: 9900 },
  { month: "Out", income: 16000, expenses: 12000 },
  { month: "Nov", income: 15500, expenses: 11800 },
  { month: "Dez", income: 17000, expenses: 13200 },
];

const chartConfig = {
  income: {
    label: "Entradas",
    color: "hsl(var(--primary))",
  },
  expenses: {
    label: "Saídas", 
    color: "hsl(var(--destructive))",
  },
};

export const CashFlowAreaChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fluxo de Caixa - Últimos 12 Meses</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={cashFlowData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value: number, name: string) => [
                  `R$ ${value.toLocaleString()}`,
                  chartConfig[name as keyof typeof chartConfig]?.label || name
                ]}
              />
              <Area
                type="monotone"
                dataKey="income"
                stackId="1"
                stroke="var(--color-income)"
                fill="var(--color-income)"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="1"
                stroke="var(--color-expenses)"
                fill="var(--color-expenses)"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};