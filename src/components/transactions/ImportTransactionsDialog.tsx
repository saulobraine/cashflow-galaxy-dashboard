import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Column {
  name: string;
  type: 'date' | 'description' | 'amount' | 'category' | 'ignore';
  sample: string;
}

export const ImportTransactionsDialog = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'upload' | 'mapping' | 'preview'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isDryRun, setIsDryRun] = useState(false);
  const navigate = useNavigate();

  // Mock data para preview
  const sampleData = [
    { date: "2024-03-20", description: "Supermercado Extra", amount: "-450,32", category: "Alimentação" },
    { date: "2024-03-15", description: "Salário", amount: "5000,00", category: "Receitas" },
    { date: "2024-03-10", description: "Netflix", amount: "-39,90", category: "Entretenimento" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Simular detecção de colunas
      setColumns([
        { name: "Data", type: "date", sample: "2024-03-20" },
        { name: "Descrição", type: "description", sample: "Supermercado Extra" },
        { name: "Valor", type: "amount", sample: "-450,32" },
        { name: "Categoria", type: "category", sample: "Alimentação" }
      ]);
      setStep('mapping');
    }
  };

  const handleColumnMappingChange = (index: number, type: Column['type']) => {
    const newColumns = [...columns];
    newColumns[index].type = type;
    setColumns(newColumns);
  };

  const handlePreview = () => {
    setStep('preview');
  };

  const handleImport = (dryRun: boolean = false) => {
    setIsDryRun(dryRun);
    // Simular criação de job de importação
    const jobId = `job-${Date.now()}`;
    setOpen(false);
    navigate(`/import/${jobId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Importar Transações
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importar Transações</DialogTitle>
        </DialogHeader>

        {step === 'upload' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Selecionar Arquivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Arraste e solte seu arquivo aqui</p>
                      <p className="text-sm text-muted-foreground">ou clique para selecionar</p>
                    </div>
                    <Input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="mt-4"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Formatos aceitos: CSV, XLS, XLSX</p>
                    <p>• Tamanho máximo: 50MB</p>
                    <p>• Colunas mínimas: Data, Descrição, Valor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'mapping' && file && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mapeamento de Colunas</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Arquivo: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {columns.map((column, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <Label className="font-medium">{column.name}</Label>
                        <p className="text-sm text-muted-foreground">Exemplo: {column.sample}</p>
                      </div>
                      <div className="flex-1">
                        <Select
                          value={column.type}
                          onValueChange={(value: Column['type']) => handleColumnMappingChange(index, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="date">Data</SelectItem>
                            <SelectItem value="description">Descrição</SelectItem>
                            <SelectItem value="amount">Valor</SelectItem>
                            <SelectItem value="category">Categoria</SelectItem>
                            <SelectItem value="ignore">Ignorar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Badge variant={column.type === 'ignore' ? 'secondary' : 'default'}>
                          {column.type === 'date' && 'Data'}
                          {column.type === 'description' && 'Descrição'}
                          {column.type === 'amount' && 'Valor'}
                          {column.type === 'category' && 'Categoria'}
                          {column.type === 'ignore' && 'Ignorar'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-6">
                  <Button onClick={handlePreview} className="flex-1">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Visualizar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview dos Dados</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Primeiras 3 linhas do arquivo processado
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleData.map((row, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1 grid grid-cols-4 gap-4">
                        <div>
                          <Label className="text-xs text-muted-foreground">Data</Label>
                          <p className="font-medium">{row.date}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Descrição</Label>
                          <p className="font-medium">{row.description}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Valor</Label>
                          <p className="font-medium">R$ {row.amount}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Categoria</Label>
                          <p className="font-medium">{row.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <p className="font-medium text-sm">Resumo da Importação</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total de linhas</p>
                      <p className="font-medium">1.234</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Válidas</p>
                      <p className="font-medium text-green-600">1.180</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Com erro</p>
                      <p className="font-medium text-red-600">54</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => handleImport(true)}
                    className="flex-1"
                  >
                    Testar Importação
                  </Button>
                  <Button 
                    onClick={() => handleImport(false)}
                    className="flex-1"
                  >
                    Iniciar Importação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};