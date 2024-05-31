import { floatLimitDecimals, joinJSX } from "@/lib/utils";
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
      return <MathPow key={i} expression={p} />
    }
    if(p.includes('%')) {
      return <MathMod key={i} expression={p} />
    }
    if(p.includes('Math.sqrt')) {
      return <MathSqrt key={i} expression={p} />
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

type MathComponentProps = {
  expression: string
  enableTooltip?: boolean
}

function MathPow({ expression, enableTooltip = true  }: MathComponentProps){
  //const [n1, n2] = expression.replace(/[^\d**\d]/g, '').split('**');
  const [n1, n2] = expression.split('**');
  return (
    <TooltipProvider delayDuration={enableTooltip ? 700 : 60 * 1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="text-yellow-600 p-0 h-fit cursor-pointer"
            asChild
          >
            <span>
              {n1.includes('Math.sqrt') ? (
                <MathSqrt expression={n1} enableTooltip={false}/>
              ) : n1}
              <sup>{n2.includes('Math.sqrt') ? (
                <MathSqrt expression={n2} enableTooltip={false}/>
              ) : n2}</sup>
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="font-sans">
          {n1.includes('Math.sqrt') ? (
            <MathSqrt expression={n1} enableTooltip={false}/>
          ) : n1} elevado a {n2.includes('Math.sqrt') ? (
            <MathSqrt expression={n2} enableTooltip={false}/>
          ) : n2} é:
          <p className="text-yellow-600 text-xl">
            {floatLimitDecimals(eval(expression))}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function MathMod({ expression, enableTooltip = true }: MathComponentProps){
  const [n1, n2] = expression.split('%');
  return (
    <TooltipProvider delayDuration={enableTooltip ? 700 : 60 * 1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="text-blue-500 p-0 h-fit cursor-pointer"
            asChild
          >
            <span>
              {n1.includes('Math.sqrt') ? (
                <MathSqrt expression={n1} enableTooltip={false}/>
              ) : n1} % {n2.includes('Math.sqrt') ? (
            <MathSqrt expression={n2} enableTooltip={false}/>
          ) : n2}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="font-sans">
          O resto da divisão de {n1.includes('Math.sqrt') ? (
                <MathSqrt expression={n1} enableTooltip={false}/>
              ) : n1} por {n2.includes('Math.sqrt') ? (
            <MathSqrt expression={n2} enableTooltip={false}/>
          ) : n2} é:
          <p className="text-blue-500 text-xl">
            {floatLimitDecimals(eval(expression))}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function MathSqrt({ expression, enableTooltip = true  }: MathComponentProps){
  const num = expression.replace(/\D/g, '');
  return (
    <TooltipProvider delayDuration={enableTooltip ? 700 : 60 * 1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="text-green-500 p-0 h-fit cursor-pointer"
            asChild
          >
            <span>
              √{num}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="font-sans">
          A raiz quadrada de {num} é:
          <p className="text-green-500 text-xl">
            {Math.sqrt(parseInt(num))}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
