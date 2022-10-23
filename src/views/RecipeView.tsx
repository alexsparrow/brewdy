import { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { Select } from "../components/Select";
import { Stats } from "../components/Stats";
import _ from "lodash";
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

export const RecipeCreator = ({
  savedRecipe,
  onSave,
}: {
  savedRecipe: BeerJSON.RecipeType;
  onSave: (recipe: BeerJSON.RecipeType) => void;
}) => {
  const [recipe, dispatchRecipe_] = useReducer(reducer, savedRecipe);
  const [edited, setEdited] = useState(false);

  const dispatchRecipe = (action: any) => {
    setEdited(true);
    dispatchRecipe_(action);
  }

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8 flex flex-row">
          <h1 className="text-lg font-semibold leading-6 text-gray-900 flex-1 items-center">
            {recipe.name}
          </h1>
          <button
            type="button"
            disabled={!edited}
            className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            onClick={() => {
              onSave(recipe);
              setEdited(false);
            }}
          >
            Save
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
            delete_={(idx) =>
              dispatchRecipe({ type: "deleteFermentable", idx })
            }
            Details={FermentableDetails}
          />
        </div>
        <div className="mt-8">
          <HopsTable
            title="Hops"
            image="/1920px-Hopfendolde-mit-hopfengarten.jpg"
            items={recipe.ingredients.hop_additions || []}
            ingredients={hops}
            update={(idx, hop) =>
              dispatchRecipe({ type: "updateHop", idx, hop })
            }
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
            update={(idx, culture) =>
              dispatchRecipe({ type: "updateCulture", idx, culture })
            }
            add={(culture: BeerJSON.CultureInformation) =>
              dispatchRecipe({ type: "addCulture", culture })
            }
            delete_={(idx) => dispatchRecipe({ type: "deleteCulture", idx })}
            Details={CultureDetails}
          />
        </div>
      </main>
    </>
  );
};

export const RecipeView = () => {
  const { id } = useParams();
  const recipes = JSON.parse(localStorage.getItem("brewdy_recipes") || "{}");

  return (
    <RecipeCreator
      savedRecipe={recipes[id!].recipe}
      onSave={(recipe) => {
        const recipes = JSON.parse(
          localStorage.getItem("brewdy_recipes") || "{}"
        );

        recipes[id!] = { recipe };
        localStorage.setItem("brewdy_recipes", JSON.stringify(recipes));
      }}
    />
  );
};
