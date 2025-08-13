import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock, 
  Download,
  Eye,
  X,
  PlayCircle,
  PauseCircle
} from "lucide-react";

interface ImportEvent {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  data?: any;
}

const ImportProgress = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<'queued' | 'running' | 'completed' | 'failed' | 'canceled'>('running');
  const [progress, setProgress] = useState(0);
  const [totalRows, setTotalRows] = useState(1234);
  const [processedRows, setProcessedRows] = useState(0);
  const [importedRows, setImportedRows] = useState(0);
  const [errorRows, setErrorRows] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [events, setEvents] = useState<ImportEvent[]>([]);

  // Simular progresso em tempo real
  useEffect(() => {
    if (status === 'running') {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + Math.random() * 5, 100);
          setProcessedRows(Math.floor((newProgress / 100) * totalRows));
          setImportedRows(Math.floor((newProgress / 100) * totalRows * 0.95));
          setErrorRows(Math.floor((newProgress / 100) * totalRows * 0.05));
          
          // Adicionar eventos aleatórios
          if (Math.random() > 0.8) {
            const eventTypes: ImportEvent['type'][] = ['info', 'warning', 'error', 'success'];
            const messages = [
              'Processando batch de 100 transações...',
              'Linha 234: Data inválida, usando formato padrão',
              'Erro na linha 567: Valor não numérico',
              'Batch processado com sucesso'
            ];
            
            const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            setEvents(prev => [{
              id: `event-${Date.now()}`,
              type: randomType,
              message: randomMessage,
              timestamp: new Date().toLocaleTimeString(),
            }, ...prev.slice(0, 19)]); // Manter apenas os últimos 20 eventos
          }
          
          if (newProgress >= 100) {
            setStatus('completed');
          }
          
          return newProgress;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [status, totalRows]);

  const elapsedTime = Math.floor((Date.now() - startTime.getTime()) / 1000);
  const estimatedTime = progress > 0 ? Math.floor((elapsedTime / progress) * (100 - progress)) : 0;
  const ratePerSecond = elapsedTime > 0 ? Math.floor(processedRows / elapsedTime) : 0;

  const handleCancel = () => {
    setStatus('canceled');
  };

  const handleViewDetails = () => {
    navigate(`/import/${jobId}/details`);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'queued':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'running':
        return <PlayCircle className="h-5 w-5 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'canceled':
        return <PauseCircle className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'queued':
        return 'Na fila';
      case 'running':
        return 'Processando';
      case 'completed':
        return 'Concluída';
      case 'failed':
        return 'Falhou';
      case 'canceled':
        return 'Cancelada';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'queued':
        return 'bg-yellow-100 text-yellow-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'canceled':
        return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Importação de Transações</h1>
            <p className="text-muted-foreground mt-2">
              Job ID: {jobId}
            </p>
          </div>
          <div className="flex gap-2">
            {status === 'running' && (
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            )}
            {status === 'completed' && (
              <Button onClick={handleViewDetails}>
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
            )}
          </div>
        </div>

        {/* Status e Progresso */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon()}
                Status da Importação
              </CardTitle>
              <Badge className={getStatusColor()}>
                {getStatusText()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Progresso</span>
                  <span className="text-sm text-muted-foreground">{progress.toFixed(1)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{totalRows.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{processedRows.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Processadas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{importedRows.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Importadas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{errorRows.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Com erro</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{ratePerSecond}/s</p>
                  <p className="text-sm text-muted-foreground">Taxa</p>
                </div>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tempo decorrido: {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s</span>
                {status === 'running' && estimatedTime > 0 && (
                  <span>Tempo estimado: {Math.floor(estimatedTime / 60)}m {estimatedTime % 60}s</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed de Eventos */}
        <Card>
          <CardHeader>
            <CardTitle>Log de Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {events.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aguardando eventos...
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 border rounded-lg"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {event.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {event.type === 'info' && <AlertCircle className="h-4 w-4 text-blue-600" />}
                        {event.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                        {event.type === 'error' && <XCircle className="h-4 w-4 text-red-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{event.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{event.timestamp}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Ações finais */}
        {status === 'completed' && (
          <Card>
            <CardHeader>
              <CardTitle>Importação Concluída</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="font-medium text-green-800">
                      Importação concluída com sucesso!
                    </p>
                  </div>
                  <p className="text-sm text-green-700">
                    {importedRows} transações foram importadas. {errorRows > 0 && `${errorRows} linhas apresentaram erros.`}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleViewDetails} className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes das Transações
                  </Button>
                  {errorRows > 0 && (
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Relatório de Erros
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ImportProgress;