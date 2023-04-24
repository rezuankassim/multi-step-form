import {Form, Formik} from 'formik';
import React, {ReactFragment, useState} from 'react';
import {WizardStepProps} from './WizardStep';
import {Step} from './ui/step';
import {Card} from './ui/card';
import {Button} from './ui/button';

type WizardProps = {
  children: React.ReactNode;
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>, bag: any) => void;
};

const Wizard = ({children, initialValues, onSubmit}: WizardProps) => {
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

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={
        React.isValidElement<WizardStepProps>(step) ? step.props.validationSchema : {}
      }
    >
      {formik => (
        <Form>
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
              {step}
            </Card>
          </div>

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
        </Form>
      )}
    </Formik>
  );
};

export default Wizard;
