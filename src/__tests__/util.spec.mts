/**
 * @file Unit Tests - fromFileSystem
 * @module fst-util-from-fs/tests/unit/fromFileSystem
 */

import toPath from '#internal/to-path'
import buildPath from '#tests/utils/build-path'
import readdir, { type ReadResult } from '#tests/utils/readdir'
import testSubject from '#util'
import type { Directory, File, FstNode, Root } from '@flex-development/fst'
import type {
  Handle,
  Options
} from '@flex-development/fst-util-from-fs'
import pathe from '@flex-development/pathe'
import type { Fn, Predicate } from '@flex-development/tutils'
import {
  visit,
  type Index
} from '@flex-development/unist-util-visit'
import { ok } from 'devlop'
import fs from 'node:fs'
import type { Node } from 'unist'
import { size } from 'unist-util-size'

describe('unit:fromFileSystem', () => {
  let check: (this: void, tree: Root, read: ReadResult) => undefined
  let isDirectory: Predicate<[Node]>
  let isFile: Predicate<[Node]>

  beforeAll(() => {
    isDirectory = (node: Node): boolean => node.type === 'directory'
    isFile = (node: Node): boolean => node.type === 'file'

    check = function check(
      this: void,
      tree: Root,
      read: ReadResult
    ): undefined {
      return void visit(tree, visitor)

      /**
       * @this {void}
       *
       * @param {FstNode} node
       *  Current node
       * @param {Index | undefined} index
       *  Index of `node` in `parent.children`
       * @param {Directory | Root | undefined} parent
       *  Parent of `node`
       * @param {(Directory | Root)[]} ancestors
       *  List of ancestor nodes where the last node
       *  is the grandparent of `node`
       * @return {undefined}
       */
      function visitor(
        this: void,
        node: FstNode,
        index: Index | undefined,
        parent: Directory | Root | undefined,
        ancestors: (Directory | Root)[]
      ): undefined {
        if (node.type !== 'root') {
          ok(parent, 'expected `parent`')

          /**
           * Path to {@linkcode node}.
           *
           * @const {string} path
           */
          const path: string = buildPath(node, parent, ancestors)

          if (node.type === 'directory') {
            expect(path).to.be.oneOf(read.directories)
            expect(path).to.not.be.oneOf(read.files)
          } else {
            expect(path).to.be.oneOf(read.files)
            expect(path).to.not.be.oneOf(read.directories)
          }
        }

        return void node
      }
    }
  })

  it.each<Parameters<typeof testSubject>>([
    [{ depth: -13 }],
    [{ depth: 0 }]
  ])('should return empty tree (%#)', options => {
    // Act
    const result = testSubject(options)

    // Expect
    expect(result).to.have.property('children').be.an('array')
    expect(result).to.have.property('path', pathe.cwd() + pathe.sep)
    expect(result).to.have.property('type', 'root')
    expect(size(result)).to.eq(0)
  })

  it.each<[
    ...Parameters<typeof testSubject>,
    Fn<Parameters<typeof testSubject>, Fn<[Root], undefined>>
  ]>([
    [
      {
        depth: 1
      },
      function assertion(
        this: void,
        options: Options | null | undefined
      ): Fn<[Root], undefined> {
        ok(options, 'expected `options`')
        ok(options.depth, 'expected `options.depth`')

        /**
         * Read directory result.
         *
         * @const {ReadResult} read
         */
        const read: ReadResult = readdir(pathe.cwd(), options.depth)

        return assert

        /**
         * @this {void}
         *
         * @param {Root} tree
         *  File systrem tree result
         * @return {undefined}
         */
        function assert(this: void, tree: Root): undefined {
          expect(size(tree)).to.eq(read.directories.length + read.files.length)
          expect(size(tree, isDirectory)).to.eq(read.directories.length)
          expect(size(tree, isFile)).to.eq(read.files.length)

          return void check(tree, read)
        }
      }
    ],
    [
      {
        content: true,
        extensions: ['spec.mts', 'spec-d.mts'],
        handles: { directory: vi.fn(), file: vi.fn() },
        root: 'src'
      },
      function assertion(
        this: void,
        options: Options | null | undefined
      ): Fn<[Root], undefined> {
        ok(options, 'expected `options`')
        ok(Array.isArray(options.extensions), 'expected `options.extensions`')
        ok(options.handles, 'expected `options.handles`')
        ok(options.root, 'expected `options.root`')
        ok(options.handles.directory, 'expected `options.handles.directory`')
        ok(options.handles.file, 'expected `options.handles.file`')

        /**
         * Directory node handler.
         *
         * @const {Handle<Directory>} directory
         */
        const directory: Handle<Directory> = options.handles.directory

        /**
         * Regular expression matching expected file extensions.
         *
         * @const {RegExp} ext
         */
        const ext: RegExp = /\.spec(?:-d)?\.mts$/

        /**
         * File node handler.
         *
         * @const {Handle<File>} file
         */
        const file: Handle<File> = options.handles.file

        /**
         * Read directory result.
         *
         * @const {ReadResult} read
         */
        const read: ReadResult = readdir(options.root, options.depth)

        return assert

        /**
         * @this {void}
         *
         * @param {Root} tree
         *  File systrem tree result
         * @return {undefined}
         */
        function assert(this: void, tree: Root): undefined {
          /**
           * Number of directory nodes in {@linkcode tree}.
           *
           * @const {number} directories
           */
          const directories: number = size(tree, isDirectory)

          /**
           * Number of file nodes in {@linkcode tree}.
           *
           * @const {number} files
           */
          const files: number = size(tree, isFile)

          expect(directories).to.eq(read.directories.length)
          expect(directory).toHaveBeenCalledTimes(read.directories.length)
          expect(file).toHaveBeenCalledTimes(files)
          expect(files).to.be.lt(read.files.length)

          return void check(tree, read), void visit(tree, visitor)

          /**
           * @this {void}
           *
           * @param {FstNode} node
           *  Current node
           * @param {Index | undefined} index
           *  Index of `node` in `parent.children`
           * @param {Directory | Root | undefined} parent
           *  Parent of `node`
           * @param {(Directory | Root)[]} ancestors
           *  List of ancestor nodes where the last node
           *  is the grandparent of `node`
           * @return {undefined}
           */
          function visitor(
            this: void,
            node: FstNode,
            index: Index | undefined,
            parent: Directory | Root | undefined,
            ancestors: (Directory | Root)[]
          ): undefined {
            if (node.type === 'file') {
              ok(parent, 'expected `parent`')

              /**
               * Path to {@linkcode node}.
               *
               * @const {string} path
               */
              const path: string = buildPath(node, parent, ancestors)

              /**
               * File content.
               *
               * @const {string} value
               */
              const value: string = fs.readFileSync(path, 'utf8')

              expect(node).to.have.property('name').match(ext)
              expect(node).to.have.property('value', value)
            }

            return void node
          }
        }
      }
    ]
  ])('should return non-empty tree (%#)', (options, assert) => {
    // Arrange
    const root: URL | string = options?.root ?? pathe.cwd()
    const path: string = toPath(root).replace(/[/\\]+$/, '') + pathe.sep

    // Act
    const result = testSubject(options)

    // Expect
    expect(result).to.have.property('children').be.an('array')
    expect(result).to.have.property('path', path)
    expect(result).to.have.property('type', 'root')

    // Assert
    assert(options)(result)
  })
})
