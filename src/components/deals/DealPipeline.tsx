
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, MoreHorizontal, Plus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

// Sample data for deal stages and deals
const initialStages = [
  {
    id: 'qualified',
    title: 'Qualified',
    deals: [
      {
        id: 'deal-1',
        title: 'Enterprise Software Solution',
        company: 'Acme Inc.',
        value: 35000,
        contact: {
          name: 'John Smith',
          avatar: '',
          initials: 'JS',
          phone: '+1 (555) 123-4567', // Adicionado número de telefone
        },
        dueDate: '2023-10-20',
      },
      {
        id: 'deal-2',
        title: 'IT Infrastructure Upgrade',
        company: 'TechCorp',
        value: 48000,
        contact: {
          name: 'Sarah Johnson',
          avatar: '',
          initials: 'SJ',
          phone: '+1 (555) 234-5678', // Adicionado número de telefone
        },
        dueDate: '2023-10-25',
      },
    ],
  },
  {
    id: 'meeting',
    title: 'Meeting',
    deals: [
      {
        id: 'deal-3',
        title: 'Cloud Migration Project',
        company: 'Global Enterprises',
        value: 75000,
        contact: {
          name: 'Emily Davis',
          avatar: '',
          initials: 'ED',
          phone: '+1 (555) 456-7890', // Adicionado número de telefone
        },
        dueDate: '2023-10-18',
      },
    ],
  },
  {
    id: 'proposal',
    title: 'Proposal',
    deals: [
      {
        id: 'deal-4',
        title: 'Security System Implementation',
        company: 'Pinnacle Systems',
        value: 42500,
        contact: {
          name: 'Lisa Wang',
          avatar: '',
          initials: 'LW',
          phone: '+1 (555) 678-9012', // Adicionado número de telefone
        },
        dueDate: '2023-10-30',
      },
    ],
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    deals: [
      {
        id: 'deal-5',
        title: 'Data Analytics Platform',
        company: 'Innovate Solutions',
        value: 65000,
        contact: {
          name: 'Michael Chen',
          avatar: '',
          initials: 'MC',
          phone: '+1 (555) 345-6789', // Adicionado número de telefone
        },
        dueDate: '2023-10-15',
      },
    ],
  },
  {
    id: 'closed',
    title: 'Closed Won',
    deals: [
      {
        id: 'deal-6',
        title: 'Digital Transformation Strategy',
        company: 'Summit Group',
        value: 95000,
        contact: {
          name: 'David Kim',
          avatar: '',
          initials: 'DK',
          phone: '+1 (555) 567-8901', // Adicionado número de telefone
        },
        dueDate: '2023-10-10',
      },
    ],
  },
];

const DealPipeline = () => {
  const [stages, setStages] = useState(initialStages);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    
    // Dropped outside the list
    if (!destination) return;
    
    // If the source and destination are the same, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    
    // Find source and destination stage
    const sourceStage = stages.find(stage => stage.id === source.droppableId)!;
    const destStage = stages.find(stage => stage.id === destination.droppableId)!;
    
    // Create new stages array
    const newStages = [...stages];
    
    // Remove deal from source
    const [movedDeal] = sourceStage.deals.splice(source.index, 1);
    
    // Add deal to destination
    destStage.deals.splice(destination.index, 0, movedDeal);
    
    setStages(newStages);
  };

  const handleWhatsAppClick = (phone: string) => {
    // Remove non-numeric characters from phone number
    const formattedPhone = phone.replace(/\D/g, '');
    // Open WhatsApp link in a new tab
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
    
    toast({
      title: "WhatsApp",
      description: `Abrindo WhatsApp para ${phone}`,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 overflow-x-auto pb-6 px-2">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-[300px]">
            <div className="bg-muted/40 backdrop-blur-sm rounded-lg p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <h3 className="font-medium">{stage.title}</h3>
                  <span className="ml-2 text-xs bg-background text-muted-foreground px-1.5 py-0.5 rounded-full">
                    {stage.deals.length}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Droppable droppableId={stage.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3"
                  >
                    {stage.deals.map((deal, index) => (
                      <Draggable key={deal.id} draggableId={deal.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              "bg-background rounded-md border shadow-sm",
                              snapshot.isDragging && "shadow-lg"
                            )}
                          >
                            <div className="p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">{deal.title}</div>
                                <div className="flex items-center gap-1">
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    className="h-7 w-7 bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleWhatsAppClick(deal.contact.phone)}
                                    title="Enviar mensagem via WhatsApp"
                                  >
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    <span className="sr-only">WhatsApp</span>
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-7 w-7">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[160px]">
                                      <DropdownMenuItem>View details</DropdownMenuItem>
                                      <DropdownMenuItem>Edit deal</DropdownMenuItem>
                                      <DropdownMenuItem>Delete deal</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              
                              <div className="text-xs text-muted-foreground mb-3">{deal.company}</div>
                              
                              <div className="flex items-center text-sm mb-3">
                                <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span className="font-medium">{formatCurrency(deal.value)}</span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Avatar className="h-6 w-6 mr-1">
                                    <AvatarImage src={deal.contact.avatar} alt={deal.contact.name} />
                                    <AvatarFallback className="text-[10px]">{deal.contact.initials}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{deal.contact.name}</span>
                                </div>
                                
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{formatDate(deal.dueDate)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DealPipeline;
