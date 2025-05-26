import React from 'react';
import {
  ToolbarContainer,
  SearchInput,
  ExportButton,
  SearchContainer,
  ButtonContainer
} from './styles';

interface TableToolbarProps {
  onSearch?: (value: string) => void;
  onExport?: () => void;
  config?: {
    search?: {
      placeholder?: string;
      enabled?: boolean;
    };
    export?: {
      enabled?: boolean;
      label?: string;
    };
  };
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  onSearch,
  onExport,
  config = {}
}) => {
  const {
    search = { enabled: true, placeholder: 'Search...' },
    export: exportConfig = { enabled: true, label: 'Export' }
  } = config;

  return (
    <ToolbarContainer>
      <SearchContainer>
        {search.enabled && (
          <SearchInput
            type="text"
            placeholder={search.placeholder}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        )}
      </SearchContainer>
      <ButtonContainer>
        {exportConfig.enabled && (
          <ExportButton onClick={onExport}>
            {exportConfig.label}
          </ExportButton>
        )}
      </ButtonContainer>
    </ToolbarContainer>
  );
};