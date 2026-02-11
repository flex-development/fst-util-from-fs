/**
 * @file Type Tests - FileSystemEntries
 * @module fst-util-from-fs/interfaces/tests/unit-d/FileSystemEntries
 */

import type TestSubject from '#interfaces/file-system-entries'
import type { Dirent, List } from '@flex-development/fst-util-from-fs'

describe('unit-d:interfaces/FileSystemEntries', () => {
  type Expect = List<Dirent>

  it('should match [directories: List<Dirent>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('directories')
      .toEqualTypeOf<Expect>()
  })

  it('should match [files: List<Dirent>]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('files').toEqualTypeOf<Expect>()
  })
})
