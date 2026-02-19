/**
 * @file Unit Tests - getFileSystemEntries
 * @module fst-util-from-fs/utils/tests/unit/getFileSystemEntries
 */

import fsa from '#fixtures/fsa'
import constant from '#internal/constant'
import emptyFileSystemEntries from '#internal/empty-file-system-entries'
import dfs from '#internal/fs'
import fsCaseType, { type FileSystemCaseType } from '#tests/utils/fs-case-type'
import testSubject from '#utils/get-file-system-entries'
import type {
  Awaitable,
  Dirent,
  FileSystem,
  Readdir,
  ReaddirDirentOptions,
  Stats
} from '@flex-development/fst-util-from-fs'
import pathe from '@flex-development/pathe'
import { isThenable } from '@flex-development/when'
import { ok } from 'devlop'
import type { MockedFunction } from 'vitest'

describe('unit:utils/getFileSystemEntries', () => {
  describe.each<[fst: FileSystemCaseType, fs: FileSystem]>([
    [fsCaseType.default, dfs],
    [fsCaseType.onlyAsync, fsa]
  ])('fs (%s)', (fsType, fs) => {
    type Case = Parameters<typeof testSubject>

    let badContent: Dirent[]
    let badfile: string
    let content: Dirent[]
    let directories: readonly string[]
    let files: readonly string[]
    let isAsync: boolean
    let readOptions: ReaddirDirentOptions
    let readdir: MockedFunction<Readdir>
    let symlink: string

    beforeAll(() => {
      content = []
      isAsync = fs === fsa
      readOptions = { withFileTypes: true }

      directories = Object.freeze(['A', 'B', 'C', 'D', 'E'])
      files = Object.freeze(['a', 'b', 'c', 'd', 'e', 'f', 's'])

      badfile = 'badfile'
      symlink = files.at(-1)!

      for (const name of directories) {
        content.push({
          isDirectory: constant(true),
          isFile: constant(false),
          isSymbolicLink: constant(false),
          name
        })
      }

      for (const name of files) {
        content.push({
          isDirectory: constant(false),
          isFile: constant(true),
          isSymbolicLink: constant(name === files.at(-1)),
          name
        })
      }

      badContent = [
        ...content,
        {
          isDirectory: constant(false),
          isFile: constant(true),
          isSymbolicLink: constant(true),
          name: badfile
        }
      ]

      content.push({
        isDirectory: constant(false),
        isFile: constant(false),
        isSymbolicLink: constant(false),
        name: 'unknown'
      })
    })

    beforeEach(() => {
      readdir = vi.spyOn(fs, 'readdir')

      vi.spyOn(fs, 'stat').mockImplementation(id => {
        id = String(id)

        if (id.endsWith(badfile)) {
          /**
           * The stats error.
           *
           * @const {Error} error
           */
          const error: Error = new Error(badfile)

          if (!isAsync) throw error
          return new Promise((resolve, reject) => reject(error))
        }

        ok(id.endsWith(symlink), 'expected symlink `id`')
        const { isDirectory, isFile } = content.at(-2)!

        /**
         * The stats object.
         *
         * @const {Stats} stats
         */
        const stats: Stats = { isDirectory, isFile }

        return !isAsync ? stats : new Promise(resolve => resolve(stats))
      })
    })

    it.each<Case>([
      [null],
      [pathe.cwd()]
    ])('should return empty record on error (%#)', async parent => {
      // Setup
      readdir.mockImplementationOnce((): Awaitable<Dirent[]> => {
        if (!parent) {
          if (isAsync) return new Promise(resolve => resolve(badContent))
          return badContent
        }

        /**
         * The read error.
         *
         * @const {Error} error
         */
        const error: Error = new Error()

        if (!isAsync) throw error
        return new Promise((resolve, reject) => reject(error))
      })

      // Arrange
      const path: string = parent ? pathe.toPath(parent) : pathe.dot

      // Act
      let result = testSubject(parent, fs)

      // Expect (promises)
      if (isAsync) {
        expect(result).to.satisfy(isThenable), result = await result
      } else {
        expect(result).to.not.satisfy(isThenable)
      }

      // Expect (other checks)
      expect(readdir).toHaveBeenCalledTimes(1)
      expect(readdir.mock.lastCall![0]).to.eq(path)
      expect(readdir.mock.lastCall![1]).to.eql(readOptions)
      expect(result).to.eq(emptyFileSystemEntries)
    })

    it.each<Case>([
      [null],
      [pathe.cwd()],
      [pathe.pathToFileURL(pathe.cwd())]
    ])('should return file system entries record (%#)', async parent => {
      // Setup
      readdir.mockImplementationOnce((): Awaitable<Dirent[]> => {
        return isAsync ? new Promise(resolve => resolve(content)) : content
      })

      // Arrange
      const path: string = parent ? pathe.toPath(parent) : pathe.dot

      // Act
      let result = testSubject(parent, fs)

      // Expect (promises)
      if (isAsync) {
        expect(result).to.satisfy(isThenable), result = await result
      } else {
        expect(result).to.not.satisfy(isThenable)
      }

      ok(!isThenable(result), 'expected file system entries record')

      // Expect (other checks)
      expect(readdir).toHaveBeenCalledTimes(1)
      expect(readdir.mock.lastCall![0]).to.eq(path)
      expect(readdir.mock.lastCall![1]).to.eql(readOptions)
      expect(result).to.have.keys(['directories', 'files'])
      expect(result).to.not.be.frozen
      expect(result).toMatchSnapshot()
    })
  })
})
