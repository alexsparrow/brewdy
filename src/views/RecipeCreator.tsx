import { useReducer } from "react";
import { Fermentables } from "../components/Fermentables";
import { Hops } from "../components/Hops";
import { Select } from "../components/Select";
import { Stats } from "../components/Stats";
import { Yeast } from "../components/Yeast";
import _ from "lodash";
import { defaultRecipe } from "../utils/defaultRecipe";
import { reducer } from "../state/recipe";
import { beerStyles } from "../data/beerStyles";

export const RecipeCreator = () => {
  const [recipe, dispatchRecipe] = useReducer(reducer, defaultRecipe);

  return (
    <div className="App">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Select
              label="Style"
              selected={
                recipe.style
                  ? { label: recipe.style.name, id: recipe.style.name }
                  : null
              }
              options={beerStyles.map((s, idx) => ({
                label: s.name,
                id: idx,
              }))}
              setSelected={(id) =>
                dispatchRecipe({
                  type: "updateStyle",
                  id,
                })
              }
            />
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="batchSize"
              className="block text-sm font-medium text-gray-700"
            >
              Batch Size
            </label>
            <div className="mt-1">
              <input
                type="number"
                value={recipe.batch_size.value}
                onChange={(e) =>
                  dispatchRecipe({
                    type: "updateBatchSize",
                    value: Number(e.target.value),
                    unit: "l",
                  })
                }
                name="batchSize"
                id="batchSize"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <Stats
        recipe={recipe}
        beerStyle={beerStyles.find((s) => s.name === recipe.style?.name)}
      />

      <div className="mt-8">
        <Fermentables
          fermentables={recipe.ingredients.fermentable_additions}
          updateFermentable={(idx, fermentable) =>
            dispatchRecipe({ type: "updateFermentable", idx, fermentable })
          }
          addFermentable={() => dispatchRecipe({ type: "addFermentable" })}
          deleteFermentable={(idx) =>
            dispatchRecipe({ type: "deleteFermentable", idx })
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
