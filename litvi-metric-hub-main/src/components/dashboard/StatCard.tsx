
import { ReactNode } from 'react';
import { DashboardCard } from './DashboardCard';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, description, trend, className }: StatCardProps) {
  return (
    <DashboardCard className={cn("flex flex-col gap-4", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
      
      {(description || trend) && (
        <div className="flex items-center mt-auto pt-2 border-t border-slate-100">
          {trend && (
            <div className={cn(
              "flex items-center text-xs font-medium mr-2",
              trend.isPositive ? "text-emerald-600" : "text-red-600"
            )}>
              <span className="inline-block mr-1">
                {trend.isPositive ? "↑" : "↓"}
              </span>
              {trend.value}%
            </div>
          )}
          
          {description && (
            <p className="text-xs text-slate-500">{description}</p>
          )}
        </div>
      )}
    </DashboardCard>
  );
}
