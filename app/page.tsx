'use client';

import {CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Field, FieldProps} from 'formik';
import * as Yup from 'yup';
import Wizard from '@/components/Wizard';
import WizardStep from '@/components/WizardStep';
import {Switch} from '@/components/ui/switch';
import {cn} from '@/lib/utils';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#EFF5FF]">
      <Wizard
        initialValues={{
          name: 'Rezuan Kassim',
          email: 'rezuankassim@hotmail.com',
          phone: '0182664733',
          planMethod: 'monthly',
        }}
        onSubmit={async (values: any) =>
          sleep(300).then(() => console.log('Wizard submit', values))
        }
      >
        <WizardStep
          onSubmit={() => console.log('Step1 onSubmit')}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, 'This field needs 3 char. min.')
              .max(255, 'This field must be within 255 char.')
              .required('This field is required'),
            email: Yup.string().email('This field is invalid').required('This field is required'),
            phone: Yup.string()
              .min(10, 'This field must be within 255 char.')
              .required('This field is required'),
          })}
        >
          <CardHeader className="px-6 pb-[22px] pt-8">
            <CardTitle className="text-2xl leading-7 text-[#022959]">Personal Info</CardTitle>
            <CardDescription className="text-base text-[#9699AA]">
              Please provide your name, email address, and phone number.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-y-4">
            <Field name="name">
              {({field, meta}: FieldProps) => (
                <div className="flex flex-col gap-y-[3px]">
                  <Label htmlFor="name" error={meta.error}>
                    Name
                  </Label>
                  <Input
                    placeholder="e.g. Stephen King"
                    error={meta.touched && meta.error ? true : false}
                    {...field}
                  />
                </div>
              )}
            </Field>

            <Field name="email">
              {({field, meta}: FieldProps) => (
                <div className="flex flex-col gap-y-[3px]">
                  <Label htmlFor="email" error={meta.error}>
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="e.g. stephenking@lorem.com"
                    error={meta.touched && meta.error ? true : false}
                    {...field}
                  />
                </div>
              )}
            </Field>

            <Field name="phone">
              {({field, meta}: FieldProps) => (
                <div className="flex flex-col gap-y-[3px]">
                  <Label htmlFor="phone" error={meta.error}>
                    Phone Number
                  </Label>
                  <Input
                    placeholder="e.g. +1 234 567 890"
                    error={meta.touched && meta.error ? true : false}
                    {...field}
                  />
                </div>
              )}
            </Field>
          </CardContent>
        </WizardStep>

        <WizardStep
          onSubmit={() => console.log('Step2 onSubmit')}
          validationSchema={Yup.object({
            planMethod: Yup.string(),
          })}
        >
          <CardHeader className="px-6 pb-[22px] pt-8">
            <CardTitle className="text-2xl leading-7 text-[#022959]">Select your plan</CardTitle>
            <CardDescription className="text-base text-[#9699AA]">
              You have the option of monthly or yearly billing.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-y-6">
            <Field type="checkbox" name="planMethod">
              {({field, form}: FieldProps) => (
                <div className="flex items-start justify-center gap-x-6 bg-[#F8F9FF] py-[14px]">
                  <Label
                    className={cn(
                      'text-sm font-medium leading-4',
                      field.value === 'monthly' ? 'text-[#022959]' : 'text-[#9699AA]'
                    )}
                  >
                    Monthly
                  </Label>
                  <Switch
                    name={field.name}
                    onCheckedChange={value =>
                      form.setFieldValue(field.name, value ? 'yearly' : 'monthly')
                    }
                    checked={field.value === 'monthly' ? false : true}
                  />
                  <Label
                    className={cn(
                      'text-sm font-medium leading-4',
                      field.value === 'yearly' ? 'text-[#022959]' : 'text-[#9699AA]'
                    )}
                  >
                    Yearly
                  </Label>
                </div>
              )}
            </Field>
          </CardContent>
        </WizardStep>
      </Wizard>
    </main>
  );
}
