import React, { ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '../rich-text-editor';

interface TextareaFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  helpText?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ 
  label, 
  placeholder, 
  required = false, 
  helpText = false, 
  value = '',
  onChange,
  className = ''
}) => {
  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        {required && <span className="text-red-500">*</span>}
        {helpText && <img src="/icons/helpCircle.svg" alt="help" className="w-4 h-4" />}
      </div>
      <RichTextEditor
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextareaField;
