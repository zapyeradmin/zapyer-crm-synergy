
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, MoreHorizontal, Plus, Filter } from 'lucide-react';

// Sample data for contacts
const contacts = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    company: 'Acme Inc.',
    position: 'CEO',
    status: 'Active',
    phone: '+1 (555) 123-4567',
    avatar: '',
    initials: 'JS',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    company: 'TechCorp',
    position: 'Marketing Director',
    status: 'Active',
    phone: '+1 (555) 234-5678',
    avatar: '',
    initials: 'SJ',
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    company: 'Innovate Solutions',
    position: 'CTO',
    status: 'Inactive',
    phone: '+1 (555) 345-6789',
    avatar: '',
    initials: 'MC',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    company: 'Global Enterprises',
    position: 'Sales Manager',
    status: 'Active',
    phone: '+1 (555) 456-7890',
    avatar: '',
    initials: 'ED',
  },
  {
    id: 5,
    name: 'David Kim',
    email: 'david.k@example.com',
    company: 'Summit Group',
    position: 'Operations Director',
    status: 'Active',
    phone: '+1 (555) 567-8901',
    avatar: '',
    initials: 'DK',
  },
  {
    id: 6,
    name: 'Lisa Wang',
    email: 'lisa.w@example.com',
    company: 'Pinnacle Systems',
    position: 'Product Manager',
    status: 'Inactive',
    phone: '+1 (555) 678-9012',
    avatar: '',
    initials: 'LW',
  },
];

const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search contacts..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-10">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                    <Input id="first-name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                    <Input id="last-name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input id="phone" type="tel" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Company</label>
                  <Input id="company" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="position" className="text-sm font-medium">Position</label>
                  <Input id="position" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Contact</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Company</TableHead>
              <TableHead className="hidden md:table-cell">Position</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.initials}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{contact.name}</div>
                  </div>
                </TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell className="hidden md:table-cell">{contact.company}</TableCell>
                <TableCell className="hidden md:table-cell">{contact.position}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={contact.status === 'Active' ? 'default' : 'secondary'}>
                    {contact.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit contact</DropdownMenuItem>
                      <DropdownMenuItem>Delete contact</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContactList;
