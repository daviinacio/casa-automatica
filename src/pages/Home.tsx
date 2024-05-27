import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SpecialEpisodeResult, getSpecialEpisodes } from "@/lib/core";
import { useEffect, useState } from "react";

export default function Home() {
  const maxEpisodes = 1000;
  const wantedNumber = 13;
  const [specialEpisodes, setSpecialEpisodes] = useState<Array<SpecialEpisodeResult>>([]);
  const padLength = String(Math.max(...specialEpisodes.map(ep => ep.num))).length;

  useEffect(() => {
    setSpecialEpisodes(
      getSpecialEpisodes(0, maxEpisodes, wantedNumber).filter((ep) => ep.special)
    )
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center px-3 gap-y-3">
      <header className="text-center">
        <h1 className="text-4xl font-bold">
          Episódios especiais
        </h1>
        <p className="translate-y-[-5px] text-base">
          Em busca da <a className="text-blue-500 underline" rel="noreferrer" target="_black" href="https://www.youtube.com/watch?v=aWzKb071D9o&list=PLD40851E0E52E9080">casa automatica</a></p>
      </header>
      <div className="max-w-screen-sm mx-auto w-full flex flex-col gap-y-3 relative">
        <ScrollArea className="sm:h-[60vh] h-[calc(100vh-200px)]" type="always">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow className="sticky top-0">
                <TableHead className="px-4">Numero do episódio</TableHead>
                <TableHead className="px-4 text-right">Calculo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specialEpisodes.map((ep) => (
                <TableRow key={ep.num}>
                  <TableCell className="px-4 font-medium">
                    {String(ep.num).padStart(padLength, '0')}
                  </TableCell>
                  <TableCell className="px-4 text-right font-mono">{`(${ep.math}) = ${wantedNumber}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <footer className="py-2">
          <p className="text-center text-sm text-zinc-600">
            Projeto desenvolvido por <a className="text-blue-500 underline" rel="noreferrer" target="_black" href="https://github.com/daviinacio">Davi Inácio</a>
          </p>
        </footer>
      
      </div>
    </div>
  );
}
