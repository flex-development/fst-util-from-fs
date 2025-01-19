/**
 * @file Type Aliases - Filter
 * @module fst-util-from-fs/types/Filter
 */

/**
 * Determine if a node for `x` should be added to a file system tree.
 *
 * @this {void}
 *
 * @param {string} x
 *  Path to directory or file
 * @return {boolean}
 *  `true` if node for `x` should be added, `false` otherwise
 */
type Filter = (this: void, x: string) => boolean

export type { Filter as default }
