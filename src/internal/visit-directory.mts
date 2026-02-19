/**
 * @file Internal - visitDirectory
 * @module tsconfig-utils/internal/visitDirectory
 */

import combinePaths from '#internal/combine-paths'
import dfs from '#internal/fs'
import identity from '#internal/identity'
import type {
  Child,
  Directory,
  File,
  AnyParent as Parent,
  Root
} from '@flex-development/fst'
import type {
  Awaitable,
  Dirent,
  Extensions,
  FileSystem,
  FileSystemEntries,
  Filters,
  Handle,
  Handles,
  Options,
  Sort,
  VisitMap
} from '@flex-development/fst-util-from-fs'
import { getFileSystemEntries } from '@flex-development/fst-util-from-fs/utils'
import pathe from '@flex-development/pathe'
import { u } from '@flex-development/unist-util-builder'
import { isThenable, when } from '@flex-development/when'

export default visitDirectory

/**
 * Visit a directory, inserting nodes into the tree as matched.
 *
 * > 👉 **Note**: Returns a promise if one of the following methods
 * > returns a promise: `fs.realpath`, `options.getFileSystemEntries`,
 * > `options.handles.directory`, `options.handlers.file`.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode Options}
 * @see {@linkcode Parent}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {string | null} dir
 *  The path to the directory to visit, relative to `tree.path`
 * @param {Parent | null | undefined} parent
 *  The current parent node
 * @param {Root} tree
 *  The current file system tree
 * @param {Parent[]} ancestors
 *  The ancestors of the `parent` node
 * @param {Options} options
 *  Options for tree creation
 * @return {Awaitable<undefined>}
 *  Nothing
 */
function visitDirectory(
  this: void,
  dir: string | null,
  parent: Parent | null | undefined,
  tree: Root,
  ancestors: Parent[],
  options: Options
): Awaitable<undefined> {
  if (typeof options.depth === 'number' && options.depth <= 0) return void dir

  parent ??= tree

  /**
   * The file system API.
   *
   * @const {FileSystem} fs
   */
  const fs: FileSystem = options.fs ?? dfs

  /**
   * The canonical pathname for the directory.
   *
   * @const {Awaitable<string>} realpath
   */
  const realpath: Awaitable<string> = fs.realpath(combinePaths(tree.path, dir))

  return when(realpath, (path = realpath as string) => {
    /**
     * The {@linkcode visited} map key.
     *
     * @const {WeakKey | string | null} key
     */
    const key: WeakKey | string | null = (options.visitKey ?? identity)(
      path,
      dir,
      parent,
      tree,
      options
    )

    /**
     * Map indicating which directories have already been searched.
     *
     * @const {VisitMap} visited
     */
    const visited: VisitMap = options.visited ?? new Map()

    if (visited.has(key as never)) return void key
    visited.set(key as never, true)

    /**
     * The file system entries record.
     *
     * @var {Awaitable<FileSystemEntries>} entries
     */
    let entries: Awaitable<FileSystemEntries>

    entries = (options.getFileSystemEntries ?? getFileSystemEntries)(path, fs)
    ancestors.push(parent)

    return when(entries, visit, undefined, undefined, parent, fs)

    /**
     * @this {void}
     *
     * @param {Parent} parent
     *  The parent node
     * @param {FileSystem} fs
     *  The file system API
     * @param {FileSystemEntries} [content]
     *  The file system entries record
     * @return {Awaitable<undefined>}
     *  Nothing
     */
    function visit(
      this: void,
      parent: Parent,
      fs: FileSystem,
      content: FileSystemEntries = entries as FileSystemEntries
    ): Awaitable<undefined> {
      /**
       * The filters used to determine if nodes should be added to the tree.
       *
       * @const {Filters} filters
       */
      const filters: Filters = { ...options.filters }

      /**
       * The node handlers.
       *
       * @const {Handles} handles
       */
      const handles: Handles = { ...options.handles }

      /**
       * The promises to resolve.
       *
       * @const {PromiseLike<unknown>[]} promises
       */
      const promises: PromiseLike<unknown>[] = []

      /**
       * The maximum search depth (inclusive).
       *
       * @var {number | null | undefined} depth
       */
      let depth: number | null | undefined = options.depth

      // match files.
      for (const dirent of content.files) {
        /**
         * The node type.
         *
         * @const {File['type']} type
         */
        const type: File['type'] = 'file'

        /**
         * The file path.
         *
         * @var {string} file
         */
        let file: string = combinePaths(dir, dirent.name)

        // do nothing if file should not be added to the tree.
        if (
          !filter(filters, type, file, depth, dirent, parent, tree) ||
          !hasExtension(options.extensions, file)
        ) {
          continue
        }

        /**
         * The result of adding the file to the tree.
         *
         * @const {ReturnType<Handle>} result
         */
        const result: ReturnType<Handle> = add(
          handles,
          u(type, { name: dirent.name, value: null }),
          dirent,
          parent,
          tree,
          ancestors,
          fs
        )

        // store handle promise.
        if (isThenable(result)) promises.push(result)
      }

      // decrease search depth.
      if (typeof depth === 'number') {
        depth--
        if (depth <= 0) return void depth
      }

      // recursively search subdirectories.
      for (const dirent of content.directories) {
        /**
         * The subdirectory path.
         *
         * @const {string} subdir
         */
        const subdir: string = combinePaths(dir, dirent.name)

        /**
         * The node type.
         *
         * @const {Directory['type']} type
         */
        const type: Directory['type'] = 'directory'

        // do nothing if subdirectory should not be searched.
        if (!filter(filters, type, subdir, depth, dirent, parent, tree)) {
          continue
        }

        /**
         * The subdirectory node.
         *
         * @const {Directory} node
         */
        const node: Directory = u(type, { children: [], name: dirent.name })

        /**
         * The result of the subdirectory visit,
         * or adding the subdirectory to the tree.
         *
         * @var {Awaitable<undefined> | ReturnType<Handle>} result
         */
        let result: Awaitable<undefined> | ReturnType<Handle> = visitDirectory(
          subdir,
          node,
          tree,
          [...ancestors],
          Object.assign({}, options, { depth, visited })
        )

        // add directory node to tree.
        // eslint-disable-next-line unicorn/prefer-ternary
        if (!isThenable(result)) {
          result = add(handles, node, dirent, parent, tree, ancestors, fs)
        } else {
          result = result.then(() => {
            return add(handles, node, dirent, parent, tree, ancestors, fs)
          })
        }

        // store visit or handle promise.
        if (isThenable(result)) promises.push(result)
      }

      /**
       * The child node sorter.
       *
       * @const {Sort} sort
       */
      const sort: Sort = options.sort ?? sorter

      if (!promises.length) return void parent.children.sort(sort)
      return Promise.all(promises).then(() => void parent.children.sort(sort))
    }
  })
}

