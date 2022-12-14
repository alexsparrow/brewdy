import { beerStyles } from "../data/beerStyles";
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

const updateHop = (state: Recipe, action: any): Recipe => {
  const hopAdditions = [...(state.ingredients.hop_additions || [])];
  hopAdditions[action.idx] = action.hop;

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      hop_additions: hopAdditions,
    },
  };
};

const addHop = (state: Recipe, action: any): Recipe => {
  const hop: BeerJSON.HopVarietyBase = action.hop;
  const newHop: BeerJSON.HopAdditionType = {
    name: hop.name,
    amount: {
      unit: "kg",
      value: 1,
    },
    alpha_acid: hop.alpha_acid,
    beta_acid: hop.beta_acid,
    timing: {
      time: {
        unit: "min",
        value: 60,
      },
    },
  };

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      hop_additions: [...(state.ingredients.hop_additions || []), newHop],
    },
  };
};

const deleteHop = (state: Recipe, action: any): Recipe => {
  const hopAdditions = [...(state.ingredients.hop_additions || [])];

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      hop_additions: hopAdditions.filter((_f, idx) => idx !== action.idx),
    },
  };
};

const updateCulture = (state: Recipe, action: any): Recipe => {
  const cultureAdditions = [...(state.ingredients.culture_additions || [])];
  cultureAdditions[action.idx] = action.culture;
  console.log(cultureAdditions);

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      culture_additions: cultureAdditions,
    },
  };
};

const addCulture = (state: Recipe, action: any): Recipe => {
  const culture: BeerJSON.CultureInformation = action.culture;
  const attenuation =
    0.5 *
    ((culture.attenuation_range?.minimum.value || 75) +
      (culture.attenuation_range?.maximum.value || 75));
  const newCulture: BeerJSON.CultureAdditionType = {
    name: culture.name,
    type: culture.type,
    form: culture.form,
    amount: {
      unit: "pkg",
      value: 1,
    },
    attenuation: {
      value: attenuation,
      unit: "%",
    },
  };

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      culture_additions: [
        ...(state.ingredients.culture_additions || []),
        newCulture,
      ],
    },
  };
};

const deleteCulture = (state: Recipe, action: any): Recipe => {
  const cultureAdditions = [...(state.ingredients.culture_additions || [])];

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      culture_additions: cultureAdditions.filter((_f, idx) => idx !== action.idx),
    },
  };
};

export const reducer = (state: Recipe, action: any): Recipe => {
  switch (action.type) {
    case "addFermentable":
      return addFermentable(state, action);
    case "updateFermentable":
      return updateFermentable(state, action);
    case "deleteFermentable":
      return deleteFermentable(state, action);
    case "addHop":
      return addHop(state, action);
    case "updateHop":
      return updateHop(state, action);
    case "deleteHop":
      return deleteHop(state, action);
    case "addCulture":
      return addCulture(state, action);
    case "updateCulture":
      return updateCulture(state, action);
    case "deleteCulture":
      return deleteCulture(state, action);
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
