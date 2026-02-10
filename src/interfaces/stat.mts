/**
 * @file Interfaces - Stat
 * @module fst-util-from-fs/interfaces/Stat
 */

import type { Awaitable, Stats } from '@flex-development/fst-util-from-fs'

/**
 * Get information about a file system entry.
 */
interface Stat {
  /**
   * @see {@linkcode Awaitable}
   * @see {@linkcode Stats}
   *
   * @template {Awaitable<Stats>} T
   *  The entry info
   *
   * @this {unknown}
   *
   * @param {URL | string} id
   *  The entry id
   * @return {T}
   *  The entry info
   */
  <T extends Awaitable<Stats>>(id: URL | string): T
}

export type { Stat as default }
