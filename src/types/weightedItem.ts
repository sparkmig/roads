export type weightedItem<T> = {
  item: T;
  adjencyList: Array<{ item: T; probability: number }>;
};
