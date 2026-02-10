/**
 * @file Interfaces - ReaddirDirentOptions
 * @module fst-util-from-fs/interfaces/ReaddirDirentOptions
 */

import type { ReaddirOptions } from '@flex-development/fst-util-from-fs'

/**
 * Options for reading the contents of a directory.
 *
 * @extends {ReaddirOptions}
 */
interface ReaddirDirentOptions extends ReaddirOptions {
  /**
   * Whether the result should be a content object list instead of just strings.
   *
   * If `true`, the result will be a list of `Dirent` objects, which provide
   * methods like `isDirectory()` and `isFile()` to get more information about
   * a file system entry without additional `fs.stat()` calls.
   *
   * @override
   */
  withFileTypes: true
}

export type { ReaddirDirentOptions as default }
