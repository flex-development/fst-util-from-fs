/**
 * @file Internal - emptyFileSystemEntries
 * @module fst-util-from-fs/internal/emptyFileSystemEntries
 */

import type FileSystemEntries from '#interfaces/file-system-entries'
import emptyArray from '#internal/empty-array'

/**
 * An empty file system entries record.
 *
 * @internal
 *
 * @const {Readonly<FileSystemEntries>} emptyFileSystemEntries
 */
const emptyFileSystemEntries: Readonly<FileSystemEntries> = Object.freeze({
  directories: emptyArray,
  files: emptyArray
})

export default emptyFileSystemEntries
