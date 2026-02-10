/**
 * @file Type Aliases - VisitMap
 * @module fst-util-from-fs/types/VisitMap
 */

/**
 * Map indicating which directories have already been searched.
 *
 * @see {@linkcode Map}
 * @see {@linkcode WeakMap}
 */
type VisitMap = Map<string | null, boolean> | WeakMap<WeakKey, boolean>

export type { VisitMap as default }
