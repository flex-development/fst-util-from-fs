/**
 * @file Internal - fs/browser
 * @module fst-util-from-fs/internal/fs/browser
 */

import type { FileSystem } from '@flex-development/fst-util-from-fs'

/**
 * File system API.
 *
 * @internal
 *
 * @const {Required<FileSystem>} fs
 */
const fs: Required<FileSystem> = {
  /**
   * Get the contents of a file.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  readFileSync(): never {
    throw new Error('[readFileSync] not implemented')
  },

  /**
   * Read the contents of a directory.
   *
   * @return {never}
   *  Never; not implemented
   * @throws {Error}
   */
  readdirSync(): never {
    throw new Error('[readdirSync] not implemented')
  }
}

export default fs
