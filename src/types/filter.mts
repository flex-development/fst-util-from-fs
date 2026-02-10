/**
 * @file Type Aliases - Filter
 * @module fst-util-from-fs/types/Filter
 */

import type { AnyParent as Parent, Root } from '@flex-development/fst'
import type { Dirent } from '@flex-development/fst-util-from-fs'

/**
 * Determine if a node for `path` should be added to a file system `tree`.
 *
 * @see {@linkcode Dirent}
 * @see {@linkcode Parent}
 * @see {@linkcode Root}
 *
 * @this {void}
 *
 * @param {string} path
 *  The path to the entry, relative to its parent directory
 * @param {number | null | undefined} depth
 *  The current search depth
 * @param {Dirent} dirent
 *  The dirent representing the file system entry
 * @param {Parent} parent
 *  The parent node
 * @param {Root} tree
 *  The file system tree
 * @return {boolean}
 *  `true` if node for `path` should be added, `false` otherwise
 */
type Filter = (
  this: void,
  path: string,
  depth: number | null | undefined,
  dirent: Dirent,
  parent: Parent,
  tree: Root
) => boolean

export type { Filter as default }
