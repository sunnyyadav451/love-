import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(name: string) {
  const cleanName = name.startsWith('/') ? name.slice(1) : name;
  return `./${cleanName}`;
}
