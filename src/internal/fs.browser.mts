/**
 * @file Internal - fs/browser
 * @module fst-util-from-fs/internal/fs/browser
 */

import type { FileSystem } from '@flex-development/fst-util-from-fs'

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
  /**
   * Read the entire contents of a directory.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  readdir(): never {
    throw new Error('[readdir] not implemented')
  },

  /**
   * Compute a canonical pathname by resolving `.`, `..`, and symbolic links.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  realpath(): never {
    throw new Error('[realpath] not implemented')
  },

  /**
   * Get information about a file system entry.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  stat(): never {
    throw new Error('[stat] not implemented')
  }
}

export default fs
