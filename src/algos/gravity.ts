import { litresToGallons, volumeToGallons, volumeToLitres } from "./volume";

export function yieldToPPG(yield_: BeerJSON.YieldType) {
    if (yield_.fine_grind) {
        switch (yield_.fine_grind.unit) {
            case "%":
                return (yield_.fine_grind.value / 100) * 46.21;
        }
    } 

    throw Error(`Don't know to handle this yield`);
}

function amountToKg(amount: BeerJSON.MassType | BeerJSON.VolumeType) {
    switch (amount.unit) {
        case "kg":
            return amount.value;
        default:
            throw Error(`Unrecognised unit: ${amount.unit}`);
    }
}

function amountToLb(amount: BeerJSON.MassType | BeerJSON.VolumeType) {
    switch (amount.unit) {
        case "kg":
            return amount.value * 2.20462;
        default:
            throw Error(`Unrecognised unit: ${amount.unit}`);
    }
}



function gravityUnit(fermentable: BeerJSON.FermentableAdditionType) {
    const yieldPPG = yieldToPPG(fermentable.yield);
    const amountLb = amountToLb(fermentable.amount);
    console.log(amountLb);

    return yieldPPG * amountLb;
}


export function og(fermentables: BeerJSON.FermentableAdditionType[], batchSize: BeerJSON.VolumeType, mashEfficiency: BeerJSON.PercentType) {
    const totalGravity = fermentables.map((f) => gravityUnit(f)).reduce((a, b) => a + b, 0);
    const totalGravityWithEfficiency = (totalGravity * mashEfficiency.value / 100);

    const postPoilVolumeInGallons = volumeToGallons(batchSize) + 0.53;
    const gravityUnits = totalGravityWithEfficiency / postPoilVolumeInGallons;
    return 1 + (gravityUnits / 1000);
}

export function fg(
  originalGravity: number,
  attenuation: number
) {
  return originalGravity - (originalGravity - 1) * attenuation;
}

export function abv(og: number, fg: number) {
    return (og - fg) * 131.25;
}
