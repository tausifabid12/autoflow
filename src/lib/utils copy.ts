import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const TOKEN_KEY = "access-token";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) return token;
    else return undefined;
  }
};

export const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    return true;
  } else return false;
};

export const getFaviconByGoogle = (url: string) => {
  const hostname = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
};

export const generateSecurePassword = (length: number = 12): string => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const special = "@$!%*?&+-_";
  const all = lowercase + uppercase + digits + special;

  if (length < 8) throw new Error("Password must be at least 8 characters");

  // Ensure at least one of each required character
  const getRand = (set: string) => set[Math.floor(Math.random() * set.length)];

  const mandatory = [
    getRand(lowercase),
    getRand(uppercase),
    getRand(digits),
    getRand(special),
  ];

  // Fill the rest of the password
  const remainingLength = length - mandatory.length;
  const rest = Array.from({ length: remainingLength }, () => getRand(all));

  // Shuffle all characters
  const shuffled = [...mandatory, ...rest].sort(() => Math.random() - 0.5);
  return shuffled.join("");
};

/**
 * Reorders an array based on a given index mapping.
 *
 * @template T - The type of the array elements.
 * @param array - The original array to reorder.
 * @param order - An array of indices representing the new order.
 *                Each index refers to the position in the original array.
 * @returns A new array reordered according to the provided order.
 *
 * @example
 * const arr = ["a", "b", "c", "d"];
 * const newOrder = [1, 2, 3, 0];
 * // Result: ["b", "c", "d", "a"]
 * const reordered = reorderArray(arr, newOrder);
 */
export function reorderArray<T>(array: T[], order: number[]): T[] {
  if (order.length !== array.length) {
    throw new Error("Order array length must match the original array length.");
  }

  return order.map((index) => {
    if (index < 0 || index >= array.length) {
      throw new Error(`Invalid index ${index} in order array.`);
    }
    return array[index];
  });
}

export function fromPaiseToRupee(
  paise: number | undefined | string,
  divideBy: number = 1
): string {
  let amount: number = 0;
  if (typeof paise === "string") {
    if (paise.length === 0) return "";
    amount = Number(paise);
  }
  if (paise === undefined || paise === null) return "0";

  if (isNaN(Number(paise))) {
    console.error("Invalid paise value provided to fromPaiseToRupee", paise);
    return "0";
  } else {
    amount = Number(paise);
  }

  const rupee = amount / 100 / divideBy;
  // Show max 2 decimals, but drop trailing .00
  return rupee % 1 === 0 ? rupee.toString() : rupee.toFixed(2);
}

export const fromRupeeToPaise = (
  rupee: number | undefined | null,
  divideBy: number = 1,
  returnType: "number" | "string" = "string"
): string | number => {
  if (rupee === undefined || rupee === null) {
    if (returnType === "number") return 0;
    return "0";
  }
  const paise = (rupee * 100) / divideBy;
  const result = paise % 1 === 0 ? paise.toString() : paise.toFixed(2);

  return returnType === "number" ? Number(result) : result;
};
