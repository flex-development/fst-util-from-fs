/**
 * @file Interfaces - FileSystemEntries
 * @module fst-util-from-fs/interfaces/FileSystemEntries
 */

import type { Dirent } from '@flex-development/fst-util-from-fs'

/**
 * An object containing information about directories and files.
 */
interface FileSystemEntries {
  /**
   * The list of directories.
   *
   * @see {@linkcode Dirent}
   */
  directories: readonly Dirent[]

  /**
   * The list of files.
   *
   * @see {@linkcode Dirent}
   */
  files: readonly Dirent[]
}

export type { FileSystemEntries as default }
