import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children, required = false }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-orange-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
};