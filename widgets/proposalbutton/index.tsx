import React, { useState } from 'react';
import { ProposalJsonModal } from '../proposaldatamodal';
import { ViewButton, ButtonIcon, ButtonText } from './styles';

interface ProposalButtonProps {
  is_visible?: boolean;
  jsonData: any;
}

export const ProposalButton: React.FC<ProposalButtonProps> = ({
  is_visible = true,
  jsonData
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!is_visible) return null;

  return (
    <>
      <ViewButton onClick={() => setIsModalOpen(true)}>
        <ButtonIcon>📋</ButtonIcon>
        <ButtonText>View Raw JSON</ButtonText>
      </ViewButton>
      {isModalOpen && (
        <ProposalJsonModal 
          jsonData={jsonData} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default ProposalButton;