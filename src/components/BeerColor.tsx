import { ebcColor } from "../algos/color";
import { OlFarve } from "../algos/olfarve";
import { Recipe } from "../models/models";

export const BeerColor = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div
      className="px-16 py-16 bg-red-200"
      style={{
        backgroundColor: OlFarve.rgbToHex(
          OlFarve.ebcToSRGB(
            ebcColor(
              recipe.ingredients.fermentable_additions,
              recipe.batch_size
            )
          )
        ),
      }}
    >
      <h1 className="text-4xl text-gray-900">{recipe.name}</h1>
    </div>
  );
};
