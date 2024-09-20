import { writeFileSync } from "fs";
import { findShortestDistance } from "./src/services/bfs";
import {
  generateMarkovFromTextFile,
  Markov,
  Markov2,
} from "./src/services/markov";
import {
  allRoadNetworks,
  findBiggestRoadNetwork,
  readStartRoadFile,
} from "./src/services/startRoadService";
import weightedList from "./src/services/weightedList";

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

const accuarcy = 2;
const markov = generateMarkovFromTextFile("markov.txt", accuarcy);
writeFileSync("product.txt", Markov(markov, accuarcy));
