/**
 * @file Type Aliases - ToVisitKey
 * @module fst-util-from-fs/types/ToVisitKey
 */

import type { AnyParent as Parent, Root } from '@flex-development/fst'
import type { Options } from '@flex-development/fst-util-from-fs'

/**
 * Get a visit map key for a pathname.
 *
 * @see {@linkcode Options}
 * @see {@linkcode Parent}
 * @see {@linkcode Root}
 *
 * @this {void}
 *
 * @template {WeakKey | string | null} [K]
 *  The map key
 *
 * @param {string} path
 *  The canonical pathname (realpath) of the directory to visit
 * @param {string | null} dir
 *  The path to the directory to visit, relative to `tree.path`
 * @param {Parent} parent
 *  The current parent node
 * @param {Root} tree
 *  The current file system tree
 * @param {Options} options
 *  Options for tree creation
 * @return {WeakKey | string | null}
 *  The `visited` map key
 */
type ToVisitKey<K extends WeakKey | string | null = WeakKey | string | null> = (
  this: void,
  path: string,
  dir: string | null,
  parent: Parent,
  tree: Root,
  options: Options
) => K

export type { ToVisitKey as default }
