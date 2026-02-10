/**
 * @file Type Tests - Stats
 * @module fst-util-from-fs/interfaces/tests/unit-d/Stats
 */

import type TestSubject from '#interfaces/stats'
import type { IsDirectory, IsFile } from '@flex-development/fst-util-from-fs'

describe('unit-d:interfaces/Stats', () => {
  it('should match [isDirectory: IsDirectory]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('isDirectory')
      .toEqualTypeOf<IsDirectory>()
  })

  it('should match [isFile: IsFile]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('isFile')
      .toEqualTypeOf<IsFile>()
  })
})
