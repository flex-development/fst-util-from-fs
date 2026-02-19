/**
 * @file fromFileSystem
 * @module fst-util-from-fs/util
 */

import visitDirectory from '#internal/visit-directory'
import withTrailingSlash from '#internal/with-trailing-slash'
import type { Root } from '@flex-development/fst'
import type { Awaitable, Options } from '@flex-development/fst-util-from-fs'
import pathe from '@flex-development/pathe'
import { u } from '@flex-development/unist-util-builder'
import when from '@flex-development/when'

export default fromFileSystem

/**
 * Create a file system tree.
 *
 * > 👉 **Note**: Returns a promise if one of the following methods
 * > returns a promise: `fs.realpath`, `options.getFileSystemEntries`,
 * > `options.handles.directory`, `options.handlers.file`.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode Options}
 * @see {@linkcode Root}
 *
 * @template {Awaitable<Root>} T
 *  The tree
 *
 * @this {void}
 *
 * @param {Options | null | undefined} [options]
 *  Options for tree creation
 * @return {T}
 *  The file system tree
 */
function fromFileSystem<T extends Awaitable<Root>>(
  this: void,
  options?: Options | null | undefined
): T

/**
 * Create a file system tree.
 *
 * > 👉 **Note**: Returns a promise if one of the following methods
 * > returns a promise: `fs.realpath`, `options.getFileSystemEntries`,
 * > `options.handles.directory`, `options.handlers.file`.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode Options}
 * @see {@linkcode Root}
 *
 * @this {void}
 *
 * @param {Options | null | undefined} [options]
 *  Options for tree creation
 * @return {Awaitable<Root>}
 *  The file system tree
 */
function fromFileSystem(
  this: void,
  options?: Options | null | undefined
): Awaitable<Root> {
  options = { ...options }

  /**
   * The file system tree.
   *
   * @const {Root} tree
   */
  const tree: Root = u('root', {
    children: [],
    path: options.root ? String(options.root) : pathe.cwd()
  })

  tree.path = withTrailingSlash(pathe.toPath(tree.path))

  return when(visitDirectory(null, null, tree, [], options), () => tree)
}
