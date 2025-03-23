
import React, { useState } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

const events = [
  {
    id: 1,
    title: 'Meeting with TechCorp',
    description: 'Discuss project requirements',
    date: new Date(2023, 9, 18, 10, 0),
    duration: 60, // minutes
    type: 'meeting',
  },
  {
    id: 2,
    title: 'Call with Sarah Johnson',
    description: 'Potential client follow-up',
    date: new Date(2023, 9, 18, 14, 0),
    duration: 30, // minutes
    type: 'call',
  },
  {
    id: 3,
    title: 'Proposal deadline',
    description: 'Submit final proposal to Acme Inc.',
    date: new Date(2023, 9, 20, 17, 0),
    duration: 0, // task
    type: 'deadline',
  },
  {
    id: 4,
    title: 'Team review meeting',
    description: 'Quarterly strategy discussion',
    date: new Date(2023, 9, 25, 13, 0),
    duration: 90, // minutes
    type: 'meeting',
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  const handlePreviousMonth = () => {
    setMonth(subMonths(month, 1));
  };

  const handleNextMonth = () => {
    setMonth(addMonths(month, 1));
  };

  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    (event) => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
  );

  const formatEventTime = (date: Date) => {
    return format(date, 'h:mm a');
  };

  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300';
      case 'call':
        return 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300';
      case 'deadline':
        return 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Calendar</h1>
        <p className="text-muted-foreground">Manage your meetings and schedule</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-[350px]">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base">
                  {format(month, 'MMMM yyyy')}
                </CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-3">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  month={month}
                  onMonthChange={setMonth}
                  className="border-0"
                />
              </div>
              <div className="px-6 py-4 border-t">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                Events for {format(date, 'MMMM d, yyyy')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="flex items-start p-3 rounded-md border hover:bg-muted/50 transition-colors">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="text-sm font-medium">{formatEventTime(event.date)}</div>
                        {event.duration > 0 && (
                          <div className="text-xs text-muted-foreground">
                            {event.duration} min
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{event.title}</div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeStyle(event.type)}`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No events scheduled for this day</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
