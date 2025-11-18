import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Create a delay function - for learning purposes!
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
