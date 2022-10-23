import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { defaultRecipe } from "../utils/defaultRecipe";

const RecipeList = ({
  recipes,
  onNew,
}: {
  recipes: {
    [id: string]: { created_at: string; recipe: BeerJSON.RecipeType };
  };
  onNew: () => void;
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Recipes</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the recipes saved
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={onNew}
          >
            New recipe
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Style
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {Object.keys(recipes).map((id) => (
                    <tr key={id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {recipes[id].recipe.name}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {recipes[id].recipe.style?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {recipes[id].created_at}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/recipe/${id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                          <span className="sr-only">
                            , {recipes[id].recipe.name}
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home = () => {
  const recipes = JSON.parse(localStorage.getItem("brewdy_recipes") || "{}");
  const navigate = useNavigate();

  const newRecipe = () => {
    const recipes = JSON.parse(localStorage.getItem("brewdy_recipes") || "{}");
    const newRecipe = {
      recipe: defaultRecipe,
      created_at: new Date().toISOString(),
    };

    const name = window.prompt("Recipe name");
    if (name) {
      newRecipe.recipe.name = name;
      const id = uuid();
      recipes[id] = newRecipe;
      localStorage.setItem("brewdy_recipes", JSON.stringify(recipes));
      navigate({ pathname: `/recipe/${id}` }, { replace: true });
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">
            Recipes
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
        <RecipeList recipes={recipes} onNew={newRecipe} />
      </main>
    </>
  );
};
