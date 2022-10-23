import _ from "lodash";
import f from "../json/hops.json";

export const hops = _.sortBy(
  f as BeerJSON.HopVarietyBase[],
  (f) => f.name
);
