/**
 * @file Type Aliases - GetFileSystemEntries
 * @module fst-util-from-fs/types/GetFileSystemEntries
 */

import type {
  Awaitable,
  FileSystem,
  FileSystemEntries
} from '@flex-development/fst-util-from-fs'

/**
 * Get a file system entries record.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode FileSystemEntries}
 * @see {@linkcode FileSystem}
 *
 * @template {Awaitable<FileSystemEntries>} [T]
 *  The entries record
 *
 * @this {void}
 *
 * @param {URL | string} parent
 *  The entry id of the parent directory
 * @param {FileSystem} fs
 *  The file system API
 * @return {T}
 *  The file system entries record
 */
type GetFileSystemEntries<
  T extends Awaitable<FileSystemEntries> = Awaitable<FileSystemEntries>
> = (
  this: void,
  parent: URL | string,
  fs: FileSystem
) => T

export type { GetFileSystemEntries as default }
