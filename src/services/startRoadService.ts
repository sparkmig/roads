import { readFileSync } from "fs";
import { StartRoad } from "../types/StartRoad";
import { dfs } from "./dfs";

export const readStartRoadFile = (path: string): Array<StartRoad> => {
  const csvFile = readFileSync(path);
  const csvText = csvFile.toString();

  const lines = csvText.replaceAll("\r", "").split("\n");
  const adjList = lines.map((line) => {
    const formattedLine = line.replaceAll(";", ",");
    console.log(formattedLine);
    const [province, ...adjList] = formattedLine.split(",");
    return {
      province,
      adjencyList: adjList,
    } as StartRoad;
  });

  return adjList;
};

export function allRoadNetworks(
  provinces: Array<StartRoad>
): Array<Array<string>> {
  const visited: Array<Array<string>> = [];
  let i = 0;
  while (visited.flatMap((x) => x).length < provinces.length && i < 10) {
    const isntIncludedYet = provinces.find(
      (x) => !visited.flatMap((v) => v).includes(x.province)
    );
    if (!isntIncludedYet) break;
    visited.push(dfs(provinces, isntIncludedYet?.province!));
    i++;
  }
  return visited;
}

export function findBiggestRoadNetwork(networks: Array<Array<string>>) {
  return networks.sort((a, b) => (a.length < b.length ? 1 : 0))[0];
}
