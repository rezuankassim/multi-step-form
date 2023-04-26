import * as React from 'react';
import {VariantProps, cva} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm leading-4 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-[#483EFF] text-white hover:bg-[#928CFF]',
        secondary: 'bg-[#022959] text-white',
        link: 'text-[#9699AA]',
      },
      size: {
        default: 'h-10 py-3 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, ...props}, ref) => {
    return (
      <button className={cn(buttonVariants({variant, size, className}))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
