/**
 * @file Interfaces - Readdir
 * @module fst-util-from-fs/interfaces/Readdir
 */

import type {
  Awaitable,
  Dirent,
  ReaddirDirentOptions
} from '@flex-development/fst-util-from-fs'

/**
 * Read the entire contents of a directory.
 */
interface Readdir {
  /**
   * @see {@linkcode Awaitable}
   * @see {@linkcode Dirent}
   * @see {@linkcode ReaddirDirentOptions}
   *
   * @template {Awaitable<ReadonlyArray<Dirent>>} T
   *  The directory contents
   *
   * @this {unknown}
   *
   * @param {URL | string} id
   *  The entry id
   * @param {ReaddirDirentOptions} options
   *  Read options
   * @return {T}
   *  The directory contents
   */
  <T extends Awaitable<readonly Dirent[]>>(
    id: URL | string,
    options: ReaddirDirentOptions
  ): T
}

export type { Readdir as default }
