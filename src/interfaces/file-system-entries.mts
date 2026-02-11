/**
 * @file Interfaces - FileSystemEntries
 * @module fst-util-from-fs/interfaces/FileSystemEntries
 */

import type { Dirent, List } from '@flex-development/fst-util-from-fs'

/**
 * Information about directories and files.
 */
interface FileSystemEntries {
  /**
   * The list of directories.
   *
   * @see {@linkcode Dirent}
   * @see {@linkcode List}
   */
  directories: List<Dirent>

  /**
   * The list of files.
   *
   * @see {@linkcode Dirent}
   * @see {@linkcode List}
   */
  files: List<Dirent>
}

export type { FileSystemEntries as default }
