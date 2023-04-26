'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import {VariantProps, cva} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const labelVariants = cva(
  'text-xs leading-[14px] text-[#022959] md:text-sm md:leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export interface LabelProps {
  error?: string;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> &
    LabelProps
>(({className, error, ...props}, ref) => (
  <div className="flex items-center justify-between">
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />

    {error ? (
      <span className="text-xs font-bold leading-[14px] text-[#EE374A]">{error}</span>
    ) : null}
  </div>
));
Label.displayName = LabelPrimitive.Root.displayName;

export {Label};
