
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Calendar as CalendarIcon, Plus, Search, Filter, Download, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Dados de exemplo para receitas
const receitasData = [
  { id: 1, descricao: 'Serviço de Consultoria', cliente: 'Tech Innovations', valor: 5000, vencimento: new Date(2023, 6, 15), status: 'Recebido' },
  { id: 2, descricao: 'Projeto de Desenvolvimento', cliente: 'Acme Inc.', valor: 12500, vencimento: new Date(2023, 6, 22), status: 'Pendente' },
  { id: 3, descricao: 'Manutenção Mensal', cliente: 'Global Enterprises', valor: 3000, vencimento: new Date(2023, 7, 5), status: 'Pendente' },
  { id: 4, descricao: 'Treinamento de Equipe', cliente: 'ABC Corp', valor: 4500, vencimento: new Date(2023, 6, 30), status: 'Atrasado' },
  { id: 5, descricao: 'Implementação de Software', cliente: 'Inovação Tecnológica', valor: 8750, vencimento: new Date(2023, 7, 10), status: 'Pendente' },
];

// Dados de exemplo para despesas
const despesasData = [
  { id: 1, descricao: 'Aluguel do Escritório', fornecedor: 'Imobiliária Central', valor: 3500, vencimento: new Date(2023, 6, 10), status: 'Pago' },
  { id: 2, descricao: 'Licenças de Software', fornecedor: 'SaaS Solutions', valor: 1200, vencimento: new Date(2023, 6, 15), status: 'Pago' },
  { id: 3, descricao: 'Salários', fornecedor: 'Folha de Pagamento', valor: 25000, vencimento: new Date(2023, 7, 5), status: 'Pendente' },
  { id: 4, descricao: 'Internet e Telefonia', fornecedor: 'Telecom Brasil', valor: 800, vencimento: new Date(2023, 6, 20), status: 'Pendente' },
  { id: 5, descricao: 'Material de Escritório', fornecedor: 'Suprimentos Rápidos', valor: 350, vencimento: new Date(2023, 6, 18), status: 'Pago' },
];

const Finances = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleAddTransaction = (type: string) => {
    toast({
      title: `Nova ${type === 'receita' ? 'Receita' : 'Despesa'} Adicionada`,
      description: `A ${type} foi registrada com sucesso.`
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Finanças</h1>
        <p className="text-muted-foreground">Gerencie receitas, despesas e fluxo de caixa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total a Receber</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-emerald-500 mr-2" />
              <span className="text-2xl font-bold text-emerald-500">{formatCurrency(28750)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Para os próximos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-rose-500 mr-2" />
              <span className="text-2xl font-bold text-rose-500">{formatCurrency(25800)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Para os próximos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo Previsto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-2xl font-bold text-blue-500">{formatCurrency(2950)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Diferença entre receitas e despesas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="receitas" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="receitas">Contas a Receber</TabsTrigger>
            <TabsTrigger value="despesas">Contas a Pagar</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-8 w-[200px] md:w-[250px]"
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-3.5 w-3.5 mr-2" />
                  Filtrar
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Filtrar por</h4>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="todos">
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="pago">Pago/Recebido</SelectItem>
                        <SelectItem value="atrasado">Atrasado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Vencimento</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP', { locale: ptBR }) : <span>Selecione uma data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Limpar</Button>
                    <Button size="sm">Aplicar</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-3.5 w-3.5 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <TabsContent value="receitas" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Contas a Receber</h2>
            <Button onClick={() => handleAddTransaction('receita')}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Receita
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receitasData.map((receita) => (
                    <TableRow key={receita.id}>
                      <TableCell className="font-medium">{receita.descricao}</TableCell>
                      <TableCell>{receita.cliente}</TableCell>
                      <TableCell>{formatCurrency(receita.valor)}</TableCell>
                      <TableCell>{format(receita.vencimento, 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          receita.status === 'Recebido' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                            : receita.status === 'Atrasado'
                            ? 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                        }`}>
                          {receita.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="despesas" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Contas a Pagar</h2>
            <Button onClick={() => handleAddTransaction('despesa')}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Despesa
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {despesasData.map((despesa) => (
                    <TableRow key={despesa.id}>
                      <TableCell className="font-medium">{despesa.descricao}</TableCell>
                      <TableCell>{despesa.fornecedor}</TableCell>
                      <TableCell>{formatCurrency(despesa.valor)}</TableCell>
                      <TableCell>{format(despesa.vencimento, 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          despesa.status === 'Pago' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                            : despesa.status === 'Atrasado'
                            ? 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                        }`}>
                          {despesa.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finances;
