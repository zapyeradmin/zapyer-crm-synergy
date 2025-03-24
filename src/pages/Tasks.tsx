
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, Plus, Star, User, CalendarRange, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

// Sample data for tasks
const initialTasks = [
  {
    id: 1,
    title: 'Call John Smith from Acme Inc.',
    description: 'Follow up about the new proposal',
    completed: false,
    priority: 'high',
    due: '2023-10-18',
    assignee: 'You',
    type: 'call',
    phone: '+1 (555) 123-4567', // Adicionado número de telefone
  },
  {
    id: 2,
    title: 'Send contract to TechCorp',
    description: 'Final version of the service agreement',
    completed: false,
    priority: 'medium',
    due: '2023-10-20',
    assignee: 'You',
    type: 'email',
    phone: '+1 (555) 234-5678', // Adicionado número de telefone
  },
  {
    id: 3,
    title: 'Update sales forecast',
    description: 'Revise Q4 projections for management meeting',
    completed: false,
    priority: 'medium',
    due: '2023-10-25',
    assignee: 'Sarah Johnson',
    type: 'task',
    phone: '+1 (555) 765-4321', // Adicionado número de telefone
  },
  {
    id: 4,
    title: 'Research industry trends',
    description: 'Compile report on emerging technologies',
    completed: true,
    priority: 'low',
    due: '2023-10-15',
    assignee: 'You',
    type: 'research',
    phone: '', // Sem número de telefone
  },
  {
    id: 5,
    title: 'Schedule demo with Global Enterprises',
    description: 'Product demonstration for new client',
    completed: false,
    priority: 'high',
    due: '2023-10-19',
    assignee: 'David Kim',
    type: 'meeting',
    phone: '+1 (555) 567-8901', // Adicionado número de telefone
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  
  const handleTaskToggle = (taskId: number) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        description: '',
        completed: false,
        priority: 'medium',
        due: '',
        assignee: 'You',
        type: 'task',
        phone: '', // Sem número de telefone para nova tarefa
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };
  
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
      case 'email':
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
      case 'meeting':
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
      case 'research':
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
    }
  };

  const handleWhatsAppClick = (phone: string) => {
    if (!phone) {
      toast({
        title: "Erro",
        description: "Não há número de telefone disponível para esta tarefa",
        variant: "destructive"
      });
      return;
    }
    
    // Remove non-numeric characters from phone number
    const formattedPhone = phone.replace(/\D/g, '');
    // Open WhatsApp link in a new tab
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
    
    toast({
      title: "WhatsApp",
      description: `Abrindo WhatsApp para ${phone}`,
    });
  };

  const renderTaskItem = (task: any) => (
    <div
      key={task.id}
      className={cn(
        "flex items-start space-x-4 p-3 rounded-md border hover:bg-muted/50 transition-colors",
        task.completed && "bg-muted/20"
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => handleTaskToggle(task.id)}
        className="mt-1"
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
            {task.title}
          </p>
          <div className="flex items-center gap-2">
            {task.phone && (
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7 bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleWhatsAppClick(task.phone)}
                title="Enviar mensagem via WhatsApp"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="sr-only">WhatsApp</span>
              </Button>
            )}
            <span className={cn("text-xs px-2 py-1 rounded-full", getPriorityStyles(task.priority))}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        </div>
        {task.description && (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        )}
        <div className="flex items-center space-x-4 pt-2">
          <div className="flex items-center text-xs text-muted-foreground">
            {getTypeIcon(task.type)}
            <span>{task.type.charAt(0).toUpperCase() + task.type.slice(1)}</span>
          </div>
          {task.due && (
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarRange className="h-4 w-4 mr-1" />
              <span>{new Date(task.due).toLocaleDateString()}</span>
            </div>
          )}
          <div className="flex items-center text-xs text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            <span>{task.assignee}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Tasks</h1>
        <p className="text-muted-foreground">Manage your to-do list and stay organized</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleAddTask} className="flex-1 flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </form>
        
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="my">My Tasks</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="all" className="flex gap-2 items-center">
            <Star className="h-4 w-4" />
            <span>All</span>
          </TabsTrigger>
          <TabsTrigger value="today" className="flex gap-2 items-center">
            <Clock className="h-4 w-4" />
            <span>Today</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex gap-2 items-center">
            <CheckCircle2 className="h-4 w-4" />
            <span>Completed</span>
          </TabsTrigger>
          <TabsTrigger value="assigned" className="flex gap-2 items-center">
            <User className="h-4 w-4" />
            <span>Assigned</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map(renderTaskItem)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Today's Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Tasks due today will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Completed Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks
                  .filter(task => task.completed)
                  .map(renderTaskItem)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assigned" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Assigned Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Tasks assigned to others will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;
