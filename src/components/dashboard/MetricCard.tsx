
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const MetricCard = ({
  title,
  value,
  change,
  description,
  icon,
  className,
}: MetricCardProps) => {
  const showChange = change !== undefined;
  const isPositiveChange = showChange && change > 0;
  const isNegativeChange = showChange && change < 0;

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>
          {showChange && (
            <span
              className={cn(
                'text-xs font-medium rounded-full px-1.5 py-0.5 flex items-center',
                isPositiveChange && 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-400/20',
                isNegativeChange && 'text-rose-700 bg-rose-100 dark:text-rose-400 dark:bg-rose-400/20',
                !isPositiveChange && !isNegativeChange && 'text-zinc-700 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-400/20'
              )}
            >
              {isPositiveChange && <ArrowUpIcon className="h-3 w-3 mr-0.5" />}
              {isNegativeChange && <ArrowDownIcon className="h-3 w-3 mr-0.5" />}
              {change}%
            </span>
          )}
        </div>
        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
