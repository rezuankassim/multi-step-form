import {FormikProps, isFunction} from 'formik';
import React from 'react';

export type WizardStepProps = {
  children: ((props: FormikProps<Record<string, any>>) => React.ReactNode) | React.ReactNode;
  formik?: FormikProps<Record<string, any>>;
  validationSchema?: any | (() => any);
  onSubmit?: (values?: Record<any, any>, bag?: any) => void;
};

const WizardStep: React.FC<WizardStepProps> = ({children, formik}) => (
  <>
    {isFunction(children)
      ? (children as (bag: FormikProps<Record<string, any>>) => React.ReactNode)(
          formik as FormikProps<Record<string, any>>
        )
      : children}
  </>
);

export default WizardStep;
