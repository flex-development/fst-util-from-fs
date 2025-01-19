/**
 * @file Interfaces - FileSystem
 * @module fst-util-from-fs/interfaces/FileSystem
 */

import type { Dirent } from '@flex-development/fst-util-from-fs'

/**
 * File system adapter.
 */
interface FileSystem {
  /**
   * Get the contents of the file at `path`.
   *
   * @this {void}
   *
   * @param {string} path
   *  Path to file to read
   * @param {'utf8'} encoding
   *  Buffer encoding
   * @return {string}
   *  File contents
   */
  readFileSync?(this: void, path: string, encoding: 'utf8'): string

  /**
   * Read the contents of the directory at `path`.
   *
   * @see {@linkcode Dirent}
   *
   * @this {void}
   *
   * @param {string} path
   *  Path to directory to read
   * @param {{ withFileTypes: true }} options
   *  Read options
   * @param {true} options.withFileTypes
   *  Return a list of dirent objects instead of strings or `Buffer`s
   * @return {ReadonlyArray<Dirent>}
   *  Directory content list
   */
  readdirSync(
    this: void,
    path: string,
    options: { withFileTypes: true }
  ): readonly Dirent[]
}

export type { FileSystem as default }
