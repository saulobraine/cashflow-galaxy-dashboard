import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, DollarSign, User, Clock, Search, RefreshCw, Repeat, Edit } from "lucide-react";
import { AddReceivableDialog } from "./AddReceivableDialog";
import { EditReceivableDialog } from "./EditReceivableDialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Receivable {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  client: string;
  status: "pending" | "received" | "overdue";
  isRecurring?: boolean;
  frequency?: "weekly" | "monthly" | "yearly";
  envelope?: string;
}

export function ReceivablesManager() {
  const [receivables, setReceivables] = useState<Receivable[]>([
    {
      id: "1",
      description: "Projeto Website",
      amount: 2500.00,
      dueDate: "2024-01-15",
      client: "Empresa ABC",
      status: "pending",
      isRecurring: true,
      frequency: "monthly",
      envelope: "Prestação de Serviços"
    },
    {
      id: "2",
      description: "Consultoria Marketing",
      amount: 1800.00,
      dueDate: "2024-01-10",
      client: "Cliente XYZ",
      status: "overdue",
      envelope: "Consultoria"
    },
    {
      id: "3",
      description: "Serviço Mensal",
      amount: 1200.00,
      dueDate: "2024-02-01",
      client: "Empresa DEF",
      status: "pending",
      isRecurring: true,
      frequency: "weekly",
      envelope: "Trabalho Extra"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReceivable, setEditingReceivable] = useState<Receivable | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const addReceivable = (receivable: Omit<Receivable, "id">) => {
    const newReceivable = {
      ...receivable,
      id: Date.now().toString()
    };
    setReceivables([...receivables, newReceivable]);
  };

  // Filter receivables based on search term
  const filteredReceivables = useMemo(() => {
    return receivables.filter(receivable =>
      receivable.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receivable.client.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [receivables, searchTerm]);

  // Paginate filtered receivables
  const paginatedReceivables = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredReceivables.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredReceivables, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredReceivables.length / itemsPerPage);

  const getRecurrenceIcon = (frequency?: string) => {
    switch (frequency) {
      case "weekly":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "monthly":
        return <RefreshCw className="h-4 w-4 text-green-500" />;
      case "yearly":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Repeat className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Receivable["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>;
      case "received":
        return <Badge variant="default">Recebido</Badge>;
      case "overdue":
        return <Badge variant="destructive">Vencido</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const totalPending = filteredReceivables
    .filter(r => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalOverdue = filteredReceivables
    .filter(r => r.status === "overdue")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-purple">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(totalPending)}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-purple">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total em Atraso</CardTitle>
            <Calendar className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(totalOverdue)}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-purple">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contas</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredReceivables.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Contas a Receber */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contas a Receber</CardTitle>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="purple-gradient shadow-purple-glow"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Conta
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Pesquisar por descrição ou cliente..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="pl-10"
            />
          </div>

          <div className="space-y-4">
            {paginatedReceivables.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchTerm ? "Nenhuma conta encontrada para o termo pesquisado." : "Nenhuma conta a receber cadastrada."}
                </p>
              </div>
            ) : (
              paginatedReceivables.map((receivable) => (
                <div
                  key={receivable.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {receivable.isRecurring && getRecurrenceIcon(receivable.frequency)}
                      <h3 className="font-medium">{receivable.description}</h3>
                      {getStatusBadge(receivable.status)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {receivable.client}
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2 justify-end">
                      <div className="text-lg font-semibold text-primary">
                        {formatCurrency(receivable.amount)}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingReceivable(receivable)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(receivable.dueDate)}
                    </div>
                    {receivable.envelope && (
                      <div className="text-xs">
                        <Badge variant="outline" className="text-xs">
                          {receivable.envelope}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
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

      <AddReceivableDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAdd={addReceivable}
      />

      <EditReceivableDialog
        receivable={editingReceivable}
        open={!!editingReceivable}
        onOpenChange={(open) => !open && setEditingReceivable(null)}
        onSave={(updatedReceivable) => {
          setReceivables(receivables.map(r => 
            r.id === updatedReceivable.id ? updatedReceivable : r
          ));
          setEditingReceivable(null);
        }}
      />
    </div>
  );
}