
import React from 'react';
import DealPipeline from '@/components/deals/DealPipeline';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus } from 'lucide-react';

const Deals = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Deals</h1>
        <p className="text-muted-foreground">Manage your sales pipeline</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Deals</SelectItem>
              <SelectItem value="my">My Deals</SelectItem>
              <SelectItem value="active">Active Deals</SelectItem>
              <SelectItem value="closed">Closed Deals</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="value">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="value">Value: High to Low</SelectItem>
              <SelectItem value="name">Deal Name</SelectItem>
              <SelectItem value="date">Due Date</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>
      
      <DealPipeline />
    </div>
  );
};

export default Deals;
