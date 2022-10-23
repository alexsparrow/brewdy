import _ from "lodash";
import f from "../json/fermentables.json";

export const fermentables = _.sortBy(
  f as BeerJSON.FermentableType[],
  (f) => f.name
);
