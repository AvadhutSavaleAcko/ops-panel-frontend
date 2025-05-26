import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { setPayloadData } from '@store/slices/globalState';
import { useDispatch } from 'react-redux';

const DropdownContainer = styled.div`
  position: relative;
  width: 120px;
`;

const DropdownLabel = styled.label`
  font-size: 0.75rem;
  color:rgb(235, 241, 249);
  margin-bottom: 0.25rem;
  display: block;
  
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:after {
    content: '';
    border: solid white;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 2px;
    transform: rotate(45deg);
    margin-left: 8px;
    transition: transform 0.2s ease;
  }

  &[aria-expanded="true"]:after {
    transform: rotate(-135deg);
  }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  padding: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #1f2937;
  font-size: 0.875rem;

  &:hover {
    background: #f0f0f0;
  }
`;


interface DropdownProps {
  options: Array<{
    value: string;
    displayValue: string;
  }>;
  value?: {
    value: string;
    displayValue: string;
  };
  onChange?: (option: { value: string; displayValue: string }) => void;
  label?: string;
  heading?: string;
  payloadData?: {
    name: string;
    value: string;
  };
}

export const CustomDropdown: React.FC<DropdownProps> = ({
  options = [],
  value,
  onChange,
  label,
  heading,
  payloadData
}) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: { value: string; displayValue: string }) => {
    setSelectedValue(option);
    setIsOpen(false);
    

    if (payloadData?.name) {
      dispatch(setPayloadData({
        [payloadData.name]: option.value
      }));
    }

    onChange?.(option);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      {label && <DropdownLabel>{label}</DropdownLabel>}
      <DropdownButton
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {selectedValue?.displayValue || heading || 'Select'}
      </DropdownButton>
      <DropdownList isOpen={isOpen} role="listbox">
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleSelect(option)}
            role="option"
            aria-selected={option.value === selectedValue?.value}
          >
            {option.displayValue}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default CustomDropdown;