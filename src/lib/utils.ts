import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single string, merging Tailwind classes efficiently.
 * This utility helps prevent class conflicts when combining conditional classes.
 * 
 * @param inputs - Class values to be combined
 * @returns A merged string of class names
 * 
 * @example
 * // Basic usage
 * cn('text-red-500', 'bg-blue-500') // => 'text-red-500 bg-blue-500'
 * 
 * // With conditionals
 * cn('text-white', isActive && 'bg-blue-500') // => 'text-white bg-blue-500' (if isActive is true)
 * 
 * // With Tailwind class merging
 * cn('px-2 py-1', 'py-2') // => 'px-2 py-2' (py-2 overrides py-1)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 