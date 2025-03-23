
import React from 'react';
import ContactList from '@/components/contacts/ContactList';

const Contacts = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Contatos</h1>
        <p className="text-muted-foreground">Gerencie seus contatos e organizações</p>
      </div>
      
      <ContactList />
    </div>
  );
};

export default Contacts;
