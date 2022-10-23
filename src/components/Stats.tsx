import { ebcColor } from "../algos/color";
import { abv, fg, og } from "../algos/gravity";
import { tinsethIBU } from "../algos/hops";
import { OlFarve } from "../algos/olfarve";
import { Recipe } from "../models/models";
import { Range } from "./Range";

export const Stats = ({
  recipe,
  beerStyle,
}: {
  recipe: Recipe;
  beerStyle?: BeerJSON.StyleType;
}) => {
  const originalGravity = og(
    recipe.ingredients.fermentable_additions,
    recipe.batch_size,
    recipe.efficiency.mash!
  );
  const finalGravity = fg(originalGravity, 0.75);
  const ibu = tinsethIBU(
    recipe.ingredients.hop_additions || [],
    recipe.batch_size,
    originalGravity
  );
  const abvPc = abv(originalGravity, finalGravity);
  const color = ebcColor(
    recipe.ingredients.fermentable_additions,
    recipe.batch_size
  );

  const ogRange = beerStyle?.original_gravity
    ? [
        beerStyle.original_gravity.minimum.value,
        beerStyle.original_gravity.maximum.value,
      ]
    : [0.95, 1.4];

  const fgRange = beerStyle?.final_gravity
    ? [
        beerStyle.final_gravity.minimum.value,
        beerStyle.final_gravity.maximum.value,
      ]
    : [0.95, 1.4];

  const abvRange = beerStyle?.alcohol_by_volume
    ? [
        beerStyle.alcohol_by_volume.minimum.value,
        beerStyle.alcohol_by_volume.maximum.value,
      ]
    : [1, 20];

  const colorRange = beerStyle?.color
    ? [
        beerStyle.color.minimum.value,
        beerStyle.color.maximum.value,
      ]
    : [1, 50];

  const ibuRange = beerStyle?.international_bitterness_units
    ? [
        beerStyle.international_bitterness_units.minimum.value,
        beerStyle.international_bitterness_units.maximum.value,
      ]
    : [1, 50];



  return (
    <div className="mt-4 px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <div>
              <Range
                decimalPlaces={3}
                value={originalGravity}
                label="OG"
                step={0.001}
                range={[0.97 * ogRange[0], 1.03 * ogRange[1]]}
                yellow={[0.98 * ogRange[0], 1.02 * ogRange[1]]}
                green={ogRange}
              />
              <Range
                decimalPlaces={3}
                value={finalGravity}
                label="FG"
                step={0.001}
                range={[0.97 * fgRange[0], 1.03 * fgRange[1]]}
                yellow={[0.98 * fgRange[0], 1.02 * fgRange[1]]}
                green={fgRange}
              />
              <Range
                decimalPlaces={1}
                value={abvPc}
                label="ABV"
                step={0.1}
                range={[0.97 * abvRange[0], 1.03 * abvRange[1]]}
                yellow={[0.98 * abvRange[0], 1.02 * abvRange[1]]}
                green={abvRange}
              />
            </div>
            <div>
              <Range
                decimalPlaces={1}
                value={color}
                label="Colour (EBC)"
                step={0.001}
                range={[
                  0.5 * colorRange[0],
                  Math.max(2 * colorRange[1], color),
                ]}
                green={[colorRange[0], colorRange[1]]}
                yellow={[0.9 * colorRange[0], 1.1 * colorRange[1]]}
                color={OlFarve.rgbToHex(OlFarve.ebcToSRGB(color))}
                colorFrom={OlFarve.rgbToHex(
                  OlFarve.ebcToSRGB(0.5 * colorRange[0])
                )}
                colorTo={OlFarve.rgbToHex(
                  OlFarve.ebcToSRGB(1.5 * colorRange[1])
                )}
              />
              <Range
                decimalPlaces={1}
                value={ibu}
                label="IBU"
                step={0.1}
                range={[0.75 * ibuRange[0], 1.25 * ibuRange[1]]}
                yellow={[0.9 * ibuRange[0], 1.1 * ibuRange[1]]}
                green={ibuRange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
