import { Recipe } from "../models/models";

export const defaultRecipe: Recipe = {
  name: "My Recipe",
  type: "all grain",
  author: "",
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
    hop_additions: [
      {
        name: "East Kent Goldings",
        alpha_acid: {
          value: 5.5,
          unit: "%",
        },
        amount: {
          value: 100,
          unit: "g",
        },
        timing: {
          time: {
            value: 20,
            unit: "min",
          },
        },
      },
    ],
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
