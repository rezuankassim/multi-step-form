'use client';

import {Inter, Ubuntu} from 'next/font/google';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Step} from '@/components/ui/step';
import {useState} from 'react';

const ubuntu = Ubuntu({weight: ['400', '500', '700'], subsets: ['latin']});

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <main className={`${ubuntu.className} relative min-h-screen bg-[#EFF5FF]`}>
      <div className="h-[172px] w-full bg-[url('/bg-sidebar-mobile.svg')]">
        <div className="flex items-center justify-center pb-[34px] pt-8">
          <div className="flex items-center gap-4">
            <Step active={currentStep === 1}>1</Step>

            <Step active={currentStep === 2}>2</Step>

            <Step active={currentStep === 3}>3</Step>

            <Step active={currentStep === 4}>4</Step>
          </div>
        </div>
      </div>

      <div className="px-4">
        <Card className="-mt-[73px] rounded-[10px] drop-shadow-[0px_25px_40px_-20px_rgba(0,0,0,0.0951141)]">
          <CardHeader className="px-6 pb-[22px] pt-8">
            <CardTitle className="text-2xl leading-7 text-[#022959]">Personal Info</CardTitle>
            <CardDescription className="text-base text-[#9699AA]">
              Please provide your name, email address, and phone number.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-y-4">
            <div className="flex flex-col gap-y-[3px]">
              <Label htmlFor="name">Name</Label>
              <Input placeholder="e.g. Stephen King" />
            </div>

            <div className="flex flex-col gap-y-[3px]">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="e.g. stephenking@lorem.com" />
            </div>

            <div className="flex flex-col gap-y-[3px]">
              <Label htmlFor="phone">Phone Number</Label>
              <Input placeholder="e.g. +1 234 567 890" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-0 flex w-full flex-row-reverse items-center justify-between bg-white p-4">
        <Button className="bg-[#022959] text-sm leading-4" onClick={handleNext}>
          Next Step
        </Button>

        <Button variant="secondary" size="none" onClick={handleBack}>
          Go Back
        </Button>
      </div>
    </main>
  );
}
