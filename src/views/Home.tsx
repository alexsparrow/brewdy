import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { defaultRecipe } from "../utils/defaultRecipe";

export const Home = () => {
  const recipes = JSON.parse(localStorage.getItem("brewdy_recipes") || "{}");

  const newRecipe = () => {
    const recipes = JSON.parse(localStorage.getItem("brewdy_recipes") || "{}");
    const newRecipe = {
      recipe: defaultRecipe,
    };

    const name = window.prompt("Recipe name");
    if (name) {
        newRecipe.recipe.name = name;
        recipes[uuid()] = newRecipe;
        localStorage.setItem("brewdy_recipes", JSON.stringify(recipes));
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
        <div>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={newRecipe}
          >
            New recipe
          </button>
        </div>

        {Object.keys(recipes).map((id) => (
          <li>
            <Link to={`/recipe/${id}`}>{recipes[id].recipe.name}</Link>
          </li>
        ))}
      </main>
    </>
  );
};
