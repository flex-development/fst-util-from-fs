/**
 * @file Type Tests - GetFileSystemEntries
 * @module fst-util-from-fs/types/tests/unit-d/GetFileSystemEntries
 */

import type TestSubject from '#types/get-file-system-entries'
import type {
  Awaitable,
  FileSystem,
  FileSystemEntries
} from '@flex-development/fst-util-from-fs'

describe('unit-d:types/GetFileSystemEntries', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [URL | string, FileSystem]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[URL | string, FileSystem]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<FileSystemEntries>', () => {
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<Awaitable<FileSystemEntries>>()
    })
  })
})
