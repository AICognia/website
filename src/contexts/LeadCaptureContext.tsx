import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import LeadCaptureModal from '../components/LeadCaptureModal';

interface LeadCaptureContextType {
  openLeadCapture: (source?: string) => void;
  closeLeadCapture: () => void;
  isOpen: boolean;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | undefined>(undefined);

export const useLeadCapture = () => {
  const context = useContext(LeadCaptureContext);
  if (!context) {
    throw new Error('useLeadCapture must be used within a LeadCaptureProvider');
  }
  return context;
};

interface LeadCaptureProviderProps {
  children: ReactNode;
}

export const LeadCaptureProvider: React.FC<LeadCaptureProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('unknown');

  const openLeadCapture = useCallback((src: string = 'unknown') => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const closeLeadCapture = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LeadCaptureContext.Provider value={{ openLeadCapture, closeLeadCapture, isOpen }}>
      {children}
      <LeadCaptureModal isOpen={isOpen} onClose={closeLeadCapture} source={source} />
    </LeadCaptureContext.Provider>
  );
};
