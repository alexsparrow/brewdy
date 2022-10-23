import { beerStyles } from "../data/beerStyles";
import { fermentables } from "../data/fermentables";
import { Recipe } from "../models/models";

const updateFermentable = (state: Recipe, action: any): Recipe => {
  const fermentableAdditions = [...state.ingredients.fermentable_additions];
  fermentableAdditions[action.idx] = action.fermentable;

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      fermentable_additions: fermentableAdditions,
    },
  };
};

const addFermentable = (state: Recipe, action: any): Recipe => {
  const fermentable: BeerJSON.FermentableType = action.fermentable;
  const newFermentable: BeerJSON.FermentableAdditionType = {
    name: fermentable.name,
    type: fermentable.type,
    amount: {
      unit: "kg",
      value: 1,
    },
    yield: fermentable.yield,
    color: fermentable.color,
  };

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      fermentable_additions: [
        ...state.ingredients.fermentable_additions,
        newFermentable,
      ],
    },
  };
};

const deleteFermentable = (state: Recipe, action: any): Recipe => {
  const fermentableAdditions = [...state.ingredients.fermentable_additions];

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      fermentable_additions: fermentableAdditions.filter(
        (_f, idx) => idx !== action.idx
      ),
    },
  };
};

export const reducer = (state: Recipe, action: any): Recipe => {
  switch (action.type) {
    case "updateFermentable":
      return updateFermentable(state, action);
    case "addFermentable":
      return addFermentable(state, action);
    case "deleteFermentable":
      return deleteFermentable(state, action);
    case "updateStyle":
      return {
        ...state,
        style: { ...beerStyles[action.id], type: "beer" },
      };
    case "updateBatchSize":
      return {
        ...state,
        batch_size: { value: action.value, unit: action.unit },
      };
    default:
      throw Error("JUST NO");
  }
};
