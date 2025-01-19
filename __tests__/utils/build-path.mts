/**
 * @file Test Utilities - buildPath
 * @module tests/utils/buildPath
 */

import type { Directory, DirectoryContent, Root } from '@flex-development/fst'
import pathe from '@flex-development/pathe'

/**
 * Get the path to `node`.
 *
 * @see {@linkcode DirectoryContent}
 * @see {@linkcode Directory}
 * @see {@linkcode Root}
 *
 * @this {void}
 *
 * @param {DirectoryContent} node
 *  Current node
 * @param {Directory | Root} parent
 *  Parent of `node`
 * @param {(Directory | Root)[]} ancestors
 *  List of ancestor nodes where the last node is the grandparent of `node`
 * @return {undefined}
 */
function buildPath(
  this: void,
  node: DirectoryContent,
  parent: Directory | Root,
  ancestors: (Directory | Root)[]
): string {
  return pathe.join(...[...ancestors, parent, node].map(node => {
    return 'path' in node ? node.path : node.name
  }))
}

export default buildPath
