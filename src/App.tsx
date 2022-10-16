import { useContext, useReducer } from "react";
import { og } from "./algos/gravity";
import { BeerColor } from "./components/BeerColor";
import { Fermentables } from "./components/Fermentables";
import { Stats } from "./components/Stats";
import { Recipe } from "./models/models";

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

function App() {
  const [recipe, dispatchRecipe] = useReducer(reducer, {
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
        unit: "%"
      },
      mash: {
        value: 80,
        unit: "%",
      }
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
    },
  });

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
    </div>
  );
}

export default App;
