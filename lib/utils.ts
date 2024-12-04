import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'مهر')
    day: "numeric", // numeric day of the month (e.g., '10')
    year: "numeric", // numeric year (e.g., '1402')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'دوشنبه')
    year: "numeric", // numeric year (e.g., '1402')
    month: "2-digit", // numeric month (e.g., '07')
    day: "2-digit", // numeric day (e.g., '10')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'مهر')
    year: "numeric", // numeric year (e.g., '1402')
    day: "numeric", // numeric day (e.g., '10')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "fa-IR",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "fa-IR",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "fa-IR",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "fa-IR",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};


export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}