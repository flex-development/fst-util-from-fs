/**
 * @file Type Tests - FileSystemEntries
 * @module fst-util-from-fs/interfaces/tests/unit-d/FileSystemEntries
 */

import type TestSubject from '#interfaces/file-system-entries'
import type { Dirent } from '@flex-development/fst-util-from-fs'

describe('unit-d:interfaces/FileSystemEntries', () => {
  type List = readonly Dirent[]

  it('should match [directories: Dirent string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('directories')
      .toEqualTypeOf<List>()
  })

  it('should match [files: readonly Dirent[]]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('files').toEqualTypeOf<List>()
  })
})
