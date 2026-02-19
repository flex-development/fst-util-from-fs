/**
 * @file Unit Tests - fromFileSystem
 * @module fst-util-from-fs/tests/unit/fromFileSystem
 */

import content from '#fixtures/content.json'
import fsa from '#fixtures/fsa'
import constant from '#internal/constant'
import emptyFileSystemEntries from '#internal/empty-file-system-entries'
import withTrailingSlash from '#internal/with-trailing-slash'
import volume from '#tests/setup/volume'
import flattenContent, {
  type FlattenContentResult
} from '#tests/utils/flatten-content'
import fsCaseType, { type FileSystemCaseType } from '#tests/utils/fs-case-type'
import testSubject from '#util'
import getFileSystemEntries from '#utils/get-file-system-entries'
import type {
  Directory,
  File,
  AnyParent as Parent,
  Root
} from '@flex-development/fst'
import type {
  Awaitable,
  Dirent,
  FileSystem,
  FileSystemEntries,
  Options
} from '@flex-development/fst-util-from-fs'
import pathe from '@flex-development/pathe'
import { count, type Predicate } from '@flex-development/tutils'
import { inspectNoColor } from '@flex-development/unist-util-inspect'
import { visit } from '@flex-development/unist-util-visit'
import { isThenable } from '@flex-development/when'
import { ok } from 'devlop'
import type { Node } from 'unist'
import { size } from 'unist-util-size'
import tsconfigBuild from '../../tsconfig.build.json'

vi.mock('node:fs')

