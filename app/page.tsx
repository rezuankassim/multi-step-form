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
import {RadioGroup} from '@/components/ui/radio-group';
import {RadioGroupItem} from '@radix-ui/react-radio-group';
import Image from 'next/image';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const plans: {title: string; value: string; icon: string; price: string; yearPrice: string}[] = [
  {
    title: 'Arcade',
    value: 'arcade',
    icon: '/icon-arcade.svg',
    price: '$9/mo',
    yearPrice: '$90/yr',
  },
  {
    title: 'Advanced',
    value: 'advanced',
    icon: '/icon-advanced.svg',
    price: '$12/mo',
    yearPrice: '$120/yr',
  },
  {
    title: 'Pro',
    value: 'pro',
    icon: '/icon-pro.svg',
    price: '$15/mo',
    yearPrice: '$150/yr',
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#EFF5FF]">
      <Wizard
        initialValues={{
          name: 'Rezuan Kassim',
          email: 'rezuankassim@hotmail.com',
          phone: '0182664733',
          plan: 'arcade',
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
            plan: Yup.string().required(),
            planMethod: Yup.string().required(),
          })}
        >
          <CardHeader className="px-6 pb-[22px] pt-8">
            <CardTitle className="text-2xl leading-7 text-[#022959]">Select your plan</CardTitle>
            <CardDescription className="text-base text-[#9699AA]">
              You have the option of monthly or yearly billing.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-y-6">
            <Field name="plan">
              {({field, form}: FieldProps) => (
                <RadioGroup
                  name={field.name}
                  onValueChange={value => form.setFieldValue(field.name, value)}
                  defaultValue="arcade"
                  className="grid grid-cols-1 gap-y-3"
                >
                  {plans.map(plan => (
                    <RadioGroupItem
                      key={plan.value}
                      value={plan.value}
                      className="flex items-start gap-x-[14px] rounded-lg border border-[#D6D9E6] px-4 pb-[18px] pt-[14px] data-[state=checked]:border-[#483EFF] data-[state=checked]:bg-[#F8F9FF]"
                    >
                      <Image src={plan.icon} alt="Plan Icon" width={40} height={40} />

                      <div className="flex flex-col items-start gap-y-[7px]">
                        <span className="font-bold leading-[18px] text-[#022959]">
                          {plan.title}
                        </span>

                        <span className="text-sm text-[#9699AA]">
                          {form.values.planMethod === 'monthly' ? plan.price : plan.yearPrice}
                        </span>

                        {form.values.planMethod === 'yearly' ? (
                          <span className="text-xs leading-4 text-[#022959]">2 months free</span>
                        ) : null}
                      </div>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              )}
            </Field>

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
