/**
 * @file Mocks - fs/promises
 * @module mocks/fs/promises
 */

import { fs } from 'memfs'
import type nfs from 'node:fs'

export default fs.promises as unknown as typeof nfs['promises']
