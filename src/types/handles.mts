/**
 * @file Type Aliases - Handles
 * @module fst-util-from-fs/types/Handles
 */

import type { Directory, File } from '@flex-development/fst'
import type { Handle } from '@flex-development/fst-util-from-fs'

/**
 * Node handler registry.
 */
type Handles = {
  /**
   * Directory node handler.
   *
   * @see {@linkcode Directory}
   * @see {@linkcode Handle}
   */
  directory?: Handle<Directory> | null | undefined

  /**
   * File node handler.
   *
   * @see {@linkcode File}
   * @see {@linkcode Handle}
   */
  file?: Handle<File> | null | undefined
}

export type { Handles as default }
