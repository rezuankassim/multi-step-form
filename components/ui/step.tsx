import React from 'react';

import {cn} from '@/lib/utils';

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

const Step = React.forwardRef<HTMLInputElement, StepProps>(
  ({active = false, className, children, ...props}, ref) => {
    return (
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
    );
  }
);
Step.displayName = 'Step';

export {Step};
