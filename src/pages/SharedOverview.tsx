import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, CreditCard, Target, Building, Calendar } from "lucide-react";

// Mock data for charts
const monthlyRevenueData = [
  { month: "Jan", revenue: 65000, expenses: 45000, profit: 20000 },
  { month: "Feb", revenue: 72000, expenses: 48000, profit: 24000 },
  { month: "Mar", revenue: 68000, expenses: 52000, profit: 16000 },
  { month: "Apr", revenue: 81000, expenses: 49000, profit: 32000 },
  { month: "May", revenue: 89000, expenses: 55000, profit: 34000 },
  { month: "Jun", revenue: 94000, expenses: 58000, profit: 36000 },
];

const departmentExpenses = [
  { name: "Tecnologia", value: 35000, color: "#8884d8" },
  { name: "Marketing", value: 28000, color: "#82ca9d" },
  { name: "Vendas", value: 22000, color: "#ffc658" },
  { name: "RH", value: 15000, color: "#ff7300" },
  { name: "Administrativo", value: 12000, color: "#00ff88" },
];

const teamPerformance = [
  { name: "Equipe A", performance: 92, target: 85 },
  { name: "Equipe B", performance: 88, target: 80 },
  { name: "Equipe C", performance: 76, target: 75 },
  { name: "Equipe D", performance: 95, target: 90 },
  { name: "Equipe E", performance: 82, target: 85 },
];

const cashFlowData = [
  { day: "Seg", entrada: 12000, saida: 8000 },
  { day: "Ter", entrada: 15000, saida: 9500 },
  { day: "Qua", entrada: 8000, saida: 12000 },
  { day: "Qui", entrada: 18000, saida: 7500 },
  { day: "Sex", entrada: 22000, saida: 11000 },
  { day: "Sab", entrada: 5000, saida: 3000 },
  { day: "Dom", entrada: 3000, saida: 2000 },
];

const SharedOverviewPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Startup XYZ - Visão Geral</h1>
            <p className="text-muted-foreground">
              Dashboard executivo da conta compartilhada
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            <Badge variant="default" className="text-sm">Plano Pro</Badge>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 469.000</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12,5% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 307.000</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8,2% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 162.000</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18,7% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membros Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                Último acesso: hoje
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue vs Expenses Area Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Receita vs Despesas (6 meses)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, '']} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" name="Receita" />
                  <Area type="monotone" dataKey="expenses" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Despesas" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Expenses Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Despesas por Departamento</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentExpenses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentExpenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, 'Valor']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cash Flow Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Caixa Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, '']} />
                  <Legend />
                  <Bar dataKey="entrada" fill="#82ca9d" name="Entradas" />
                  <Bar dataKey="saida" fill="#ff7300" name="Saídas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance das Equipes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamPerformance.map((team) => (
                <div key={team.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{team.name}</span>
                    <span>{team.performance}%</span>
                  </div>
                  <Progress value={team.performance} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Meta: {team.target}%</span>
                    <span className={team.performance >= team.target ? "text-green-600" : "text-red-600"}>
                      {team.performance >= team.target ? "✓ Atingida" : "⚠ Abaixo da meta"}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Profit Trend Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Lucro Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, 'Lucro']} />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#8884d8" 
                  strokeWidth={3}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SharedOverviewPage;