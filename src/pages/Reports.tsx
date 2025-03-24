
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { DownloadIcon, FileTextIcon, RefreshCcwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Dados fictícios para os gráficos
const salesData = [
  { month: 'Jan', vendas: 1200, meta: 1000 },
  { month: 'Fev', vendas: 1900, meta: 1500 },
  { month: 'Mar', vendas: 1500, meta: 1700 },
  { month: 'Abr', vendas: 2400, meta: 2000 },
  { month: 'Mai', vendas: 2500, meta: 2200 },
  { month: 'Jun', vendas: 3100, meta: 2500 },
];

const leadSourceData = [
  { name: 'Website', value: 400, color: '#8B5CF6' },
  { name: 'Indicação', value: 300, color: '#F97316' },
  { name: 'Redes Sociais', value: 300, color: '#1EAEDB' },
  { name: 'Email', value: 200, color: '#22C55E' },
  { name: 'Eventos', value: 100, color: '#EF4444' },
];

const performanceData = [
  { name: 'Jan', taxa: 65 },
  { name: 'Fev', taxa: 72 },
  { name: 'Mar', taxa: 78 },
  { name: 'Abr', taxa: 62 },
  { name: 'Mai', taxa: 85 },
  { name: 'Jun', taxa: 90 },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState<string>('vendas');
  const { toast } = useToast();

  const handleDownload = (reportType: string) => {
    toast({
      title: "Relatório baixado",
      description: `O relatório de ${reportType} foi baixado com sucesso.`,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Dados atualizados",
      description: "Os relatórios foram atualizados com os dados mais recentes.",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Visualize os dados de desempenho e métricas do seu negócio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCcwIcon className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDownload('excel')}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="vendas">Vendas e Metas</TabsTrigger>
          <TabsTrigger value="origens">Origens de Leads</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="vendas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendas vs. Metas</CardTitle>
              <CardDescription>
                Comparativo entre vendas realizadas e metas definidas nos últimos 6 meses.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    vendas: { label: 'Vendas', color: '#8B5CF6' },
                    meta: { label: 'Meta', color: '#F97316' },
                  }}
                >
                  <BarChart data={salesData} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="vendas" fill="var(--color-vendas)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="meta" fill="var(--color-meta)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo de Vendas</CardTitle>
                <CardDescription>
                  Total de vendas realizadas no período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold">R$ 12.600,00</p>
                    <p className="text-sm text-green-600 font-medium">+15% em relação ao período anterior</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Meta do período</span>
                      <span className="font-medium">R$ 12.900,00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ticket médio</span>
                      <span className="font-medium">R$ 2.100,00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total de vendas</span>
                      <span className="font-medium">53 vendas</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Recomendadas</CardTitle>
                <CardDescription>
                  Sugestões para melhorar seus resultados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <FileTextIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Revisar metas de maio</p>
                      <p className="text-sm text-muted-foreground">Resultado 13% acima da meta estabelecida</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileTextIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Analisar queda em março</p>
                      <p className="text-sm text-muted-foreground">Vendas 12% abaixo da meta estabelecida</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileTextIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Preparar campanha para julho</p>
                      <p className="text-sm text-muted-foreground">Manter tendência de crescimento</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="origens" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Origens de Leads</CardTitle>
              <CardDescription>
                Distribuição de leads por canal de origem.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadSourceData.map((source, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{source.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">{source.value}</span>
                    <span className="text-sm text-muted-foreground">Leads gerados</span>
                    
                    <div className="mt-2 text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Taxa de conversão</span>
                        <span className="font-medium">{Math.floor(Math.random() * 30) + 20}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Custo por lead</span>
                        <span className="font-medium">R$ {Math.floor(Math.random() * 50) + 30}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Conversão</CardTitle>
              <CardDescription>
                Percentual de leads convertidos em clientes ao longo do tempo.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    taxa: { label: 'Taxa de Conversão', color: '#8B5CF6' },
                  }}
                >
                  <LineChart data={performanceData} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="taxa" 
                      stroke="var(--color-taxa)" 
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Performance</CardTitle>
                <CardDescription>
                  Indicadores chave de desempenho
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Taxa média de conversão</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tempo médio de fechamento</span>
                      <span className="font-medium">15 dias</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Satisfação do cliente</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Retenção de clientes</span>
                      <span className="font-medium">83%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: '83%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comparativo</CardTitle>
                <CardDescription>
                  Desempenho comparado ao período anterior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <p className="text-muted-foreground text-sm">Leads Gerados</p>
                      <p className="text-2xl font-bold">845</p>
                      <p className="text-green-600 text-sm">+12%</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <p className="text-muted-foreground text-sm">Vendas Realizadas</p>
                      <p className="text-2xl font-bold">342</p>
                      <p className="text-green-600 text-sm">+8%</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <p className="text-muted-foreground text-sm">Tempo de Ciclo</p>
                      <p className="text-2xl font-bold">15d</p>
                      <p className="text-green-600 text-sm">-3d</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <p className="text-muted-foreground text-sm">Valor Médio</p>
                      <p className="text-2xl font-bold">R$2.4K</p>
                      <p className="text-red-600 text-sm">-5%</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Observações:</h3>
                    <p className="text-sm text-muted-foreground">
                      O desempenho geral melhorou em relação ao período anterior. 
                      Destaque para o aumento na geração de leads (+12%) e a 
                      redução no tempo de ciclo de vendas (-3 dias).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
