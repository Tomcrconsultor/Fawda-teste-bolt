'use client';

import React from 'react';

interface SafeDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function SafeDiv({ children, ...props }: SafeDivProps) {
  return (
    <div {...props} suppressHydrationWarning>
      {children}
    </div>
  );
} 