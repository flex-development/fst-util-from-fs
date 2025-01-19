/**
 * @file Interfaces - Dirent
 * @module fst-util-from-fs/interfaces/Dirent
 */

/**
 * Directory content entry.
 *
 * This interface can be augmented to register custom methods and properties.
 *
 * @example
 *  declare module '@flex-development/fst-util-from-fs' {
 *    interface Dirent {
 *      parentPath: string
 *    }
 *  }
 */
interface Dirent {
  /**
   * Check if the dirent describes a directory.
   *
   * @this {void}
   *
   * @return {boolean}
   *  `true` if dirent describes directory, `false` otherwise
   */
  isDirectory(this: void): boolean

  /**
   * Directory content name.
   *
   * If the dirent refers to a file, the file extension should be included.
   */
  name: string
}

export type { Dirent as default }
