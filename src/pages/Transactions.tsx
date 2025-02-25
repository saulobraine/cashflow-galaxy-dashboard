
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, TrendingDown, TrendingUp } from "lucide-react";
import { AddTransactionDialog } from "@/components/transactions/AddTransactionDialog";

const TransactionsPage = () => {
  const transactions = [
    {
      id: 1,
      description: "Supermercado Extra",
      amount: -450.32,
      date: "2024-03-20",
      type: "debit"
    },
    {
      id: 2,
      description: "Salário",
      amount: 5000.00,
      date: "2024-03-15",
      type: "credit"
    },
    {
      id: 3,
      description: "Netflix",
      amount: -39.90,
      date: "2024-03-10",
      type: "debit"
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Transações</h1>
            <p className="text-muted-foreground mt-2">
              Acompanhe suas movimentações financeiras
            </p>
          </div>
          <AddTransactionDialog />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {transaction.type === "credit" ? (
                      <div className="p-2 bg-green-100 rounded-full">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="p-2 bg-red-100 rounded-full">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <p className={`font-bold ${
                    transaction.type === "credit" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {transaction.type === "credit" ? "+" : "-"}
                    R$ {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage;