describe('unit:fromFileSystem', () => {
  describe.each<[fst: FileSystemCaseType, fs?: FileSystem | null | undefined]>([
    [fsCaseType.default],
    [fsCaseType.onlyAsync, fsa]
  ])('fs (%s)', (fsType, fs) => {
    type Case = Parameters<typeof testSubject>

    type Hooks = {
      /**
       * After tree creation hook.
       *
       * @this {void}
       *
       * @param {Root} result
       *  The file system tree
       * @param {number} size
       *  The number of nodes in the tree
       * @param {number} directories
       *  The number of directory nodes in the tree
       * @param {number} files
       *  The number of file nodes in the tree
       * @param {Options | null | undefined} options
       *  The options used for tree creation
       * @return {Awaitable<undefined>}
       */
      after?(
        this: void,
        result: Root,
        size: number,
        directories: number,
        files: number,
        options: Options | null | undefined
      ): Awaitable<undefined>

      /**
       * Before tree creation hook.
       *
       * @this {void}
       *
       * @param {Options | null | undefined} options
       *  Options for tree creation
       * @return {Awaitable<undefined>}
       */
      before?(
        this: void,
        options: Options | null | undefined
      ): Awaitable<undefined>
    }

    let flat: FlattenContentResult
    let isAsync: boolean
    let isDirectory: Predicate<[Node]>
    let isFile: Predicate<[Node]>

    beforeAll(() => {
      isAsync = fs === fsa

      flat = flattenContent(content)
      isDirectory = (node: Node): boolean => node.type === 'directory'
      isFile = (node: Node): boolean => node.type === 'file'
    })

    it.each<Case>([
      [
        {
          depth: -1
        }
      ],
      [
        {
          depth: 0,
          root: pathe.pathToFileURL(pathe.dot)
        }
      ],
      [
        {
          filters: {
            directory: vi.fn(constant(false)),
            file: vi.fn(constant(false))
          }
        }
      ],
      [
        {
          getFileSystemEntries: vi.fn((): Awaitable<FileSystemEntries> => {
            if (!isAsync) return emptyFileSystemEntries
            return new Promise(resolve => resolve(emptyFileSystemEntries))
          })
        }
      ],
      [
        {
          visited: Object.assign(new Map(), { has: constant(true) })
        }
      ]
    ])('should return empty tree (%#)', async options => {
      // Act
      let result = testSubject({ ...options, fs })
      if (isAsync) result = await result

      ok(!isThenable(result), 'expected `result` to be resolved')

      // Expect
      expect(result).to.have.property('children').be.an('array')
      expect(result).to.have.property('path', pathe.cwd() + pathe.sep)
      expect(result).to.have.property('type', 'root')
      expect(size(result)).to.eq(0)
    })

    it.each<Case>([
      [],
      [
        {
          depth: null
        }
      ],
      [
        {
          filters: {
            directory: vi.fn(constant(true)),
            file: vi.fn(constant(true))
          }
        }
      ],
      [
        {
          getFileSystemEntries: vi.fn(getFileSystemEntries)
        }
      ]
    ])('should return full tree (%#)', async options => {
      // Act
      let result = testSubject({ ...options, fs })
      if (isAsync) result = await result

      ok(!isThenable(result), 'expected `result` to be resolved')

      // Expect
      expect(result).to.have.property('children').be.an('array')
      expect(result).to.have.property('path', pathe.cwd() + pathe.sep)
      expect(result).to.have.property('type', 'root')
      expect(size(result)).to.eq(flat.size)
      expect(size(result, isDirectory)).to.eq(flat.directories.size)
      expect(size(result, isFile)).to.eq(flat.files.size)
    })

    it.each<[...Case, Hooks?]>([
      [
        {
          depth: 1
        },
        {
          /**
           * @this {void}
           *
           * @param {Root} result
           *  The file system tree
           * @param {number} size
           *  The number of nodes in the tree
           * @param {number} directories
           *  The number of directory nodes in the tree
           * @param {number} files
           *  The number of file nodes in the tree
           * @return {undefined}
           */
          after(
            this: void,
            result: Root,
            size: number,
            directories: number,
            files: number
          ): undefined {
            /**
             * The number of expected file nodes.
             *
             * @const {number} filesExpected
             */
            const filesExpected: number = count(Object.values(content), v => {
              return typeof v === 'string'
            })

            expect(size).to.not.eq(flat.size)
            expect(directories).to.eq(0)
            expect(files).to.eq(filesExpected)
            expect(files).to.not.eq(flat.files.size)

            return void result
          }
        }
      ],
      [
        {
          depth: 5,
          extensions: '.mts',
          filters: {
            /**
             * @this {void}
             *
             * @param {string} path
             *  The path to the entry, relative to `tree.path`
             * @return {boolean}
             *  `true` if node for `path` should be added, `false` otherwise
             */
            directory(this: void, path: string): boolean {
              return pathe.matchesGlob(path, ['src/**/**'], {
                dot: false,
                ignore: [...tsconfigBuild.exclude, '**/__snapshots__/**'],
                noglobstar: false
              })
            },
            /**
             * @this {void}
             *
             * @param {string} path
             *  The path to the entry, relative to `tree.path`
             * @return {boolean}
             *  `true` if node for `path` should be added, `false` otherwise
             */
            file(this: void, path: string): boolean {
              return pathe.matchesGlob(path, ['src/**/**'], {
                dot: true,
                ignore: [...tsconfigBuild.exclude, '**/.DS_Store'],
                noglobstar: false
              })
            }
          },
          handles: {
            /**
             * @this {void}
             *
             * @param {Directory} node
             *  The directory node
             * @param {Dirent} dirent
             *  The dirent representing the file
             * @param {Parent} parent
             *  The parent of `node`
             * @param {Root} tree
             *  The file system tree
             * @return {Awaitable<undefined>}
             *  Nothing
             */
            directory(
              this: void,
              node: Directory,
              dirent: Dirent,
              parent: Parent,
              tree: Root
            ): Awaitable<undefined> {
              if (isAsync) return new Promise(resolve => resolve(void tree))
              return void tree
            },

            /**
             * @this {void}
             *
             * @param {File} node
             *  The file node
             * @param {Dirent} dirent
             *  The dirent representing the file
             * @param {Parent} parent
             *  The parent of `node`
             * @param {Root} tree
             *  The file system tree
             * @param {Parent[]} ancestors
             *  The ancestors of `node`
             * @return {Awaitable<undefined>}
             *  Nothing
             */
            file(
              this: void,
              node: File,
              dirent: Dirent,
              parent: Parent,
              tree: Root,
              ancestors: Parent[]
            ): Awaitable<undefined> {
              /**
               * The list of paths.
               *
               * @const {string[]} paths
               */
              const paths: string[] = [...ancestors.slice(1), node].map(n => {
                ok(n.type !== 'root', 'did not expect tree')
                return n.name
              })

              /**
               * The file path.
               *
               * @const {string} path
               */
              const path: string = paths.join(pathe.sep)

              /**
               * The encoding used to read files.
               *
               * @const {BufferEncoding} encoding
               */
              const encoding: BufferEncoding = 'utf8'

              if (!isAsync) {
                node.value = volume.readFileSync(path, encoding) as string
                return void node.value
              }

              return volume.promises.readFile(path, encoding).then(value => {
                node.value = value as string
                return void value
              })
            }
          }
        }
      ]
    ])('should return non-empty filtered tree (%#)', async (options, hooks) => {
      // Setup
      await hooks?.before?.(options)

      // Arrange
      const root: URL | string = options?.root ?? pathe.cwd()
      const path: string = withTrailingSlash(pathe.toPath(root))
      let directories: number
      let files: number
      let total: number

      // Act
      let result = testSubject({ ...options, fs })

      // Expect (promises)
      if (isAsync) {
        expect(result).to.satisfy(isThenable), result = await result
      } else {
        expect(result).to.not.satisfy(isThenable)
      }

      ok(!isThenable(result), 'expected `result` to be resolved')
      directories = size(result, isDirectory)
      files = size(result, isFile)
      total = size(result)

      // Expect (tree properties)
      expect(result).to.have.property('children').be.an('array')
      expect(result).to.have.property('path', path)
      expect(result).to.have.property('type', 'root')
      expect(total).to.not.eq(flat.size)

      // Expect (visit)
      visit(result, (node, index, parent, ancestors): undefined => {
        if (node.type !== 'root') {
          ok(parent, 'expected `parent`')

          /**
           * The list of directory names.
           *
           * @const {string[]} directories
           */
          const directories: string[] = ancestors.slice(1).map(node => {
            ok(node.type !== 'root', 'did not expect tree')
            return node.name
          })

          // add parent directory name.
          if (parent.type === 'directory') directories.push(parent.name)

          /**
           * The path to the current node.
           *
           * @const {string} path
           */
          const path: string = [...directories, node.name].join(pathe.sep)

          if (node.type === 'directory') {
            expect(flat.directories.has(path)).to.be.true
            expect(flat.files.has(path)).to.be.false
          } else {
            expect(flat.directories.has(path)).to.be.false
            expect(flat.files.has(path)).to.be.true
          }
        }

        return void node
      })

      // Expect (after)
      await hooks?.after?.(result, total, directories, files, options)

      // Expect (snapshot)
      expect(inspectNoColor(result)).toMatchSnapshot()
    })
  })
})
