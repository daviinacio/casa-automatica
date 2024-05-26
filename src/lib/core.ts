export function generateMathList(numList: Array<number> = [], firstLevel = true) {
  const [n1, n2, ...nr] = numList;
  if (n2 === undefined) return [
    String(n1),
  ];

  const result = [];

  for (const operator of ['+', '-', '*', '/']) {
    let calc = `${operator} ${n2}`;

    if (firstLevel) 
      calc = `${n1} ${calc}`

    if (nr.length > 0) {
      generateMathList([n2, ...nr], false).forEach((c) => {
        result.push(`${calc} ${c}`);
      });
    } else {
      result.push(calc);
    }
  }

  return result;
}

export function generateGroupedNumberList(numText = '', firstLevel = true): Array<Array<number>> {
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
  math: string;
}

export function getSpecialEpisodes(start = 0, end = 500, wantedNumber = 13): Array<SpecialEpisodeResult> {
  return Array.from({ length: end - start }, (_, i) => i + start).map((num) => {
    const mathList = generateGroupedNumberList(String(num))
      .map(gn => generateMathList(gn))
      .flatMap(m => m);
  
    const mathThatFindWantedNumber = mathList.find(calc => eval(calc) === wantedNumber);
  
    return {
      num,
      special: !!mathThatFindWantedNumber,
      math: mathThatFindWantedNumber || '',
    }
  });
}
