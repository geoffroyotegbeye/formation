import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  name, 
  options, 
  value, 
  onChange, 
  required = false 
}) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="w-4 h-4 text-orange-500 border-slate-300 focus:ring-orange-500 focus:ring-2"
          />
          <span className="text-sm text-slate-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};