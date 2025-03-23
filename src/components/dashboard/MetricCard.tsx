
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  description,
  className,
}) => {
  const getTrendIcon = () => {
    if (!change || change === 0) return <ArrowRight className="h-3 w-3" />;
    return change > 0 ? (
      <ArrowUp className="h-3 w-3" />
    ) : (
      <ArrowDown className="h-3 w-3" />
    );
  };

  const getTrendColor = () => {
    if (!change || change === 0) return 'text-muted-foreground';
    return change > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-glass-hover border-0 bg-opacity-70 backdrop-blur-sm", 
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2">
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
          {change !== undefined && (
            <div className="mt-1 flex items-center space-x-1">
              <span className={cn("text-xs font-medium flex items-center", getTrendColor())}>
                {getTrendIcon()}
                <span className="ml-1">{Math.abs(change)}%</span>
              </span>
              {description && (
                <>
                  <Separator orientation="vertical" className="h-3" />
                  <span className="text-xs text-muted-foreground">{description}</span>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
