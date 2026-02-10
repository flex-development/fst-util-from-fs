/**
 * @file Interfaces - FileSystem
 * @module fst-util-from-fs/interfaces/FileSystem
 */

import type {
  Readdir,
  Realpath,
  Stat
} from '@flex-development/fst-util-from-fs'

/**
 * The file system API.
 */
interface FileSystem {
  /**
   * Read the entire contents of a directory.
   *
   * @see {@linkcode Readdir}
   */
  readdir: Readdir

  /**
   * Compute a canonical pathname by resolving `.`, `..`, and symbolic links.
   *
   * @see {@linkcode Realpath}
   */
  realpath: Realpath

  /**
   * Get information about a file system entry.
   *
   * @see {@linkcode Stat}
   */
  stat: Stat
}

export type { FileSystem as default }
