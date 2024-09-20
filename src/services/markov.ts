import { readFileSync } from "fs";

type MarkovType = {
  item: string;
  adjency: string[];
  weight: number;
};

export function Markov(items: Array<MarkovType>, accuarcy: number = 2) {
  const queue = [];
  const totalWeight = items.reduce((a, b) => a + b.weight, 0);
  const perc = Math.round(Math.random() * totalWeight);
  let first = null;
  let i = 0;
  let weightSum = 0;
  do {
    const c = items[i];
    if (perc > weightSum) weightSum += c.weight;
    else first = items[i - 1];
    i++;
  } while (!first);

  let current: MarkovType | undefined = first;
  const sentence = [...first.item.split(" ")];
  do {
    const rand = Math.round(Math.random() * (current!.adjency.length - 1));
    const next: string = current?.adjency[rand];
    sentence.push(next);
    const words = sentence.slice(-accuarcy);
    current = items.find((x) => x.item == words.join(" "));
  } while (current?.adjency.length);
  return sentence.join(" ").replaceAll(". ", "\n");
}

export function Markov2(items: Array<MarkovType>, start: string) {
  let first = start;
  let current: MarkovType | undefined = items.find((x) => x.item == first);
  const sentence = [];
  while (current) {
    sentence.push(current.item);
    const nextItems = items.filter((x) => current!.adjency.includes(x.item));
    const rand = Math.floor(Math.random() * nextItems.length);
    current = nextItems[rand];
  }
  return sentence.join(" ").replaceAll(". ", "\n");
}

export function generateMarkovFromTextFile(path: string, maxWords: number = 2) {
  const file = readFileSync(path);
  const text = file.toString().toLocaleLowerCase();
  const sentences = text
    .replaceAll("\r", "")
    .replaceAll("\n", ". ")
    .split("\n");
  const items: Array<MarkovType> = [];
  const maxWordsIndex = maxWords - 1;
  while (sentences.length) {
    const currentSentence = sentences.shift();
    if (!currentSentence || currentSentence?.length < 0) continue;

    const splittet = currentSentence.split(" ");

    for (let i = maxWordsIndex; i < splittet.length; i++) {
      const start = i - maxWordsIndex;
      const end = start + maxWords;
      const words = splittet.slice(start, end);
      const existing = items.find((x) => x.item == words.join(" "));
      const adjency = splittet[i + 1] ?? "";
      console.log((i / splittet.length) * 100 + "%");
      if (existing) {
        existing.weight++;
        existing.adjency.push(adjency);
      } else {
        const item: MarkovType = {
          adjency: [adjency],
          item: words.join(" "),
          weight: 1,
        };
        items.push(item);
      }
    }
  }

  return items;
}
