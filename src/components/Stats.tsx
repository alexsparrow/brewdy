import { ebcColor } from "../algos/color";
import { abv, fg, og } from "../algos/gravity";
import { tinsethIBU } from "../algos/hops";
import { Recipe } from "../models/models";

export const Stats = ({ recipe }: { recipe: Recipe }) => {
  const originalGravity = og(
    recipe.ingredients.fermentable_additions,
    recipe.batch_size,
    recipe.efficiency.mash!
  );
  const finalGravity = fg(originalGravity, 0.75);
  const stats = [
    {
      name: "OG",
      stat: originalGravity.toFixed(3),
    },
    {
      name: "FG",
      stat: finalGravity.toFixed(3),
    },
    {
      name: "ABV",
      stat: `${abv(originalGravity, finalGravity).toFixed(1)}%`,
    },
    {
      name: "Batch Size (L)",
      stat: recipe.batch_size.value.toFixed(1),
    },
    {
      name: "EBC",
      stat: ebcColor(
        recipe.ingredients.fermentable_additions,
        recipe.batch_size
      ).toFixed(1),
    },
    {
      name: "IBU",
      stat: tinsethIBU(
        recipe.ingredients.hop_additions || [],
        recipe.batch_size,
        originalGravity
      ).toFixed(1),
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-6">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
