/**
 * @file Type Tests - Handles
 * @module fst-util-from-fs/types/tests/unit-d/Handles
 */

import type TestSubject from '#types/handles'
import type { Directory, File } from '@flex-development/fst'
import type { Handle } from '@flex-development/fst-util-from-fs'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:types/Handles', () => {
  it('should match [directory?: Handle<Directory> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('directory')
      .toEqualTypeOf<Nilable<Handle<Directory>>>
  })

  it('should match [file?: Handle<File> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('file')
      .toEqualTypeOf<Nilable<Handle<File>>>
  })
})
