/**
 * @file Interfaces - Options
 * @module fst-util-from-fs/interfaces/Options
 */

import type {
  Extensions,
  FileSystem,
  Filters,
  Handles,
  Sort
} from '@flex-development/fst-util-from-fs'

/**
 * Options for creating a file system tree.
 */
interface Options {
  /**
   * Include file content.
   *
   * > 👉 **Note**: Populates the `value` field of each `file` node.
   */
  content?: boolean | null | undefined

  /**
   * Maximum search depth (inclusive).
   */
  depth?: number | null | undefined

  /**
   * List of file extensions to filter matched files by.
   *
   * > 👉 **Note**: This is alternative way to exclude files from the tree.
   *
   * @see {@linkcode Extensions}
   */
  extensions?: Extensions | null | undefined

  /**
   * Path filters to determine if nodes should be added to the tree.
   *
   * @see {@linkcode Filters}
   */
  filters?: Filters | null | undefined

  /**
   * File system adapter.
   *
   * @see {@linkcode FileSystem}
   */
  fs?: Partial<FileSystem> | null | undefined

  /**
   * Node handlers.
   *
   * @see {@linkcode Handles}
   */
  handles?: Handles | null | undefined

  /**
   * Module id of root directory.
   *
   * @default
   *  pathe.cwd() + pathe.sep
   */
  root?: URL | string | null | undefined

  /**
   * Function used to sort child nodes.
   *
   * By default, nodes are sorted by `type` and `name`.
   *
   * @see {@linkcode Sort}
   */
  sort?: Sort | null | undefined
}

export type { Options as default }
