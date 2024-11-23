import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectListProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const SelectList: React.FC<SelectListProps> = ({ options, selectedValue, onChange }) => {
  return (
    <select value={selectedValue} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectList;
