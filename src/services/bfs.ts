import { StartRoad } from "../types/StartRoad";

export function findShortestDistance(
  provinces: Array<StartRoad>,
  start: string,
  end: string
) {
  const visited: Array<string> = [],
    toVisit: Array<string> = [],
    parents: { [Key: string]: string } = {};

  toVisit.push(start);

  while (toVisit.length) {
    const currentId = toVisit.shift()!;
    visited.push(currentId);
    const current = provinces.find((x) => x.province == currentId);
    if (!current) throw "Current is null";
    console.log(current);
    current.adjencyList.forEach((adj) => {
      if (!visited.includes(adj) && !toVisit.includes(adj)) {
        toVisit.push(adj);
        parents[adj] = currentId;
      }
    });
  }

  let next = end;
  const route = [end];
  do {
    next = parents[next];
    route.push(next);
  } while (parents[next]);
  return route.reverse();
}
