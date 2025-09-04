import React from 'react';
import { Button } from '@/components/ui/button';

interface FormatButtonProps {
  icon: string;
  alt: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

const FormatButton: React.FC<FormatButtonProps> = ({
  icon,
  alt,
  onClick,
  isActive = false,
  className = ''
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-7 w-7 p-0 ${isActive ? 'bg-gray-200' : ''} ${className}`}
      onClick={onClick}
    >
      <img src={icon} alt={alt} className="w-3.5 h-3.5" />
    </Button>
  );
};

export default FormatButton;
