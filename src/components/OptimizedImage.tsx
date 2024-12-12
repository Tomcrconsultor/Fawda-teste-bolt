"use client"

import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function OptimizedImage({ src, alt, className = '' }: OptimizedImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <ImageIcon className="h-12 w-12 text-gray-400" />
      </div>
    );
  }

  const isExternal = /^https?:\/\//.test(src);

  if (isExternal) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          className="object-cover w-full h-full"
          onError={() => setError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
} 