/**
 * @file Test Utilities - readdir
 * @module tests/utils/readdir
 */

import toPath from '#internal/to-path'
import pathe from '@flex-development/pathe'
import fs from 'node:fs'

export { readdir as default, type ReadResult }

/**
 * Read directory result.
 */
type ReadResult = {
  /**
   * List of direcory paths.
   */
  directories: string[]

  /**
   * List of files.
   */
  files: string[]
}

/**
 * Get the contents of the directory at `dir`.
 *
 * @this {void}
 *
 * @param {string} dir
 *  Directory URL or path to directory
 * @param {number | null | undefined} depth
 *  Maximum search depth (inclusive)
 * @param {ReadResult | null | undefined} [ctx]
 *  Read directory context
 * @return {ReadResult}
 *  Read directory result
 */
function readdir(
  this: void,
  dir: URL | string,
  depth?: number | null | undefined,
  ctx?: ReadResult | null | undefined
): ReadResult {
  ctx ??= { directories: [], files: [] }

  if (
    depth === null ||
    depth === undefined ||
    typeof depth === 'number' && depth >= 0
  ) {
    dir = toPath(dir)

    /**
     * List of subdirectories.
     *
     * @const {string[]} subdirectories
     */
    const subdirectories: string[] = []

    for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
      /**
       * Relative path to directory or file.
       *
       * @const {string} path
       */
      const path: string = pathe.join(dir, dirent.name)

      if (dirent.isDirectory()) {
        subdirectories.push(path)
      } else {
        ctx.files.push(path)
      }
    }

    if (typeof depth === 'number') {
      depth--
      if (depth <= 0) return ctx
    }

    for (const path of subdirectories) {
      ctx.directories.push(path)
      readdir(path, depth, ctx)
    }
  }

  return ctx
}
