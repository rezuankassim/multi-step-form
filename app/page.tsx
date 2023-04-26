'use client';

import {CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Field, FieldProps} from 'formik';
import * as Yup from 'yup';
import Wizard from '@/components/Wizard';
import WizardStep from '@/components/WizardStep';
import {Switch} from '@/components/ui/switch';
import {cn, monthlyOrYearly} from '@/lib/utils';
import {RadioGroup} from '@/components/ui/radio-group';
import {RadioGroupItem} from '@radix-ui/react-radio-group';
import Image from 'next/image';
import {Checkbox} from '@/components/ui/checkbox';
import {Separator} from '@/components/ui/separator';
import currency from 'currency.js';
import {useState} from 'react';

type Step = {
  label: string;
};

type Plan = {
  title: string;
  value: string;
  icon: string;
  price: string;
  priceValue: number;
  yearPrice: string;
  yearPriceValue: number;
};

type AddOn = {
  id: string;
  value: string;
  title: string;
  subtitle: string;
  price: string;
  priceValue: number;
  yearPrice: string;
  yearPriceValue: number;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const steps: Step[] = [
  {
    label: 'Your Info',
  },
  {
    label: 'Select Plan',
  },
  {
    label: 'Add-Ons',
  },
  {
    label: 'Summary',
  },
];

const plans: Plan[] = [
  {
    title: 'Arcade',
    value: 'arcade',
    icon: '/icon-arcade.svg',
    price: '$9/mo',
    priceValue: 9,
    yearPrice: '$90/yr',
    yearPriceValue: 90,
  },
  {
    title: 'Advanced',
    value: 'advanced',
    icon: '/icon-advanced.svg',
    price: '$12/mo',
    priceValue: 12,
    yearPrice: '$120/yr',
    yearPriceValue: 120,
  },
  {
    title: 'Pro',
    value: 'pro',
    icon: '/icon-pro.svg',
    price: '$15/mo',
    priceValue: 15,
    yearPrice: '$150/yr',
    yearPriceValue: 150,
  },
];

const addons: AddOn[] = [
  {
    id: 'addons-online-service',
    value: 'online-service',
    title: 'Online service',
    subtitle: 'Access to multiplayer games',
    price: '+$1/mo',
    priceValue: 1,
    yearPrice: '+$10/yr',
    yearPriceValue: 10,
  },
  {
    id: 'addons-larger-storage',
    value: 'larger-storage',
    title: 'Larger storage',
    subtitle: 'Extra 1TB of cloud save',
    price: '+$2/mo',
    priceValue: 2,
    yearPrice: '+$20/yr',
    yearPriceValue: 20,
  },
  {
    id: 'addons-customizable-profile',
    value: 'customizable-profile',
    title: 'Customizable Profile',
    subtitle: 'Custom theme on your profile',
    price: '+$2/mo',
    priceValue: 2,
    yearPrice: '+$20/yr',
    yearPriceValue: 20,
  },
];

export default function Home() {
  const [finished, setFinished] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#EFF5FF] md:grid md:place-items-center">
      <Wizard
        finished={finished}
        stepLabels={steps}
        initialValues={{
          name: 'Rezuan Kassim',
          email: 'rezuankassim@hotmail.com',
          phone: '0182664733',
          plan: 'arcade',
          planMethod: 'monthly',
          addons: [],
        }}
        onSubmit={async (values: any) => sleep(300).then(() => setFinished(true))}
      >
        <WizardStep
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
          <CardHeader className="px-6 pb-[22px] pt-8 md:px-0 md:pb-10 md:pt-0">
            <CardTitle className="text-2xl leading-7 text-[#022959] md:text-[32px] md:leading-[37px]">
              Personal Info
            </CardTitle>
            <CardDescription className="text-base text-[#9699AA] md:leading-[25px]">
              Please provide your name, email address, and phone number.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-y-4 md:p-0">
            <Field name="name">
              {({field, meta}: FieldProps) => (
                <div className="flex flex-col gap-y-[3px] md:gap-y-2">
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
          validationSchema={Yup.object({
            plan: Yup.string().required(),
            planMethod: Yup.string().required(),
          })}
        >
          <CardHeader className="px-6 pb-[22px] pt-8 md:px-0 md:pb-10 md:pt-0">
            <CardTitle className="text-2xl leading-7 text-[#022959] md:text-[32px] md:leading-[37px]">
              Select your plan
            </CardTitle>
            <CardDescription className="text-base text-[#9699AA] md:leading-[25px]">
              You have the option of monthly or yearly billing.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-y-6 md:p-0">
            <Field name="plan">
              {({field, form}: FieldProps) => (
                <RadioGroup
                  name={field.name}
                  onValueChange={value => form.setFieldValue(field.name, value)}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-y-3 md:grid-cols-3 md:gap-x-[18px]"
                >
                  {plans.map(plan => (
                    <RadioGroupItem
                      key={plan.value}
                      value={plan.value}
                      className="flex items-start gap-x-[14px] rounded-lg border border-[#D6D9E6] px-4 pb-[18px] pt-[14px] data-[state=checked]:border-[#483EFF] data-[state=checked]:bg-[#F8F9FF] md:flex-col md:gap-y-[39px] md:pb-4 md:pt-5"
                    >
                      <Image src={plan.icon} alt="Plan Icon" width={40} height={40} />

                      <div className="flex flex-col items-start">
                        <span className="font-bold leading-[18px] text-[#022959]">
                          {plan.title}
                        </span>

                        <span className="mt-[7px] text-sm text-[#9699AA]">
                          {monthlyOrYearly(form.values.planMethod, plan.price, plan.yearPrice)}
                        </span>

                        {monthlyOrYearly(
                          form.values.planMethod,
                          null,
                          <span className="mt-[6px] text-xs leading-4 text-[#022959]">
                            2 months free
                          </span>
                        )}
                      </div>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              )}
            </Field>

            <Field name="planMethod">
              {({field, form}: FieldProps) => (
                <div className="flex items-start justify-center gap-x-6 rounded-lg bg-[#F8F9FF] py-[14px]">
                  <Label
                    className={cn(
                      'text-sm font-medium leading-4',
                      monthlyOrYearly(form.values.planMethod, 'text-[#022959]', 'text-[#9699AA]')
                    )}
                  >
                    Monthly
                  </Label>
                  <Switch
                    name={field.name}
                    onCheckedChange={value =>
                      form.setFieldValue(field.name, value ? 'yearly' : 'monthly')
                    }
                    checked={monthlyOrYearly(field.value, false, true)}
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

        <WizardStep
          validationSchema={Yup.object({
            addons: Yup.array(Yup.string()),
          })}
        >
          <CardHeader className="px-6 pb-[22px] pt-8 md:px-0 md:pb-10 md:pt-0">
            <CardTitle className="text-2xl leading-7 text-[#022959] md:text-[32px] md:leading-[37px]">
              Pick add-ons
            </CardTitle>
            <CardDescription className="text-base text-[#9699AA] md:leading-[25px]">
              Add-ons help enhance your gaming experience.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-y-3 pb-8 md:p-0">
            <Field name="addons">
              {({field, form}: FieldProps) => (
                <>
                  {addons.map(addon => (
                    <label
                      key={addon.id}
                      htmlFor={addon.id}
                      className={cn(
                        'flex items-center justify-between rounded-lg border px-4 pb-3 pt-[11px] md:px-6 md:pb-5 md:pt-4',
                        field.value.includes(addon.value)
                          ? 'border-[#483EFF] bg-[#F8F9FF]'
                          : 'border-[#D6D9E6]'
                      )}
                    >
                      <div className="flex items-center gap-x-4 md:gap-x-6">
                        <Checkbox
                          id={addon.id}
                          checked={field.value.includes(addon.value)}
                          onCheckedChange={value => {
                            if (value) {
                              form.setFieldValue(field.name, [...field.value, addon.value]);
                            } else {
                              form.setFieldValue(field.name, [
                                ...field.value.filter((val: string) => val !== addon.value),
                              ]);
                            }
                          }}
                        />

                        <div className="flex flex-col gap-y-[3px] md:gap-y-[7px]">
                          <span className="text-sm font-medium leading-4 text-[#022959] md:text-base md:leading-[18px]">
                            {addon.title}
                          </span>

                          <span className="text-xs leading-5 text-[#9699AA] md:text-sm">
                            {addon.subtitle}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs leading-5 text-[#483EFF] md:text-sm">
                        {monthlyOrYearly(form.values.planMethod, addon.price, addon.yearPrice)}
                      </span>
                    </label>
                  ))}
                </>
              )}
            </Field>
          </CardContent>
        </WizardStep>

        <WizardStep>
          {({formik, changeStep}) => (
            <>
              {!finished ? (
                <>
                  <CardHeader className="px-6 pb-[22px] pt-8 md:px-0 md:pb-10 md:pt-0">
                    <CardTitle className="text-2xl leading-7 text-[#022959] md:text-[32px] md:leading-[37px]">
                      Finishing up
                    </CardTitle>
                    <CardDescription className="text-base text-[#9699AA] md:leading-[25px]">
                      Double-check everything looks OK before confirming.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-8 md:p-0">
                    <div className="flex flex-col gap-y-3 rounded-lg bg-[#F8F9FF] p-4 md:px-6 md:pb-6 md:pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-[3px]">
                          <span className="text-sm font-medium leading-4 text-[#022959] md:text-base md:leading-[18px]">
                            {plans.find(plan => plan.value === formik.values.plan)!.title} (
                            {monthlyOrYearly(formik.values.planMethod, 'Monthly', 'Yearly')})
                          </span>

                          <a
                            href="#"
                            className="text-sm text-[#9699AA] underline hover:text-[#483EFF]"
                            onClick={e => {
                              e.preventDefault();
                              changeStep(1, formik.values);
                            }}
                          >
                            Change
                          </a>
                        </div>

                        <span className="md:leading5 text-right text-sm font-bold text-[#022959] md:text-base">
                          {monthlyOrYearly(
                            formik.values.planMethod,
                            plans.find(plan => plan.value === formik.values.plan)!.price,
                            plans.find(plan => plan.value === formik.values.plan)!.yearPrice
                          )}
                        </span>
                      </div>

                      {formik.values.addons.length > 0 ? (
                        <>
                          <Separator />

                          {formik.values.addons.map((addon: string) => (
                            <div key={addon} className="flex items-center justify-between">
                              <span className="text-sm text-[#9699AA]">
                                {addons.find(add => add.value === addon)!.title}
                              </span>
                              <span className="text-right text-sm text-[#022959]">
                                {monthlyOrYearly(
                                  formik.values.planMethod,
                                  addons.find(add => add.value === addon)!.price,
                                  addons.find(add => add.value === addon)!.yearPrice
                                )}
                              </span>
                            </div>
                          ))}
                        </>
                      ) : null}
                    </div>

                    <div className="mt-6 flex flex-col rounded-lg px-4 md:px-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#9699AA]">
                          Total (per {formik.values.planMethod === 'monthly' ? 'month' : 'year'})
                        </span>
                        <span className="text-right font-bold leading-5 text-[#483EFF] md:text-xl md:leading-5">
                          {currency(
                            monthlyOrYearly(
                              formik.values.planMethod,
                              plans.find(plan => plan.value === formik.values.plan)!.priceValue,
                              plans.find(plan => plan.value === formik.values.plan)!.yearPriceValue
                            ),
                            {precision: 0}
                          )
                            .add(
                              currency(
                                formik.values.addons.reduce(
                                  (acc: number, addon: string) =>
                                    monthlyOrYearly(
                                      formik.values.planMethod,
                                      acc + addons.find(add => add.value === addon)!.priceValue,
                                      acc + addons.find(add => add.value === addon)!.yearPriceValue
                                    ),
                                  0
                                ),
                                {precision: 0}
                              )
                            )
                            .format({precision: 0})}
                          /{monthlyOrYearly(formik.values.planMethod, 'mo', 'yr')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex flex-col items-center justify-center gap-y-6 px-6 py-[79px] md:pt-[125px]">
                  <div className="relative h-14 w-14 md:h-20 md:w-20">
                    <Image src="/icon-thank-you.svg" alt="Thank you icon" fill />
                  </div>

                  <div className="flex flex-col items-center gap-y-[9px]">
                    <span className="text-2xl font-bold leading-7 text-[#022959] md:text-[32px] md:leading-[37px]">
                      Thank you!
                    </span>

                    <p className="text-center leading-[25px] text-[#9699AA]">
                      Thanks for confirming your subscription! We hope you have fun using our
                      platform. If you ever need support, please feel free to email us at
                      support@loremgaming.com.
                    </p>
                  </div>
                </CardContent>
              )}
            </>
          )}
        </WizardStep>
      </Wizard>
    </main>
  );
}
