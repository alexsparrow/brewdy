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
    fermentable_additions: [
      {
        name: "Maris Otter",
        type: "grain",
        producer: "Crisp",
        amount: {
          value: 1.58,
          unit: "kg",
        },
        color: {
          value: 7.9,
          unit: "EBC",
        },
        yield: {
          fine_grind: {
            value: 81,
            unit: "%",
          },
        },
      },
      {
        name: "Pilsner",
        type: "grain",
        producer: "Crisp",
        amount: {
          value: 0.9,
          unit: "kg",
        },
        color: {
          value: 7.9,
          unit: "EBC",
        },
        yield: {
          fine_grind: {
            value: 78,
            unit: "%",
          },
        },
      },
    ],
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
