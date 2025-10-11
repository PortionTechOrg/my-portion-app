import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import dayjs from "dayjs";

export const formatDate = (
  dateString: string | Date,
  format = "DD MMM, YYYY",
) => {
  return dayjs(dateString).format(format);
};

export const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  }


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenText(title:string = '', maxLength:number = 12) {
  const start = 3;
  const end = 3;
  if (title.length <= maxLength) return title;
  
  return `${title.slice(0, start)}...${title.slice(-end)}`;
}