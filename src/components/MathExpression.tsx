import { joinJSX } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

export type MathExpressionProps = {
  math: string
}
export function MathExpression({ math }: MathExpressionProps){
  const parts = math
    .replace(/ \*\* /g, '**')
    .replace(/ % /g, '%')
    .split(' ');

  return joinJSX(parts.map((p, i) => {
    if(p.includes('**')){
      const [n1, n2] = p.split('**');
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="text-yellow-600 p-0 h-fit cursor-pointer"
                asChild
              >
                <span>
                  {n1}
                  <sup key={i}>{n2}</sup>
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="font-sans">
              {n1} elevado a {n2} é:
              <p className="text-yellow-600 text-xl">
                {parseInt(n1) ** parseInt(n2)}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    if(p.includes('%')) {
      const [n1, n2] = p.split('%');
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="text-blue-500 p-0 h-fit cursor-pointer"
                asChild
              >
                <span>
                  {n1} % {n2}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="font-sans">
              O resto da divisão de {n1} por {n2} é:
              <p className="text-blue-500 text-xl">
                {parseInt(n1) % parseInt(n2)}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    return (
      <span>
        {p}
      </span>
    
    );
  }), (
    <>&nbsp;</>
  ))
}
