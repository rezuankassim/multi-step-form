import {Form, Formik, FormikProps, FormikValues, isFunction} from 'formik';
import React, {ReactFragment, useState} from 'react';
import {WizardStepProps} from './WizardStep';
import {Step} from './ui/step';
import {Card} from './ui/card';
import {Button} from './ui/button';

type WizardProps = {
  finished?: boolean;
  stepLabels?: {label: string}[];
  children: React.ReactNode;
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>, bag: any) => void;
};

const Wizard = ({
  finished = false,
  stepLabels = [],
  children,
  initialValues,
  onSubmit,
}: WizardProps) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: Record<string, any>) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values: Record<string, any>) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values: Record<string, any>, bag: any) => {
    if (React.isValidElement<WizardStepProps>(step)) {
      if (step.props.onSubmit) {
        await step.props.onSubmit(values, bag);
      }

      if (isLastStep) {
        return onSubmit(values, bag);
      } else {
        bag.setTouched({});
        next(values);
      }
    }
  };

  const changeStep = (step: number, values: FormikValues) => {
    if (step < totalSteps && step >= 0) {
      setSnapshot(values);
      setStepNumber(step);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={
        React.isValidElement<WizardStepProps>(step) ? step.props.validationSchema : {}
      }
    >
      {formik => (
        <>
          <Form className="block md:hidden">
            <div className="h-[172px] w-full bg-[url('/bg-sidebar-mobile.svg')]">
              <div className="flex items-center justify-center pb-[34px] pt-8">
                <div className="flex items-center gap-4">
                  {[...Array(totalSteps)].map((x, i) => (
                    <Step active={stepNumber === i} key={i}>
                      {i + 1}
                    </Step>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 pb-24">
              <Card className="-mt-[73px] rounded-[10px] drop-shadow-[0px_25px_40px_-20px_rgba(0,0,0,0.0951141)]">
                {React.isValidElement<WizardStepProps>(step)
                  ? React.cloneElement<WizardStepProps>(step, {
                      formik: formik,
                      changeStep: changeStep,
                    })
                  : step}
              </Card>
            </div>

            {!finished ? (
              <div className="fixed bottom-0 flex w-full flex-row-reverse items-center justify-between bg-white p-4">
                <Button type="submit" variant={!isLastStep ? 'secondary' : 'default'}>
                  {!isLastStep ? 'Next Step' : 'Confirm'}
                </Button>

                {stepNumber > 0 ? (
                  <Button
                    type="button"
                    variant="link"
                    size="none"
                    onClick={() => previous(formik.values)}
                  >
                    Go Back
                  </Button>
                ) : null}
              </div>
            ) : null}
          </Form>

          <Form className="hidden md:block">
            <div className="flex gap-x-[100px] rounded-[15px] bg-white p-4 drop-shadow-[0px_25px_40px_-20px_rgba(0,0,0,0.0951141)]">
              <div className="h-[568px] w-[274px] bg-[url('/bg-sidebar-desktop.svg')]">
                <div className="flex flex-col gap-y-8 px-8 py-10">
                  {[...Array(totalSteps)].map((x, i) => (
                    <Step
                      active={stepNumber === i}
                      key={i}
                      label={stepLabels.length ? stepLabels[i].label : ''}
                    >
                      {i + 1}
                    </Step>
                  ))}
                </div>
              </div>

              <div className="flex flex-col pr-[84px] pt-10">
                <div className="flex-1">
                  {React.isValidElement<WizardStepProps>(step)
                    ? React.cloneElement<WizardStepProps>(step, {
                        formik: formik,
                        changeStep: changeStep,
                      })
                    : step}
                </div>

                <div className="mb-4 mt-[92px] flex flex-row-reverse items-center justify-between">
                  <Button type="submit" variant={!isLastStep ? 'secondary' : 'default'}>
                    {!isLastStep ? 'Next Step' : 'Confirm'}
                  </Button>

                  {stepNumber > 0 ? (
                    <Button
                      type="button"
                      variant="link"
                      size="none"
                      onClick={() => previous(formik.values)}
                    >
                      Go Back
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Wizard;
