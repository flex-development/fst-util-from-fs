/**
 * @file Fixtures - fsa
 * @module fixtures/fsa
 */

import type { FileSystem } from '@flex-development/fst-util-from-fs'
import fs from 'node:fs'

/**
 * A file system API with asynchronous methods.
 *
 * @type {FileSystem}
 */
const fsa: FileSystem = {
  readdir: fs.promises.readdir,
  realpath: fs.promises.realpath,
  stat: fs.promises.stat
}

export default fsa
