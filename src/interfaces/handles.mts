/**
 * @file Interfaces - Handles
 * @module fst-util-from-fs/interfaces/Handles
 */

import type { Directory, File } from '@flex-development/fst'
import type { Handle } from '@flex-development/fst-util-from-fs'

/**
 * A node handler registry.
 */
interface Handles {
  /**
   * Handle a `directory` node.
   *
   * @see {@linkcode Directory}
   * @see {@linkcode Handle}
   */
  directory?: Handle<Directory> | null | undefined

  /**
   * Handle a `file` node.
   *
   * @see {@linkcode File}
   * @see {@linkcode Handle}
   */
  file?: Handle<File> | null | undefined
}

export type { Handles as default }
