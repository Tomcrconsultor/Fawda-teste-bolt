'use client';

import React from 'react';

interface DynamicDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function DynamicDiv({ children, ...props }: DynamicDivProps) {
  return (
    <div {...props} suppressHydrationWarning>
      {children}
    </div>
  );
} 