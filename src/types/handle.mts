/**
 * @file Type Aliases - Handle
 * @module fst-util-from-fs/types/Handle
 */

import type { Child, AnyParent as Parent, Root } from '@flex-development/fst'
import type { Dirent, FileSystem } from '@flex-development/fst-util-from-fs'

/**
 * Handle `node`.
 *
 * @see {@linkcode Child}
 * @see {@linkcode Dirent}
 * @see {@linkcode FileSystem}
 * @see {@linkcode Parent}
 * @see {@linkcode Root}
 *
 * @template {Child} [T=Child]
 *  Child node
 *
 * @this {void}
 *
 * @param {T} node
 *  Directory or file node
 * @param {Dirent} dirent
 *  Dirent object representing directory or file
 * @param {Parent} parent
 *  Parent node
 * @param {Root} tree
 *  File system tree
 * @param {FileSystem} fs
 *  File system adapter
 * @return {null | undefined | void}
 */
type Handle<T extends Child = Child> = (
  this: void,
  node: T,
  dirent: Dirent,
  parent: Parent,
  tree: Root,
  fs: FileSystem
) => null | undefined | void

export type { Handle as default }
