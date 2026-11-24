'use client';

import React, { type ElementType, type ReactNode } from 'react';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function AnimatedGradientText({ as: Tag = 'span', children, className = '', id: idProp }: Props) {
  return (
    <Tag id={idProp} className={`animated-gradient-text ${className}`.trim()}>
      {children}
    </Tag>
  );
}
