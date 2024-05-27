import { distinct } from "./utils";

export function generateMathList(numList: Array<number> = []) {
  const [n1, ...nr] = numList;
  
  if(nr.length === 0) return [
    String(n1)
  ];

  const result:Array<string> = [];
  
  for(const rc of generateMathList(nr)) {
    for (const operator of ['+', '-', '*', '/', '**', '%']) {
      result.push(`${n1} ${operator} ${rc}`);
      result.push(`${rc} ${operator} ${n1}`);
      // result.push(`Math.pow(${rc}, ${n1})`);
      // result.push(`(${n1} ${operator} ${rc})`);
      // result.push(`(${rc} ${operator} ${n1})`);
    }
  }

  return result;
}

export function generateGroupedNumberList(numText: string, firstLevel = true): Array<Array<number>> {
  const result = [];

  if (firstLevel)
    result.push([numText]);

  for (let i = 1; i < numText.length; i++) {
    const n1 = numText.slice(0, i);
    const n2 = numText.slice(i);

    generateGroupedNumberList(n2, false).forEach((n) => {
      result.push([n1, ...n]);
    });

    result.push([n1, n2]);
  }

  return result.map(n => n.map(Number));
}

export function isSpecialEpisode(num: number, wantedNumber: number) {
  const mathList = generateGroupedNumberList(String(num))
    .map(gn => generateMathList(gn))
    .flatMap(m => m);

  return mathList.some(calc => eval(calc) === wantedNumber);
}

export type SpecialEpisodeResult = {
  num: number;
  special: boolean;
  math: Array<string>;
}

export function getSpecialEpisodes(start = 0, end = 500, wantedNumber = 13): Array<SpecialEpisodeResult> {
  return Array.from({ length: end - start }, (_, i) => i + start).map((num) => {
    const mathList = generateGroupedNumberList(String(num))
      .map(gn => generateMathList(gn.filter(n => n > 0)))
      .flatMap(m => m)
      .filter(distinct());
  
    const mathThatFindWantedNumber = mathList.filter(calc => eval(calc) === wantedNumber);
  
    if(mathThatFindWantedNumber.some(c => c.includes('**') && c.includes('%')))
      console.log('conflict', num)

    return {
      num,
      special: mathThatFindWantedNumber.length > 0,
      math: mathThatFindWantedNumber,
    }
  });
}
