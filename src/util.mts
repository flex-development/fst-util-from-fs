/**
 * @file fromFileSystem
 * @module fst-util-from-fs/util
 */

import dfs from '#internal/fs'
import hasExtension from '#internal/has-extension'
import toPath from '#internal/to-path'
import type {
  Child,
  Directory,
  File,
  AnyParent as Parent,
  Root
} from '@flex-development/fst'
import type {
  Dirent,
  FileSystem,
  Filters,
  Handles,
  Options
} from '@flex-development/fst-util-from-fs'
import pathe from '@flex-development/pathe'
import { u } from '@flex-development/unist-util-builder'
import { ok } from 'devlop'

/**
 * Create a file system tree.
 *
 * @see {@linkcode Options}
 * @see {@linkcode Root}
 *
 * @this {void}
 *
 * @param {Options | null | undefined} [options]
 *  Tree options
 * @return {Root}
 *  File system tree
 */
function fromFileSystem(
  this: void,
  options?: Options | null | undefined
): Root {
  options ??= {}

  /**
   * Path filters to determine if nodes should be added to the tree.
   *
   * @const {Required<Filters>} filters
   */
  const filters: Required<Filters> = {
    directory: filter,
    file: filter,
    ...options.filters
  }

  /**
   * File system adapter.
   *
   * @const {Required<FileSystem>} fs
   */
  const fs: Required<FileSystem> = { ...dfs, ...options.fs }

  /**
   * Node handlers.
   *
   * @const {Handles} handles
   */
  const handles: Handles = { ...options.handles }

  /**
   * File system tree.
   *
   * @const {Root} tree
   */
  const tree: Root = u('root', { children: [], path: pathe.cwd() })

  if (options.root !== null && options.root !== undefined) {
    tree.path = toPath(options.root)
  }

  tree.path = tree.path.replace(/[/\\]+$/, '') + pathe.sep
  populate(tree, '', options.depth)

  return tree

  /**
   * @this {void}
   *
   * @param {string} x
   *  Relative path to directory or file
   * @return {boolean}
   *  `true` if node for `x` should be added to `tree`, `false` otherwise
   */
  function filter(this: void, x: string): boolean {
    return void x, true
  }

  /**
   * @template {Parent} T
   *  Parent node
   *
   * @this {void}
   *
   * @param {T} parent
   *  Current parent node
   * @param {string} dir
   *  Current directory path, relative to {@linkcode tree.path}
   * @param {number | null | undefined} depth
   *  Maximum search depth (inclusive)
   * @return {undefined}
   */
  function populate<T extends Parent>(
    this: void,
    parent: T,
    dir: string,
    depth: number | null | undefined
  ): undefined {
    ok(options, 'expected `options`')

    /**
     * Directory path.
     *
     * @const {string} path
     */
    const path: string = pathe.join(tree.path, dir)

    /**
     * List of directories under {@linkcode path}.
     *
     * @const {[string, Dirent][]} subdirectories
     */
    const subdirectories: [x: string, dirent: Dirent][] = []

    if (
      depth === null ||
      depth === undefined ||
      typeof depth === 'number' && depth > 0
    ) {
      for (const dirent of fs.readdirSync(path, { withFileTypes: true })) {
        /**
         * Relative path to directory or file.
         *
         * @const {string} x
         */
        const x: string = pathe.join(dir, dirent.name)

        if (dirent.isDirectory()) {
          filters.directory!(x) && subdirectories.push([x, dirent])
        } else {
          if (filters.file!(x) && hasExtension(x, options.extensions)) {
            /**
             * File node.
             *
             * @const {File} node
             */
            const node: File = u('file', { name: dirent.name, value: null })

            if (options.content && typeof fs.readFileSync === 'function') {
              node.value = fs.readFileSync(pathe.join(tree.path, x), 'utf8')
            }

            parent.children.push(node)
            handles.file?.(node, dirent, parent, tree, fs)
          }
        }
      }

      // stop search at specified depth
      if (typeof depth === 'number') {
        depth--
        if (depth <= 0) return void depth
      }

      // add subdirectory nodes
      for (const [x, dirent] of subdirectories) {
        /**
         * Subdirectory node.
         *
         * @const {Directory} node
         */
        const node: Directory = u('directory', {
          children: [],
          name: dirent.name
        })

        populate(node, x, depth)
        parent.children.push(node)
        handles.directory?.(node, dirent, parent, tree, fs)
      }
    }

    return void (parent.children.sort(options.sort ?? sort), parent)
  }

  /**
   * @this {void}
   *
   * @param {Child} a
   *  Current child node
   * @param {Child} b
   *  Next child node
   * @return {number}
   *  Comparison result
   */
  function sort(a: Child, b: Child): number {
    /**
     * Comparison result.
     *
     * @var {number} result
     */
    let result: number = { directory: -1, file: 1 }[a.type]

    if (a.type === b.type) result = a.name.localeCompare(b.name)

    return result
  }
}

export default fromFileSystem
