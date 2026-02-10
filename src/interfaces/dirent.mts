/**
 * @file Interfaces - Dirent
 * @module fst-util-from-fs/interfaces/Dirent
 */

import type {
  IsDirectory,
  IsFile,
  IsSymbolicLink
} from '@flex-development/fst-util-from-fs'

/**
 * Information about a file system entry.
 *
 * This interface can be augmented to register custom methods and properties.
 *
 * @example
 *  declare module '@flex-development/fst-util-from-fs' {
 *    interface Dirent {
 *      custom: string
 *    }
 *  }
 */
interface Dirent {
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

  /**
   * Check if the entry is a symbolic link.
   *
   * @see {@linkcode IsSymbolicLink}
   */
  isSymbolicLink: IsSymbolicLink

  /**
   * The path to the entry, relative to the {@linkcode parentPath}.
   *
   * If the dirent refers to a file, the file extension should be included.
   */
  name: string

  /**
   * The path to the parent directory.
   */
  parentPath: string
}

export type { Dirent as default }
