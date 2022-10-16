import { volumeToGallons } from "./volume";

function amountInOunces(amount: BeerJSON.VolumeType | BeerJSON.MassType) {
  switch (amount.unit) {
    case "kg":
      return 35.274 * amount.value;
    case "g":
      return (35.275 * amount.value) / 1000;
    default:
      throw Error(`Don't know how to convert: ${amount.unit}`);
  }
}

function timeInMinutes(time: BeerJSON.TimeType) {
  switch (time.unit) {
    case "min":
      return time.value;
    default:
      throw Error(`Don't know how to convert: ${time.unit}`);
  }
}

function mgplAddedAlphaAcids(
  hop: BeerJSON.HopAdditionType,
  batchSize: BeerJSON.VolumeType
) {
  return (
    ((hop.alpha_acid.value / 100) * amountInOunces(hop.amount) * 7490) /
    volumeToGallons(batchSize)
  );
}

function boilTimeFactor(hop: BeerJSON.HopAdditionType) {
  const v = (1 - Math.exp(-0.04 * timeInMinutes(hop.timing.time!))) / 4.15;
  console.log(v);
  return v;
}

// See: https://homebrewacademy.com/ibu-calculator/
export function tinsethIBU(
  hops: BeerJSON.HopAdditionType[],
  batchSize: BeerJSON.VolumeType,
  og: number
) {
  const bignessFactor = 1.65 * 0.000125 ** (og - 1);
  console.log(bignessFactor);

  const ibus = hops.map(
    (hop) =>
      bignessFactor * boilTimeFactor(hop) * mgplAddedAlphaAcids(hop, batchSize)
  );

  console.log(ibus);

  return ibus.reduce((a, b) => a + b, 0);
}
