import React from 'react';

export type WizardStepProps = {
  children: React.ReactNode;
  validationSchema: any | (() => any);
  onSubmit?: (values?: Record<any, any>, bag?: any) => void;
};

const WizardStep: React.FC<WizardStepProps> = ({children}) => <>{children}</>;

export default WizardStep;
