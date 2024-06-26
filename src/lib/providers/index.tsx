import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";

export function Providers({children}: PropsWithChildren){
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  )
}
