/**
 * @file Usage Example
 * @module example
 */

import type {
  File,
  AnyParent as Parent,
  Root
} from '@flex-development/fst'
import {
  fromFileSystem,
  type Dirent,
  type FileSystem,
  type Stats
} from '@flex-development/fst-util-from-fs'
import pathe from '@flex-development/pathe'
import { inspect } from '@flex-development/unist-util-inspect'
import { ok } from 'devlop'
import fs from 'node:fs'
import { size } from 'unist-util-size'

declare module '@flex-development/fst' {
  interface File {
    /**
     * The size of the file.
     */
    size?: bigint | number | undefined
  }
}

declare module '@flex-development/fst-util-from-fs' {
  interface Stats {
    /**
     * The size of the entry.
     */
    size?: bigint | number | undefined
  }
}

/**
 * A glob pattern matching directories to search
 * and files to include in the tree.
 *
 * @const {string} pattern
 */
const pattern: string = 'src/**/**'

/**
 * The file system tree.
 *
 * @const {Root} tree
 */
const tree: Root = await fromFileSystem({
  extensions: '.mts',
  filters: {
    /**
     * @this {void}
     *
     * @param {string} path
     *  The path to the directory, relative to `tree.path`
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
    directory(
      this: void,
      path: string,
      depth: number | null | undefined,
      dirent: Dirent,
      parent: Parent,
      tree: Root
    ): boolean {
      return pathe.matchesGlob(path, pattern, {
        cwd: tree.path,
        dot: false,
        ignore: ['**/__mocks__/**', '**/__snapshots__/**', '**/__tests__/**'],
        noglobstar: false
      })
    },

    /**
     * @this {void}
     *
     * @param {string} path
     *  The path to the file, relative to `tree.path`
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
    file(
      this: void,
      path: string,
      depth: number | null | undefined,
      dirent: Dirent,
      parent: Parent,
      tree: Root
    ): boolean {
      return pathe.matchesGlob(path, pattern, {
        cwd: tree.path,
        dot: true,
        ignore: ['**/.DS_Store'],
        noglobstar: false
      })
    }
  },
  fs: fs.promises,
  handles: {
    /**
     * @async
     *
     * @this {void}
     *
     * @param {File} node
     *  The node representing the file
     * @param {Dirent} dirent
     *  The dirent representing the file
     * @param {Parent} parent
     *  The parent of `node`
     * @param {Root} tree
     *  The current file system tree
     * @param {Parent[]} ancestors
     *  The ancestors of `node`, with the last node being `parent`
     * @param {FileSystem} fs
     *  The file system API
     * @return {Promise<undefined>}
     */
    async file(
      this: void,
      node: File,
      dirent: Dirent,
      parent: Parent,
      tree: Root,
      ancestors: Parent[],
      fs: FileSystem
    ): Promise<undefined> {
      /**
       * The list of relative ancestor paths.
       *
       * @const {string[]} paths
       */
      const paths: string[] = [...ancestors.slice(1), node].map(n => {
        ok(n.type !== 'root', 'did not expect tree')
        return n.name
      })

      /**
       * Info about the file.
       *
       * @const {Stats} stats
       */
      const stats: Stats = await fs.stat(pathe.join(tree.path, ...paths))

      return node.size = stats.size, void node
    }
  }
})

console.log(inspect(tree))
console.dir(size(tree))
console.dir(size(tree, node => node.type === 'directory'))
console.dir(size(tree, node => node.type === 'file'))
