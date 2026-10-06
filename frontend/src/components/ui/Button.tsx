import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-bold transition-colors duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[#0E2A47] hover:bg-[#163B63] text-white focus:ring-[#0E2A47]",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 focus:ring-slate-400",
    outline: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-[#0E2A47]",
    amber: "bg-[#F5A623] hover:bg-[#D48810] text-[#0E2A47] font-extrabold focus:ring-[#F5A623]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
