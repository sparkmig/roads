import { weightedItem } from "../types/weightedItem";

export default function weightedList<T>() {
  const items: Array<weightedItem<T>> = [];
  let current: weightedItem<T> | undefined;

  const add = (item: weightedItem<T>) => {
    items.push(item);
    if (!current) current = item;
  };

  const next = () => {
    if (!current) throw "null";
    const chance = Math.random();
    for (let i = 0; i < current.adjencyList.length; i++) {
      const low = current.adjencyList
        .slice(0, i + 1)
        .reduce((a, b) => a + b.probability, 0);

      const high = current.adjencyList
        .slice(0, i + 2)
        .reduce((a, b) => a + b.probability, 0);

      if (low <= chance || chance < high) {
        current = items.find((x) => x.item == current?.adjencyList[i].item);
        break;
      }

      throw "somethinf went wrong";
    }
  };

  return {
    add,
    next,
    current,
  };
}
