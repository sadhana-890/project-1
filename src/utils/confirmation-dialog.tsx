// /utils/confirmation-dialog.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onSkip?: () => void;
  confirmText?: string;
  cancelText?: string;
  skipText?: string;
  showSkip?: boolean;
  variant?: 'default' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  onConfirm,
  onCancel,
  onSkip,
  confirmText = "Yes",
  cancelText = "Cancel",
  skipText = "Skip",
  showSkip = false,
  variant = 'default',
  size = 'md'
}) => {
  if (!isOpen) return null;

  // Size variants
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  // Color variants
  const variantClasses = {
    default: {
      title: 'text-gray-900',
      message: 'text-gray-600',
      confirmButton: ''
    },
    danger: {
      title: 'text-red-900',
      message: 'text-red-600',
      confirmButton: 'bg-red-600 hover:bg-red-700'
    },
    warning: {
      title: 'text-yellow-900',
      message: 'text-yellow-600',
      confirmButton: 'bg-yellow-600 hover:bg-yellow-700'
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onCancel(); // Fallback to cancel if no skip handler
    }
  };

  return (
    <div className="fixed inset-0 bg-white/20 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg p-6 ${sizeClasses[size]} w-full shadow-xl animate-in fade-in-0 zoom-in-95 duration-300`}>
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className={`text-lg font-semibold mb-2 ${variantClasses[variant].title}`}>
            {title}
          </h3>
          {message && (
            <p className={`text-sm ${variantClasses[variant].message}`}>
              {message}
            </p>
          )}
        </div>
                
        {/* Action Buttons */}
        <div className={`flex gap-3 ${showSkip ? 'justify-between' : 'justify-center'}`}>
          <div className="flex gap-3">
            <Button
              onClick={onConfirm}
              className={`px-6 py-2 ${variantClasses[variant].confirmButton}`}
            >
              {confirmText}
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="px-6 py-2"
            >
              {cancelText}
            </Button>
          </div>
                    
          {/* Skip Button (if enabled) */}
          {showSkip && (
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
            >
              {skipText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook for easier usage (optional)
export const useConfirmationDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return {
    isOpen,
    openDialog,
    closeDialog,
    setIsOpen
  };
};