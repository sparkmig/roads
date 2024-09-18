import { findShortestDistance } from "./src/services/bfs";
import {
  allRoadNetworks,
  findBiggestRoadNetwork,
  readStartRoadFile,
} from "./src/services/startRoadService";

const provinces = readStartRoadFile("./StartRoads.csv");

const roadNetworks = allRoadNetworks(provinces);
const biggest = findBiggestRoadNetwork(roadNetworks);
const allNetworks = roadNetworks.length;

const from = "caercas",
  to = "toriens watch";

const shortestRoute = findShortestDistance(provinces, from, to);

console.log("biggest", biggest);
console.log("All networks", allNetworks);
console.log(`shortest route from ${from} to ${to}`, shortestRoute);
