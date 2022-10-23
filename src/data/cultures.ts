import _ from "lodash";
import f from "../json/cultures.json";


export const cultures = _.sortBy(
  f as BeerJSON.CultureInformation[],
  (f) => f.name
);
