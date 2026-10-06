import React from 'react';

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  subtitle: string;
  subtitleColor?: string;
  icon: React.ReactNode;
  iconBg: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  subtitleColor = 'text-slate-500',
  icon,
  iconBg
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{title}</p>
          <div className="text-2xl font-black text-[#0E2A47] mt-1 tracking-tight">{value}</div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center">
        <span className={`text-xs font-bold ${subtitleColor}`}>{subtitle}</span>
      </div>
    </div>
  );
};
