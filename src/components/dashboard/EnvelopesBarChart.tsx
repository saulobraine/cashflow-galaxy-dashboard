import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

const envelopesData = [
  { name: "Remuneração", current: 8500, budget: 10000 },
  { name: "Alimentação", current: 1200, budget: 1500 },
  { name: "Transporte", current: 450, budget: 600 },
  { name: "Lazer", current: 300, budget: 500 },
  { name: "Moradia", current: 2800, budget: 3000 },
  { name: "Saúde", current: 250, budget: 400 },
  { name: "Educação", current: 380, budget: 500 },
  { name: "Investimentos", current: 1500, budget: 2000 },
];

const chartConfig = {
  current: {
    label: "Atual",
    color: "hsl(var(--primary))",
  },
  budget: {
    label: "Orçamento",
    color: "hsl(var(--muted-foreground))",
  },
};

export const EnvelopesBarChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Envelopes - Situação Atual</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={envelopesData}
              layout="horizontal"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis 
                type="number" 
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                width={70}
              />
              <ChartTooltip 
                cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                content={<ChartTooltipContent />}
                formatter={(value: number, name: string) => [
                  `R$ ${value.toLocaleString()}`,
                  chartConfig[name as keyof typeof chartConfig]?.label || name
                ]}
              />
              <Bar dataKey="budget" fill="var(--color-budget)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="current" fill="var(--color-current)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};