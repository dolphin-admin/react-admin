export class AssetUtils {
  /**
   * 获取静态图片资源
   * @description 获取 src/assets/images 目录下的图片资源
   * @param name 文件名称
   */
  static getImageFromAssets(name: string) {
    return new URL(`../assets/images/${name}`, import.meta.url).href
  }
}
