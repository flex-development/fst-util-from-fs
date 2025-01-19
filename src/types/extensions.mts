/**
 * @file Type Aliases - Extensions
 * @module fst-util-from-fs/types/Extensions
 */

/**
 * Union of options to filter matched files by file extension.
 */
type Extensions = Set<string> | readonly string[] | string

export type { Extensions as default }
