import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Eye, Download, Search, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data para demonstração
const mockImports = [
  {
    id: "1",
    filename: "transacoes-janeiro-2024.csv",
    status: "completed",
    totalRows: 1250,
    processedRows: 1250,
    importedRows: 1180,
    errorRows: 70,
    createdAt: new Date("2024-01-15T10:30:00"),
    finishedAt: new Date("2024-01-15T10:32:15")
  },
  {
    id: "2", 
    filename: "extrato-dezembro-2023.xlsx",
    status: "completed",
    totalRows: 890,
    processedRows: 890,
    importedRows: 890,
    errorRows: 0,
    createdAt: new Date("2024-01-10T14:20:00"),
    finishedAt: new Date("2024-01-10T14:21:30")
  },
  {
    id: "3",
    filename: "cartao-novembro-2023.csv", 
    status: "failed",
    totalRows: 0,
    processedRows: 0,
    importedRows: 0,
    errorRows: 0,
    createdAt: new Date("2024-01-08T09:15:00"),
    finishedAt: new Date("2024-01-08T09:15:45")
  },
  {
    id: "4",
    filename: "transacoes-outubro-2023.csv",
    status: "running", 
    totalRows: 2100,
    processedRows: 1450,
    importedRows: 1380,
    errorRows: 70,
    createdAt: new Date("2024-01-14T16:45:00"),
    finishedAt: undefined
  }
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case "completed":
      return { 
        label: "Concluída", 
        variant: "default" as const, 
        icon: CheckCircle, 
        color: "text-green-600" 
      };
    case "running":
      return { 
        label: "Em andamento", 
        variant: "secondary" as const, 
        icon: Clock, 
        color: "text-blue-600" 
      };
    case "failed":
      return { 
        label: "Falhou", 
        variant: "destructive" as const, 
        icon: AlertCircle, 
        color: "text-red-600" 
      };
    default:
      return { 
        label: "Desconhecido", 
        variant: "outline" as const, 
        icon: Clock, 
        color: "text-gray-600" 
      };
  }
};

const ImportsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredImports = mockImports.filter(importJob => {
    const matchesSearch = importJob.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || importJob.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getProgressPercentage = (processed: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((processed / total) * 100);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Minhas Importações</h1>
            <p className="text-muted-foreground">
              Gerencie e acompanhe suas importações de transações
            </p>
          </div>
          <Button onClick={() => navigate('/transactions')}>
            <FileText className="mr-2 h-4 w-4" />
            Nova Importação
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Histórico de Importações</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome do arquivo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="completed">Concluídas</SelectItem>
                    <SelectItem value="running">Em andamento</SelectItem>
                    <SelectItem value="failed">Falharam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Arquivo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead>Resultados</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredImports.map((importJob) => {
                  const statusInfo = getStatusInfo(importJob.status);
                  const StatusIcon = statusInfo.icon;
                  const progress = getProgressPercentage(importJob.processedRows, importJob.totalRows);

                  return (
                    <TableRow key={importJob.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{importJob.filename}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{importJob.processedRows.toLocaleString()}</span>
                            <span>{importJob.totalRows.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {progress}% concluído
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="text-green-600">
                            ✓ {importJob.importedRows.toLocaleString()} importadas
                          </div>
                          {importJob.errorRows > 0 && (
                            <div className="text-red-600">
                              ✗ {importJob.errorRows.toLocaleString()} com erro
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(importJob.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                          </div>
                          <div className="text-muted-foreground">
                            {format(importJob.createdAt, "HH:mm", { locale: ptBR })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/import/${importJob.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/import/${importJob.id}/details`)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          {importJob.errorRows > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                // Simular download do CSV de erros
                                console.log(`Baixando erros da importação ${importJob.id}`);
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {filteredImports.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma importação encontrada</p>
                <p className="text-sm">Tente ajustar seus filtros ou fazer uma nova importação</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ImportsPage;