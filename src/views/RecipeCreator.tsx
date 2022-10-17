import { useReducer } from "react";
import { BeerColor } from "../components/BeerColor";
import { Fermentables } from "../components/Fermentables";
import { Hops } from "../components/Hops";
import { Stats } from "../components/Stats";
import { Yeast } from "../components/Yeast";
import { Recipe } from "../models/models";

const reducer = (state: Recipe, action: any): Recipe => {
  switch (action.type) {
    case "updateFermentable":
      const fermentableAdditions = [...state.ingredients.fermentable_additions];
      fermentableAdditions[action.idx] = action.fermentable;

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          fermentable_additions: fermentableAdditions,
        },
      };
    default:
      throw Error("JUST NO");
  }
};

const defaultRecipe: Recipe = {
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

export const RecipeCreator = () => {
  const [recipe, dispatchRecipe] = useReducer(reducer, defaultRecipe);
  return (
    <div className="App">
      <BeerColor recipe={recipe} />
      <Stats recipe={recipe} />
      <div className="mt-8">
        <Fermentables
          fermentables={recipe.ingredients.fermentable_additions}
          updateFermentable={(idx, fermentable) =>
            dispatchRecipe({ type: "updateFermentable", idx, fermentable })
          }
        />
      </div>
      <div className="mt-8">
        <Hops
          hops={recipe.ingredients.hop_additions || []}
          updateHop={(idx, hop) =>
            dispatchRecipe({ type: "updateHop", idx, hop })
          }
        />
      </div>
      <div className="mt-8">
        <Yeast
          yeast={recipe.ingredients.culture_additions || []}
          updateYeast={(idx, yeast) =>
            dispatchRecipe({ type: "updateYeast", idx, yeast })
          }
        />
      </div>
    </div>
  );
};
