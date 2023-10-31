export class AssetUtils {
  static getImageFromAssets(name: string) {
    return new URL(`../assets/images/${name}`, import.meta.url).href
  }
}
