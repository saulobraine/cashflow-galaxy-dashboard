
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, TrendingDown, TrendingUp, Search, Edit, Filter } from "lucide-react";
import { AddTransactionDialog } from "@/components/transactions/AddTransactionDialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { EditTransactionDialog } from "@/components/transactions/EditTransactionDialog";

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnvelope, setSelectedEnvelope] = useState("all");
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const itemsPerPage = 5;

  const transactions = [
    {
      id: 1,
      description: "Supermercado Extra",
      amount: -450.32,
      date: "2024-03-20",
      type: "debit",
      envelope: "Alimentação"
    },
    {
      id: 2,
      description: "Salário",
      amount: 5000.00,
      date: "2024-03-15",
      type: "credit",
      envelope: "Receitas"
    },
    {
      id: 3,
      description: "Netflix",
      amount: -39.90,
      date: "2024-03-10",
      type: "debit",
      envelope: "Entretenimento"
    },
    {
      id: 4,
      description: "Uber",
      amount: -25.50,
      date: "2024-03-08",
      type: "debit",
      envelope: "Transporte"
    },
    {
      id: 5,
      description: "Freelance",
      amount: 800.00,
      date: "2024-03-05",
      type: "credit",
      envelope: "Trabalho Extra"
    },
    {
      id: 6,
      description: "Farmácia",
      amount: -45.80,
      date: "2024-03-03",
      type: "debit",
      envelope: "Saúde"
    },
  ];

  const envelopes = [...new Set(transactions.map(t => t.envelope))];

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.envelope.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEnvelope = selectedEnvelope === "all" || transaction.envelope === selectedEnvelope;
      return matchesSearch && matchesEnvelope;
    });
  }, [transactions, searchTerm, selectedEnvelope]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

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
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Pesquisar transações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedEnvelope} onValueChange={setSelectedEnvelope}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por envelope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Envelopes</SelectItem>
                  {envelopes.map((envelope) => (
                    <SelectItem key={envelope} value={envelope}>
                      {envelope}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4 flex-1">
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
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {transaction.envelope}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`font-bold ${
                      transaction.type === "credit" 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {transaction.type === "credit" ? "+" : "-"}
                      R$ {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingTransaction(transaction)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                          className="cursor-pointer"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <EditTransactionDialog
        transaction={editingTransaction}
        open={!!editingTransaction}
        onOpenChange={(open) => !open && setEditingTransaction(null)}
        onSave={(updatedTransaction) => {
          // Here you would update the transaction in your state
          console.log("Updating transaction:", updatedTransaction);
          setEditingTransaction(null);
        }}
      />
    </DashboardLayout>
  );
};

export default TransactionsPage;
