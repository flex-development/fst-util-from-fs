/**
 * @file Test Utilities - flattenContent
 * @module tests/utils/flattenContent
 */

import type { DirectoryJson } from '#fixtures/content.json'
import pathe from '@flex-development/pathe'

export { flattenContent as default, type FlattenContentResult }

/**
 * The result of flattening mock content.
 */
type FlattenContentResult = {
  /**
   * The list of directory paths, relative to the root directory.
   */
  directories: Set<string>

  /**
   * The list of file paths, relative to the root directory.
   */
  files: Set<string>

  /**
   * The total number of entries.
   */
  size: number
}

/**
 * Flatten a content object.
 *
 * @see {@linkcode DirectoryJson}
 * @see {@linkcode FlattenContentResult}
 *
 * @this {void}
 *
 * @param {DirectoryJson} content
 *  The content object
 * @return {FlattenContentResult}
 *  The flatten result
 */
function flattenContent(
  this: void,
  content: DirectoryJson
): FlattenContentResult {
  /**
   * The flatten result.
   *
   * @const {FlattenContentResult} result
   */
  const result: FlattenContentResult = {
    directories: new Set(),
    files: new Set(),
    size: 0
  }

  return flatten(result, '', content)

  /**
   * @this {void}
   *
   * @param {FlattenContentResult} acc
   *  The current result
   * @param {string} parent
   *  The current directory path
   * @param {DirectoryJson | string} value
   *  The current value
   * @return {FlattenContentResult}
   *  The flatten result
   */
  function flatten(
    this: void,
    acc: FlattenContentResult,
    parent: string,
    value: DirectoryJson | string
  ): FlattenContentResult {
    if (typeof value === 'object') {
      for (const [path, nested] of Object.entries(value)) {
        /**
         * The path to the current directory or file.
         *
         * @const {string} nestedPath
         */
        const nestedPath: string = pathe.join(parent, path)

        if (typeof nested === 'string') {
          acc.files.add(nestedPath)
          continue
        }

        acc.directories.add(nestedPath)
        flatten(acc, nestedPath, nested)
      }
    }

    acc.size = acc.directories.size + acc.files.size
    return acc
  }
}
