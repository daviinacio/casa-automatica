import { MathExpression } from "@/components/MathExpression";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { Fragment } from "react";

import cache from "../../scripts/cache.json";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-3 gap-y-3">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Episódios especiais</h1>
        <p className="translate-y-[-5px] text-base">
          Em busca da{" "}
          <a
            className="text-blue-500 underline"
            rel="noreferrer"
            target="_black"
            href="https://www.youtube.com/watch?v=aWzKb071D9o&list=PLD40851E0E52E9080"
          >
            casa automatica
          </a>
        </p>
      </header>
      <div className="max-w-screen-sm mx-auto w-full flex flex-col gap-y-3 relative">
        <ScrollArea className="sm:h-[60vh] h-[calc(100vh-200px)]" type="always">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow className="sticky top-0">
                <TableHead className="px-4">Numero do episódio</TableHead>
                <TableHead className="px-4 text-center w-1 text-nowrap">
                  Qnt. Cálculos
                </TableHead>
                <TableHead className="px-4 text-right w-1">Cálculo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cache &&
                cache.specialEpisodes.map((ep) => (
                  <TableRow key={ep.num}>
                    <TableCell className="px-4 font-medium">
                      {String(ep.num).padStart(cache.padLength, "0")}
                    </TableCell>
                    <TableCell className="px-4 text-center font-medium">
                      {ep.math.length}
                    </TableCell>
                    <TableCell className="px-4 text-right">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            className={cn(
                              "p-0 h-fit font-mono text-foreground",
                              ep.math.length === 1 &&
                                "cursor-default hover:no-underline select-text"
                            )}
                            variant="link"
                          >
                            {"("}
                            <MathExpression math={ep.math[0]} />
                            {`) = ${cache.wantedNumber}`}
                          </Button>
                        </HoverCardTrigger>
                        {ep.math.length > 1 && (
                          <HoverCardContent
                            className="w-fit text-center bg-zinc-100 dark:bg-zinc-800"
                            align="center"
                          >
                            <h4 className="mb-4 text-sm font-medium leading-none">
                              Outros cálculos ({ep.num})
                            </h4>
                            <div className="overflow-y-scroll max-h-[40vh] mx-[-1rem] px-[1rem]">
                              {ep.math.slice(1).map((m, i, a) => (
                                <Fragment key={m}>
                                  <div className="text-sm font-mono">
                                    {"("}
                                    <MathExpression math={m} />
                                    {`) = ${cache.wantedNumber}`}
                                  </div>
                                  {i < a.length - 1 && (
                                    <Separator className="my-2" />
                                  )}
                                </Fragment>
                              ))}
                            </div>
                          </HoverCardContent>
                        )}
                      </HoverCard>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <footer className="py-2">
          <p className="text-center text-sm text-zinc-600">
            Projeto desenvolvido por{" "}
            <a
              className="text-blue-500 underline"
              rel="noreferrer"
              target="_black"
              href="https://github.com/daviinacio"
            >
              Davi Inácio
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
