import _ from "lodash";
import styles from "../json/styles.json";

export const beerStyles = _.sortBy(
  styles as BeerJSON.StyleType[],
  (s) => s.name
);
