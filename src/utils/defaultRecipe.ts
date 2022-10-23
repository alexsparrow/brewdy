import { beerStyles } from "../data/beerStyles";
import { Recipe } from "../models/models";

export const defaultRecipe: Recipe = {
  name: "My Recipe",
  type: "all grain",
  author: "",
  style: beerStyles[0],
  batch_size: {
    unit: "l",
    value: 18.92,
  },
  efficiency: {
    brewhouse: {
      value: 80,
      unit: "%",
    },
    mash: {
      value: 80,
      unit: "%",
    },
  },
  ingredients: {
    fermentable_additions: [],
    hop_additions: [],
    culture_additions: [
      {
        name: "Belgian Ale Yeast",
        type: "ale",
        form: "dry",
        amount: {
          unit: "pkg",
          value: 1,
        },
        attenuation: {
          unit: "%",
          value: 75,
        },
      },
    ],
  },
};
