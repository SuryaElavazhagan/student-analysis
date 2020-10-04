import React from 'react';

interface SpriteProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  name: string;
}

export function Sprite({ name, ...props }: SpriteProps) {
  return (
    <svg {...props}>
      <use xlinkHref={`/sprite.svg#${name}`} />
    </svg>
  );
}