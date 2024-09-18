import { StartRoad } from "../types/StartRoad";

export function dfs(
  provinces: Array<StartRoad>,
  current_id: string,
  visited: Array<string> = [],
  toVisit: Array<string> = []
) {
  const current = provinces.find((x) => x.province == current_id);
  if (!current) throw "Current is undefined or null";
  visited.push(current_id);

  current.adjencyList.forEach((province) => {
    if (!toVisit.includes(province) && !visited.includes(province)) {
      toVisit.push(province);
    }
  });

  if (toVisit.length > 0)
    return dfs(provinces, toVisit.pop()!, visited, toVisit);

  return visited;
}
