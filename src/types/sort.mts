/**
 * @file Type Aliases - Sort
 * @module fst-util-from-fs/types/Sort
 */

import type { Child } from '@flex-development/fst'

/**
 * Compare node `a` to `b`.
 *
 * @see {@linkcode Child}
 *
 * @this {void}
 *
 * @param {Child} a
 *  Current child node
 * @param {Child} b
 *  Next child node
 * @return {number}
 *  Comparison result
 */
type Sort = (this: void, a: Child, b: Child) => number

export type { Sort as default }
