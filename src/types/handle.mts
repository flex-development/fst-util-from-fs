/**
 * @file Type Aliases - Handle
 * @module fst-util-from-fs/types/Handle
 */

import type { Child, AnyParent as Parent, Root } from '@flex-development/fst'
import type {
  Awaitable,
  Dirent,
  FileSystem
} from '@flex-development/fst-util-from-fs'

/**
 * Handle a `node` that has been added to the `tree`.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode Child}
 * @see {@linkcode Dirent}
 * @see {@linkcode FileSystem}
 * @see {@linkcode Parent}
 *
 * @template {Child} [T]
 *  The file system entry node
 * @template {Awaitable<null | undefined | void>} [Result]
 *  The result of the handle
 *
 * @this {void}
 *
 * @param {T} node
 *  The node representing the file system entry
 * @param {Dirent} dirent
 *  The dirent representing the file system entry
 * @param {Parent} parent
 *  The parent of `node`
 * @param {Root} tree
 *  The current file system tree
 * @param {Parent[]} ancestors
 *  The ancestors of `node`, with the last node being `parent`
 * @param {FileSystem} fs
 *  The file system API
 * @return {Result}
 */
type Handle<
  T extends Child = Child,
  Result extends Awaitable<null | undefined | void> = Awaitable<
    null | undefined | void
  >
> = (
  this: void,
  node: T,
  dirent: Dirent,
  parent: Parent,
  tree: Root,
  ancestors: Parent[],
  fs: FileSystem
) => Result

export type { Handle as default }
