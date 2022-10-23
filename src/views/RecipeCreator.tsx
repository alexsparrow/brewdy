import { useReducer } from "react";
import { Select } from "../components/Select";
import { Stats } from "../components/Stats";
import _ from "lodash";
import { defaultRecipe } from "../utils/defaultRecipe";
import { reducer } from "../state/recipe";
import { beerStyles } from "../data/beerStyles";
import {
  CultureDetails,
  FermentableDetails,
  HopDetails,
  IngredientTable,
} from "../components/IngredientTable";
import { fermentables } from "../data/fermentables";
import { hops } from "../data/hops";
import { cultures } from "../data/cultures";

const FermentablesTable = IngredientTable<
  BeerJSON.FermentableAdditionType,
  BeerJSON.FermentableType
>;

const HopsTable = IngredientTable<
  BeerJSON.HopAdditionType,
  BeerJSON.HopVarietyBase
>;

const CulturesTable = IngredientTable<
  BeerJSON.CultureAdditionType,
  BeerJSON.CultureInformation
>;

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
        <FermentablesTable
          title="Fermentables"
          image="/Malt_en_grain.JPG"
          items={recipe.ingredients.fermentable_additions}
          ingredients={fermentables}
          update={(idx, fermentable) =>
            dispatchRecipe({ type: "updateFermentable", idx, fermentable })
          }
          add={(fermentable: BeerJSON.FermentableType) =>
            dispatchRecipe({ type: "addFermentable", fermentable })
          }
          delete_={(idx) => dispatchRecipe({ type: "deleteFermentable", idx })}
          Details={FermentableDetails}
        />
      </div>
      <div className="mt-8">
        <HopsTable
          title="Hops"
          image="/1920px-Hopfendolde-mit-hopfengarten.jpg"
          items={recipe.ingredients.hop_additions || []}
          ingredients={hops}
          update={(idx, hop) => dispatchRecipe({ type: "updateHop", idx, hop })}
          add={(hop: BeerJSON.HopVarietyBase) =>
            dispatchRecipe({ type: "addHop", hop })
          }
          delete_={(idx) => dispatchRecipe({ type: "deleteHop", idx })}
          Details={HopDetails}
        />
      </div>
      <div className="mt-8">
        <CulturesTable
          title="Cultures"
          image="/1280px-S_cerevisiae_under_DIC_microscopy.jpg"
          items={recipe.ingredients.culture_additions || []}
          ingredients={cultures}
          update={(idx, hop) =>
            dispatchRecipe({ type: "updateCulture", idx, hop })
          }
          add={(culture: BeerJSON.CultureInformation) =>
            dispatchRecipe({ type: "addCulture", culture })
          }
          delete_={(idx) => dispatchRecipe({ type: "deleteCulture", idx })}
          Details={CultureDetails}
        />
      </div>
    </div>
  );
};
