import React from 'react';

interface TextStyleDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const TextStyleDropdown: React.FC<TextStyleDropdownProps> = ({ value, onChange }) => {
  const textStyles = [
    { value: 'normal', label: 'Normal text' },
    { value: 'h1', label: 'Heading 1' },
    { value: 'h2', label: 'Heading 2' },
    { value: 'h3', label: 'Heading 3' },
    { value: 'h4', label: 'Heading 4' },
    { value: 'h5', label: 'Heading 5' },
    { value: 'h6', label: 'Heading 6' },
    { value: 'p', label: 'Paragraph' },
    { value: 'blockquote', label: 'Quote' },
    { value: 'code', label: 'Code' }
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs border-0 bg-transparent focus:outline-none h-7 px-2 min-w-[80px]"
    >
      {textStyles.map((style) => (
        <option key={style.value} value={style.value}>
          {style.label}
        </option>
      ))}
    </select>
  );
};

export default TextStyleDropdown;
