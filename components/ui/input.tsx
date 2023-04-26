import * as React from 'react';

import {cn} from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, error = false, ...props}, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded border bg-transparent px-4 pb-3 pt-[11px] font-medium leading-[18px] text-[#022959] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#9699AA] focus-visible:border-[#483EFF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:h-12',
          error ? 'border-[#EE374A]' : 'border-[#D6D9E6]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export {Input};
