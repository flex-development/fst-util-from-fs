/**
 * @file Interfaces - Filters
 * @module fst-util-from-fs/interfaces/Filters
 */

import type { Filter } from '@flex-development/fst-util-from-fs'

/**
 * The filters used to determine if a node should be added to a tree.
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
