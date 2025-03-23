
import React from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import MetricCard from '@/components/dashboard/MetricCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { Users, DollarSign, TrendingUp, Calendar, BarChart4 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for charts
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4000 },
  { name: 'May', value: 7000 },
  { name: 'Jun', value: 6000 },
  { name: 'Jul', value: 8000 },
];

const dealsByStageData = [
  { name: 'Qualified', value: 12 },
  { name: 'Meeting', value: 19 },
  { name: 'Proposal', value: 8 },
  { name: 'Negotiation', value: 5 },
  { name: 'Closed Won', value: 16 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-slide-in-bottom">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your CRM performance</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Contacts"
          value="2,567"
          change={12}
          description="vs last month"
          icon={<Users className="h-4 w-4" />}
          className="appear-delay-1"
        />
        
        <MetricCard
          title="Open Deals"
          value="$127,490"
          change={-3}
          description="vs last month"
          icon={<DollarSign className="h-4 w-4" />}
          className="appear-delay-1"
        />
        
        <MetricCard
          title="Conversion Rate"
          value="24.8%"
          change={7}
          description="vs last month"
          icon={<TrendingUp className="h-4 w-4" />}
          className="appear-delay-2"
        />
        
        <MetricCard
          title="Meetings"
          value="16"
          description="this week"
          icon={<Calendar className="h-4 w-4" />}
          className="appear-delay-2"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <DashboardCard
          title="Revenue Forecast"
          description="Monthly projection"
          className="md:col-span-4 appear-delay-2"
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '0.5rem', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    border: 'none',
                  }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
        
        <div className="md:col-span-3 space-y-6 appear-delay-3">
          <DashboardCard title="Deals by Stage">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dealsByStageData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.2} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 12 }} 
                    width={100} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      border: 'none',
                    }}
                    formatter={(value) => [value, 'Deals']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    fill="#8884d8"
                    stroke="#8884d8"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 appear-delay-3">
        <RecentActivity />
        
        <DashboardCard title="Upcoming Tasks">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <p className="font-medium">Follow up with Tech Innovations</p>
                <p className="text-sm text-muted-foreground">Due in 2 days</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300 px-2 py-1 rounded-full">
                Call
              </span>
            </div>
            
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <p className="font-medium">Prepare project proposal</p>
                <p className="text-sm text-muted-foreground">Due tomorrow</p>
              </div>
              <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300 px-2 py-1 rounded-full">
                Document
              </span>
            </div>
            
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <p className="font-medium">Sales meeting with ABC Corp</p>
                <p className="text-sm text-muted-foreground">Due in 3 days</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300 px-2 py-1 rounded-full">
                Meeting
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Quarterly review preparation</p>
                <p className="text-sm text-muted-foreground">Due in 5 days</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300 px-2 py-1 rounded-full">
                Planning
              </span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
