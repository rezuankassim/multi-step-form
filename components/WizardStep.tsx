import {FormikProps, FormikValues, isFunction} from 'formik';
import React from 'react';

export type WizardStepProps = {
  children:
    | ((props: {
        formik: FormikProps<Record<string, any>>;
        changeStep: (step: number, values: FormikValues) => void;
      }) => React.ReactNode)
    | React.ReactNode;
  formik?: FormikProps<Record<string, any>>;
  changeStep?: (step: number, values: FormikValues) => void;
  validationSchema?: any | (() => any);
  onSubmit?: (values?: Record<any, any>, bag?: any) => void;
};

const WizardStep: React.FC<WizardStepProps> = ({children, formik, changeStep}) => (
  <>
    {isFunction(children)
      ? (
          children as (props: {
            formik: FormikProps<Record<string, any>>;
            changeStep: (step: number, values: FormikValues) => void;
          }) => React.ReactNode
        )({
          formik: formik as FormikProps<Record<string, any>>,
          changeStep: changeStep as (step: number, values: FormikValues) => void,
        })
      : children}
  </>
);

export default WizardStep;
