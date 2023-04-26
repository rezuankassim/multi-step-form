import React from 'react';

import {cn} from '@/lib/utils';

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  label?: string;
}

const Step = React.forwardRef<HTMLInputElement, StepProps>(
  ({active = false, label = '', className, children, ...props}, ref) => {
    return (
      <div className="flex items-center gap-x-4">
        <div
          ref={ref}
          className={cn(
            'flex h-[33px] w-[33px] items-center justify-center rounded-full py-[5px]',
            active ? 'bg-[#BEE2FD]' : 'border border-white',
            className
          )}
          {...props}
        >
          <span
            className={cn(
              'text-sm font-bold leading-[23px]',
              active ? 'text-[#022959]' : 'text-white'
            )}
          >
            {children}
          </span>
        </div>

        <div className="hidden md:flex md:flex-col md:gap-y-1">
          <span className=" text-xs uppercase leading-[14px] text-[#ABBCFF]">Step {children}</span>

          <span className="text-sm font-bold uppercase leading-4 tracking-[1px] text-white">
            {label}
          </span>
        </div>
      </div>
    );
  }
);
Step.displayName = 'Step';

export {Step};
