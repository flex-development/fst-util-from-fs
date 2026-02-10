/**
 * @file Interfaces - Options
 * @module fst-util-from-fs/interfaces/Options
 */

import type {
  Extensions,
  FileSystem,
  Filters,
  GetFileSystemEntries,
  Handles,
  Sort,
  ToVisitKey,
  VisitMap
} from '@flex-development/fst-util-from-fs'

/**
 * Options for creating a file system tree.
 */
interface Options {
  /**
   * The maximum search depth (inclusive).
   *
   * > 👉 **Note**: A search depth less than `0` will produce an empty tree.
   */
  depth?: number | null | undefined

  /**
   * The file extensions to filter matched files by.
   *
   * > 👉 **Note**: This is alternative way to exclude files from the tree.
   *
   * @see {@linkcode Extensions}
   */
  extensions?: Extensions | null | undefined

  /**
   * The filters used to determine if nodes should be added to the tree.
   *
   * @see {@linkcode Filters}
   */
  filters?: Filters | null | undefined

  /**
   * The file system API.
   *
   * @see {@linkcode FileSystem}
   */
  fs?: FileSystem | null | undefined

  /**
   * Get a file system entries record.
   *
   * @see {@linkcode GetFileSystemEntries}
   */
  getFileSystemEntries?: GetFileSystemEntries | null | undefined

  /**
   * The callbacks to fire after a node is added to the tree.
   *
   * @see {@linkcode Handles}
   */
  handles?: Handles | null | undefined

  /**
   * The module id of the root directory.
   *
   * @default
   *  pathe.cwd() + pathe.sep
   */
  root?: URL | string | null | undefined

  /**
   * The child node sorter.
   *
   * By default, nodes are sorted by `type` and `name`.
   *
   * @see {@linkcode Sort}
   */
  sort?: Sort | null | undefined

  /**
   * Generate a key for the {@linkcode visited} directory map.
   *
   * @see {@linkcode ToVisitKey}
   *
   * @default identity
   */
  visitKey?: ToVisitKey | null | undefined

  /**
   * The map indicating which directories have already been searched.
   *
   * @default
   *  new Map()
   */
  visited?: VisitMap | null | undefined
}

export type { Options as default }
