import Image from 'next/image';
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

const ubuntu = Ubuntu({weight: ['400', '500', '700'], subsets: ['latin']});

export default function Home() {
  return (
    <main className={`${ubuntu.className} relative min-h-screen bg-[#EFF5FF]`}>
      <div className="h-[172px] w-full bg-[url('/bg-sidebar-mobile.svg')]">
        <div className="flex items-center justify-center pb-[34px] pt-8">
          <div className="flex items-center gap-4">
            <div className="flex h-[33px] w-[33px] items-center justify-center rounded-full bg-[#BEE2FD] py-[5px] text-center">
              <span className="text-sm font-bold leading-[23px] text-[#022959]">1</span>
            </div>

            <div className="flex h-[33px] w-[33px] items-center justify-center rounded-full border border-white py-[5px]">
              <span className="text-sm font-bold leading-[23px] text-white">2</span>
            </div>

            <div className="flex h-[33px] w-[33px] items-center justify-center rounded-full border border-white py-[5px]">
              <span className="text-sm font-bold leading-[23px] text-white">3</span>
            </div>

            <div className="flex h-[33px] w-[33px] items-center justify-center rounded-full border border-white py-[5px]">
              <span className="text-sm font-bold leading-[23px] text-white">4</span>
            </div>
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
        <Button className="bg-[#022959] text-sm leading-4">Next Step</Button>
      </div>
    </main>
  );
}

{
  /* <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            /> */
}
