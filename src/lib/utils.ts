import { type ClassValue, clsx } from "clsx"
import React, { ReactElement, ReactNode } from "react";
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

export function joinJSX(children: ReactElement[], separator: ReactElement) {
  return children
    .map((child, i) => React.cloneElement(child as React.ReactElement, { key: i, ...child.props }))
    .reduce((acc, child, i) => {
      if (i === 0) return [child];
      //@ts-ignore
      return [...acc, React.cloneElement(separator, { key: `separator-${i}` }), child];
    }, [] as ReactNode[]);
}


// Number utilities
export function floatLimitDecimals(value: number, decimals: number = 2): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
