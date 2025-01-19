/**
 * @file Internal - hasExtension
 * @module fst-util-from-fs/internal/hasExtension
 */

import type { Extensions } from '@flex-development/fst-util-from-fs'
import pathe from '@flex-development/pathe'

/**
 * Check if `input` ends with an extension in `extensions`.
 *
 * @see {@linkcode Extensions}
 *
 * @internal
 *
 * @param {string} x
 *  The path or `file:` URL to check
 * @param {Extensions | null | undefined} [extensions]
 *  File extensions to filter matched files by
 * @return {boolean}
 *  `true` if `x` ends with an extension in `extensions`,
 *  or no `extensions` are provided
 */
function hasExtension(
  x: string,
  extensions: Extensions | null | undefined
): boolean {
  if (typeof extensions === 'string') extensions = [extensions]

  if (extensions) {
    /**
     * List of file extensions.
     *
     * @const {string[]} filter
     */
    const list: string[] = [...extensions]

    if (list.length) {
      return list.map(pathe.formatExt).some(ext => x.endsWith(ext))
    }
  }

  return true
}

export default hasExtension
