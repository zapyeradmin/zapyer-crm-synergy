
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for recent activities
const activities = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      avatar: '',
      initials: 'JD',
    },
    action: 'Added a new contact',
    target: 'Sarah Johnson',
    time: '2 hours ago',
  },
  {
    id: 2,
    user: {
      name: 'Emma Wilson',
      avatar: '',
      initials: 'EW',
    },
    action: 'Closed deal',
    target: 'Project Phoenix',
    time: '4 hours ago',
  },
  {
    id: 3,
    user: {
      name: 'Robert Chen',
      avatar: '',
      initials: 'RC',
    },
    action: 'Updated opportunity',
    target: 'Tech Innovations',
    time: 'Yesterday',
  },
  {
    id: 4,
    user: {
      name: 'Lisa Taylor',
      avatar: '',
      initials: 'LT',
    },
    action: 'Scheduled meeting with',
    target: 'Michael Scott',
    time: 'Yesterday',
  },
  {
    id: 5,
    user: {
      name: 'David Kim',
      avatar: '',
      initials: 'DK',
    },
    action: 'Created task',
    target: 'Q4 Budget Review',
    time: '2 days ago',
  },
];

const RecentActivity = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <div className="flex items-start p-4 hover:bg-muted/50 transition-colors">
                <Avatar className="h-9 w-9 mr-4">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <span className="font-semibold">{activity.user.name}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-semibold">{activity.target}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              {index < activities.length - 1 && (
                <div className="pl-[69px] pr-4">
                  <div className="h-px bg-border" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
