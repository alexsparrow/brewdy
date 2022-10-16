import { volumeToGallons } from "./volume";

function srmToEbc(srm: number) {
  return 1.97 * srm;
}

function ebcToSrm(ebc: number) {
  return ebc / 1.97;
}

function lovibondToSrm(lovibond: number) {
  return 1.3546 * lovibond - 0.76;
}

function srmToLovibond(srm: number) {
  return (srm + 0.76) / 1.3546;
}

function colorToSrm(colorType: BeerJSON.ColorType) {
  switch (colorType.unit) {
    case "EBC":
      return ebcToSrm(colorType.value);
    case "SRM":
      return colorType.value;
    case "Lovi":
      return lovibondToSrm(colorType.value);
  }
}

const mcu = (
  fermentable: BeerJSON.FermentableAdditionType,
  batchSize: BeerJSON.VolumeType
): number => {
  const srm = colorToSrm(fermentable.color);
  const lovibond = srmToLovibond(srm);
  const massInPounds = fermentable.amount.value * 2.20462;
  const mcu = (massInPounds * lovibond) / volumeToGallons(batchSize);
  return mcu;
};

function mcuToSrm(mcu: number) {
  return 1.4922 * mcu ** 0.6859;
}

export function ebcColor(
  fermentables: BeerJSON.FermentableAdditionType[],
  batchSize: BeerJSON.VolumeType
): number {
  const totalMcu = fermentables
    .map((f) => mcu(f, batchSize))
    .reduce((a, b) => a + b, 0);

  return srmToEbc(mcuToSrm(totalMcu));
}
