
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const activities = [
  {
    id: 1,
    user: {
      name: 'João Silva',
      avatar: '',
      initials: 'JS',
    },
    action: 'criou um novo contato',
    target: 'Maria Oliveira',
    time: 'há 10 minutos',
  },
  {
    id: 2,
    user: {
      name: 'Ana Santos',
      avatar: '',
      initials: 'AS',
    },
    action: 'atualizou o negócio',
    target: 'Implementação de Software SaaS',
    time: 'há 25 minutos',
  },
  {
    id: 3,
    user: {
      name: 'Carlos Ferreira',
      avatar: '',
      initials: 'CF',
    },
    action: 'programou uma reunião com',
    target: 'Tech Innovations Brasil',
    time: 'há 1 hora',
  },
  {
    id: 4,
    user: {
      name: 'Luísa Pereira',
      avatar: '',
      initials: 'LP',
    },
    action: 'completou a tarefa',
    target: 'Enviar proposta comercial',
    time: 'há 2 horas',
  },
  {
    id: 5,
    user: {
      name: 'Bruno Costa',
      avatar: '',
      initials: 'BC',
    },
    action: 'adicionou uma nota ao',
    target: 'Projeto de Desenvolvimento Web',
    time: 'há 3 horas',
  },
];

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>As ações mais recentes em seu CRM</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{' '}
                  {activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
