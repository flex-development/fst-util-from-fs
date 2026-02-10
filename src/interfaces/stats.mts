/**
 * @file Interfaces - Stats
 * @module fst-util-from-fs/interfaces/Stats
 */

import type { IsDirectory, IsFile } from '@flex-development/fst-util-from-fs'

/**
 * Information about a file system entry.
 */
interface Stats {
  /**
   * Check if the entry is a directory.
   *
   * @see {@linkcode IsDirectory}
   */
  isDirectory: IsDirectory

  /**
   * Check if the entry is a file.
   *
   * @see {@linkcode IsFile}
   */
  isFile: IsFile
}

export type { Stats as default }
