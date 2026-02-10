/**
 * @file Type Aliases - Extensions
 * @module fst-util-from-fs/types/Extensions
 */

import type { List } from '@flex-development/fst-util-from-fs'

/**
 * Union of options used to filter files by extension.
 *
 * @see {@linkcode List}
 */
type Extensions = List<string> | string

export type { Extensions as default }
