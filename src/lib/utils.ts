import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const distinct = (<A extends Array<O>, O>(key?: keyof O) =>
  (it: O, i: keyof A, a: A) =>  (a.findIndex(ait =>
    typeof it === 'object' && typeof it === 'object' && it && key ?
    ait[key] === it[key] : ait === it) === i
  )
);
