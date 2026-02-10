/**
 * @file Interfaces - IsDirectory
 * @module fst-util-from-fs/interfaces/IsDirectory
 */

/**
 * Check if a file system entry is a directory.
 */
interface IsDirectory {
  /**
   * @this {unknown}
   *
   * @return {boolean}
   *  `true` if entry is directory, `false` otherwise
   */
  (): boolean
}

export type { IsDirectory as default }
