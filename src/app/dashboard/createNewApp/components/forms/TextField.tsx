import React, { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  helpText?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  placeholder, 
  required = false, 
  helpText = false, 
  ...props 
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      {required && <span className="text-red-500">*</span>}
      {helpText && <img src="/icons/helpCircle.svg" alt="help" className="w-4 h-4" />}
    </div>
    <Input 
      placeholder={placeholder}
      className="w-full"
      {...props}
    />
  </div>
);

export default TextField;