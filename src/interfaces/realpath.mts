/**
 * @file Interfaces - Realpath
 * @module fst-util-from-fs/interfaces/Realpath
 */

import type { Awaitable } from '@flex-development/fst-util-from-fs'

/**
 * Compute a canonical pathname by resolving `.`, `..`, and symbolic links.
 *
 * > 👉 **Note**: A canonical pathname is not necessarily unique.
 * > Hard links and bind mounts can expose an entity through many pathnames.
 */
interface Realpath {
  /**
   * @see {@linkcode Awaitable}
   *
   * @template {Awaitable<string>} T
   *  The canonical pathname
   *
   * @this {unknown}
   *
   * @param {URL | string} id
   *  The entry id
   * @return {T}
   *  The canonical pathname
   */
  <T extends Awaitable<string>>(id: URL | string): T
}

export type { Realpath as default }
