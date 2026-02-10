/**
 * @file Interfaces - Filters
 * @module fst-util-from-fs/interfaces/Filters
 */

import type { Filter } from '@flex-development/fst-util-from-fs'

/**
 * A node filter registry.
 */
interface Filters {
  /**
   * Determine if a `directory` node should be added to the tree.
   *
   * @see {@linkcode Filter}
   */
  directory?: Filter | null | undefined

  /**
   * Determine if a `file` node should be added to the tree.
   *
   * @see {@linkcode Filter}
   */
  file?: Filter | null | undefined
}

export type { Filters as default }
