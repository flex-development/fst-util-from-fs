/**
 * @file Interfaces - IsFile
 * @module fst-util-from-fs/interfaces/IsFile
 */

/**
 * Check if a file system entry is a file.
 */
interface IsFile {
  /**
   * @this {unknown}
   *
   * @return {boolean}
   *  `true` if entry is file, `false` otherwise
   */
  (): boolean
}

export type { IsFile as default }
