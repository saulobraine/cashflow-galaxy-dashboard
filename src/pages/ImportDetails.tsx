import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Download,
  ArrowLeft,
  Calendar,
  DollarSign
} from "lucide-react";

interface ImportedTransaction {
  id: string;
  status: 'imported' | 'skipped' | 'error';
  date: string;
  description: string;
  amount: number;
  category?: string;
  errorMessage?: string;
  rawData: any;
}

const ImportDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Mock data para demonstração
  const transactions: ImportedTransaction[] = Array.from({ length: 1234 }, (_, i) => {
    const statuses: ImportedTransaction['status'][] = ['imported', 'skipped', 'error'];
    const status = i % 20 === 0 ? 'error' : i % 15 === 0 ? 'skipped' : 'imported';
    const descriptions = [
      'Supermercado Extra',
      'Salário',
      'Netflix',
      'Uber',
      'Farmácia',
      'Restaurante',
      'Combustível',
      'Academia'
    ];
    
    return {
      id: `tx-${i + 1}`,
      status,
      date: new Date(2024, 2, Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      amount: parseFloat((Math.random() * 1000 - 500).toFixed(2)),
      category: status !== 'error' ? ['Alimentação', 'Receitas', 'Entretenimento', 'Transporte', 'Saúde'][Math.floor(Math.random() * 5)] : undefined,
      errorMessage: status === 'error' ? 'Formato de data inválido' : undefined,
      rawData: { originalLine: i + 1 }
    };
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const stats = useMemo(() => {
    const imported = transactions.filter(t => t.status === 'imported').length;
    const skipped = transactions.filter(t => t.status === 'skipped').length;
    const errors = transactions.filter(t => t.status === 'error').length;
    
    return { imported, skipped, errors, total: transactions.length };
  }, [transactions]);

  const getStatusIcon = (status: ImportedTransaction['status']) => {
    switch (status) {
      case 'imported':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'skipped':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusText = (status: ImportedTransaction['status']) => {
    switch (status) {
      case 'imported':
        return 'Importada';
      case 'skipped':
        return 'Ignorada';
      case 'error':
        return 'Erro';
    }
  };

  const getStatusColor = (status: ImportedTransaction['status']) => {
    switch (status) {
      case 'imported':
        return 'bg-green-100 text-green-800';
      case 'skipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/import/${jobId}`)}
              className="mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Status
            </Button>
            <h1 className="text-3xl font-bold">Detalhes da Importação</h1>
            <p className="text-muted-foreground mt-2">
              Job ID: {jobId}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar Filtradas
            </Button>
            {stats.errors > 0 && (
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Relatório de Erros
              </Button>
            )}
          </div>
        </div>

        {/* Resumo */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo da Importação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.imported.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Importadas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{stats.skipped.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Ignoradas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{stats.errors.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Com Erro</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros e Lista */}
        <Card>
          <CardHeader>
            <CardTitle>Transações ({filteredTransactions.length.toLocaleString()})</CardTitle>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Pesquisar por descrição ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="imported">Importadas</SelectItem>
                  <SelectItem value="skipped">Ignoradas</SelectItem>
                  <SelectItem value="error">Com Erro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    transaction.status === 'error' ? 'border-red-200 bg-red-50/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                      <Badge className={getStatusColor(transaction.status)}>
                        {getStatusText(transaction.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Data</span>
                        </div>
                        <p className="font-medium">
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-xs text-muted-foreground">Descrição</span>
                        </div>
                        <p className="font-medium">{transaction.description}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Valor</span>
                        </div>
                        <p className={`font-medium ${
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          R$ {Math.abs(transaction.amount).toFixed(2)}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-xs text-muted-foreground">Categoria</span>
                        </div>
                        <p className="font-medium">{transaction.category || '-'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {transaction.errorMessage && (
                    <div className="ml-4 max-w-xs">
                      <p className="text-sm text-red-600 font-medium">
                        {transaction.errorMessage}
                      </p>
                    </div>
                  )}
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
                    
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNumber)}
                            isActive={currentPage === pageNumber}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <PaginationItem>
                          <span className="px-4 py-2">...</span>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setCurrentPage(totalPages)}
                            className="cursor-pointer"
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    
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
    </DashboardLayout>
  );
};

export default ImportDetails;