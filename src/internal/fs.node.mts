/**
 * @file Internal - fs/node
 * @module fst-util-from-fs/internal/fs/node
 */

import type { FileSystem } from '@flex-development/fst-util-from-fs'
import nfs from 'node:fs'

/**
 * The file system API.
 *
 * @see {@linkcode FileSystem}
 *
 * @internal
 *
 * @const {FileSystem} fs
 */
const fs: FileSystem = {
  readdir: nfs.readdirSync,
  realpath: nfs.realpathSync,
  stat: nfs.statSync
}

export default fs
