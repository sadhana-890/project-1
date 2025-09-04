import React from 'react';

interface TextAlignDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const TextAlignDropdown: React.FC<TextAlignDropdownProps> = ({ value, onChange }) => {
  const alignOptions = [
    { value: 'left', label: 'Left', icon: '/icons/align-left.svg' },
    { value: 'center', label: 'Center', icon: '/icons/align-center.svg' },
    { value: 'right', label: 'Right', icon: '/icons/align-right.svg' },
    { value: 'justify', label: 'Justify', icon: '/icons/align-justify.svg' },
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs border-0 bg-transparent focus:outline-none h-7 px-2 min-w-[70px] relative z-10"
    >
      {alignOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TextAlignDropdown;