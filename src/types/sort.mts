/**
 * @file Type Aliases - Sort
 * @module fst-util-from-fs/types/Sort
 */

import type { Child } from '@flex-development/fst'

/**
 * Decide how two nodes should be sorted.
 *
 * @see {@linkcode Child}
 *
 * @this {void}
 *
 * @param {Child} a
 *  The current child node
 * @param {Child} b
 *  The next child node
 * @return {number}
 *  The comparison result
 */
type Sort = (this: void, a: Child, b: Child) => number

export type { Sort as default }