/**
 * @internal
 *
 * @this {void}
 *
 * @param {Handles} handles
 *  The node handlers
 * @param {Directory | File} node
 *  The current node
 * @param {Dirent} dirent
 *  The dirent associated with `node`
 * @param {Parent} parent
 *  The current parent node
 * @param {Root} tree
 *  The current file system tree
 * @param {Parent[]} ancestors
 *  The ancestors of `node`
 * @param {FileSystem} fs
 *  The file system API
 * @return {ReturnType<Handle>}
 *  Nothing
 */
function add(
  this: void,
  handles: Handles,
  node: Directory | File,
  dirent: Dirent,
  parent: Parent,
  tree: Root,
  ancestors: Parent[],
  fs: FileSystem
): ReturnType<Handle> {
  return parent.children.push(node), handles[node.type]?.(
    node as never,
    dirent,
    parent,
    tree,
    ancestors,
    fs
  )
}

/**
 * @internal
 *
 * @this {void}
 *
 * @param {Filters} filters
 *  The filters used to determine if nodes should be added to `tree`
 * @param {Child['type']} type
 *  The type of path to filter
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
function filter(
  this: void,
  filters: Filters,
  type: Child['type'],
  path: string,
  depth: number | null | undefined,
  dirent: Dirent,
  parent: Parent,
  tree: Root
): boolean {
  return filters[type]?.(path, depth, dirent, parent, tree) ?? true
}

/**
 * @internal
 *
 * @this {void}
 *
 * @param {Extensions | null | undefined} extensions
 *  The file extensions to filter matched files by
 * @param {URL | string} target
 *  The entry id to check
 * @return {boolean}
 *  `true` if `target` ends with a specified extension
 *  or no extensions were specified, `false` otherwise
 */
function hasExtension(
  this: void,
  extensions: Extensions | null | undefined,
  target: URL | string
): boolean {
  if (typeof extensions === 'string') extensions = [extensions]
  if (!extensions) return true

  extensions = new Set(extensions)
  target = String(target)

  return [...extensions].map(pathe.formatExt).some(ext => target.endsWith(ext))
}

/**
 * @internal
 *
 * @this {void}
 *
 * @param {Child} a
 *  The current child node
 * @param {Child} b
 *  The next child node
 * @return {number}
 *  The comparison result
 */
function sorter(a: Child, b: Child): number {
  /**
   * The comparison result.
   *
   * @var {number} result
   */
  let result: number = { directory: -1, file: 1 }[a.type]

  if (a.type === b.type) result = a.name.localeCompare(b.name)
  return result
}
