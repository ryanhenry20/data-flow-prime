
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  trend: "up" | "down";
  color?: "blue" | "green" | "orange" | "purple";
}

export function KPICard({ title, value, change, icon: Icon, trend, color = "blue" }: KPICardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-success-500 to-success-600", 
    orange: "from-warning-500 to-warning-600",
    purple: "from-ai-purple to-purple-600"
  };

  const bgClasses = {
    blue: "bg-blue-50",
    green: "bg-success-50",
    orange: "bg-warning-50", 
    purple: "bg-purple-50"
  };

  return (
    <Card className="kpi-card group hover:scale-105 transform transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${bgClasses[color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-success-600' : color === 'orange' ? 'text-warning-600' : 'text-ai-purple'}`} />
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          trend === 'up' 
            ? 'bg-success-50 text-success-700' 
            : 'bg-error-50 text-error-700'
        }`}>
          {trend === 'up' ? '+' : ''}{change}%
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-1">{value}</h3>
        <p className="text-sm text-neutral-500">{title}</p>
      </div>

      {/* Animated background glow effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colorClasses[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />
    </Card>
  );
}
