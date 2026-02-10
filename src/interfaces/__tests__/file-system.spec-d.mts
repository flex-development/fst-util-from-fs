/**
 * @file Type Tests - FileSystem
 * @module fst-util-from-fs/interfaces/tests/unit-d/FileSystem
 */

import type TestSubject from '#interfaces/file-system'
import type {
  Readdir,
  Realpath,
  Stat
} from '@flex-development/fst-util-from-fs'

describe('unit-d:interfaces/FileSystem', () => {
  it('should match [readdir: Readdir]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('readdir')
      .toEqualTypeOf<Readdir>()
  })

  it('should match [realpath: Realpath]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('realpath')
      .toEqualTypeOf<Realpath>()
  })

  it('should match [stat: Stat]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('stat').toEqualTypeOf<Stat>()
  })
})
