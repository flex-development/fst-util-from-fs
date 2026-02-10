/**
 * @file Utilities - getFileSystemEntries
 * @module fst-util-from-fs/utils/getFileSystemEntries
 */

import chainOrCall from '#internal/chain-or-call'
import combinePaths from '#internal/combine-paths'
import constant from '#internal/constant'
import empty from '#internal/empty-file-system-entries'
import dfs from '#internal/fs'
import isPromise from '#internal/is-promise'
import type {
  Awaitable,
  Dirent,
  FileSystem,
  FileSystemEntries,
  Stats
} from '@flex-development/fst-util-from-fs'
import pathe from '@flex-development/pathe'
import { ok } from 'devlop'

export default getFileSystemEntries

/**
 * Get a record of accessible file system entries.
 *
 * > 👉 **Note**: Entries are relative to `parent`.
 *
 * @template {Awaitable<FileSystemEntries>} T
 *  The file system entries record
 *
 * @this {void}
 *
 * @param {URL | string | null | undefined} parent
 *  The entry id of the parent directory
 * @param {FileSystem | null | undefined} fs
 *  The file system API
 * @return {T}
 *  The file system entries record
 */
function getFileSystemEntries<T extends Awaitable<FileSystemEntries>>(
  this: void,
  parent: URL | string | null | undefined,
  fs?: FileSystem | null | undefined
): T

/**
 * Get a record of accessible file system entries.
 *
 * > 👉 **Note**: Entries are relative to `parent`.
 *
 * @this {void}
 *
 * @param {URL | string | null | undefined} parent
 *  The entry id of the parent directory
 * @param {FileSystem | null | undefined} fs
 *  The file system API
 * @return {Awaitable<FileSystemEntries>}
 *  The file system entries record
 */
function getFileSystemEntries(
  this: void,
  parent: URL | string | null | undefined,
  fs?: FileSystem | null | undefined
): Awaitable<FileSystemEntries> {
  fs ??= dfs
  if (parent) parent = pathe.toPath(parent)

  /**
   * The list of accessible directories.
   *
   * @const {Dirent[]} directories
   */
  const directories: Dirent[] = []

  /**
   * The list of accessible files.
   *
   * @const {Dirent[]} files
   */
  const files: Dirent[] = []

  /**
   * The list of file system entries.
   *
   * @var {Awaitable<Dirent[]>} content
   */
  let content: Awaitable<Dirent[]> = []

  try {
    content = fs.readdir(parent || pathe.dot, { withFileTypes: true })
    return chainOrCall(content, entries, constant(empty), undefined, parent)
  } catch {
    return empty
  }

  /**
   * @this {void}
   *
   * @param {string | null | undefined} parent
   *  The path to the parent directory
   * @param {Dirent[] | undefined} [dirents]
   *  The directory content
   * @return {Awaitable<FileSystemEntries>}
   *  The file system entries record
   */
  function entries(
    this: void,
    parent: string | null | undefined,
    dirents: Dirent[] = content as Dirent[]
  ): Awaitable<FileSystemEntries> {
    /**
     * The promises to resolve.
     *
     * > 👉 **Note**: Only used if `fs.stat` returns a promise.
     *
     * @const {Awaitable<[Dirent, Stats?]>[]} promises
     */
    const promises: Awaitable<[Dirent, Stats?]>[] = []

    // collect file system entries.
    for (const item of dirents) {
      // on some file systems, node fails to exclude `.` and `..`
      // see: https://github.com/nodejs/node/issues/4002
      /* v8 ignore next -- @preserve */ if (/^\.\.?$/.test(item.name)) continue

      /**
       * The metadata for the file system entry.
       *
       * @var {Awaitable<Dirent | Stats>} metadata
       */
      let metadata: Awaitable<Dirent | Stats> = item

      // get metadata for symbolic link.
      if (item.isSymbolicLink()) {
        ok(fs, 'expected `fs`')

        try {
          metadata = fs.stat(combinePaths(parent, item.name))
        } catch {
          return empty // swallow error.
        }
      }

      // collect `fs.stat` promise to add new entry during resolution.
      if (isPromise(metadata)) {
        promises.push(metadata.then(stats => [item, stats], constant([item])))
        continue
      }

      // add new file system entry.
      void entry(metadata, item)
    }

    // resolve `fs.stat` promises and return finalized entries.
    if (promises.length) {
      return Promise.all(promises).then(metadata => {
        for (const [d, s] of metadata) if (entry(s, d) === empty) return empty
        return finalize()
      })
    }

    return finalize()
  }

  /**
   * @this {void}
   *
   * @param {Stats | null | undefined} stats
   *  The entry metadata
   * @param {Dirent} dirent
   *  The directory content object
   * @return {FileSystemEntries | undefined}
   *  The empty file system entries record if no `stats` or `undefined`
   */
  function entry(
    this: void,
    stats: Stats | null | undefined,
    dirent: Dirent
  ): FileSystemEntries | undefined {
    if (!stats) {
      return empty
    } else if (stats.isFile()) {
      files.push(dirent)
    } else if (stats.isDirectory()) {
      directories.push(dirent)
    }

    return void stats
  }

  /**
   * @this {void}
   *
   * @return {FileSystemEntries}
   *  The finalized file system entries record
   */
  function finalize(this: void): FileSystemEntries {
    return {
      directories: Object.freeze(directories.sort(sort)),
      files: Object.freeze(files.sort(sort))
    }
  }
}

/**
 * @internal
 *
 * @this {void}
 *
 * @param {Dirent} a
 *  The current dirent
 * @param {Dirent} b
 *  The next dirent
 * @return {number}
 *  The comparison result
 */
function sort(a: Dirent, b: Dirent): number {
  return a.name.localeCompare(b.name, undefined, { caseFirst: 'upper' })
}
