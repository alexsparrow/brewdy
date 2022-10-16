
export function volumeToLitres(volume: BeerJSON.VolumeType) {
  switch (volume.unit) {
    case "l":
      return volume.value;
    default:
      throw Error(`Unsupported unit: ${volume.unit}`);
  }
}

export function litresToGallons(litres: number) {
  return litres * 0.219969;
}

export function volumeToGallons(volume: BeerJSON.VolumeType) {
  switch (volume.unit) {
    case "gal":
      return volume.value;
    case "l":
      return litresToGallons(volume.value);
    default:
      throw Error(`Unsupported unit: ${volume.unit}`);
  }
}