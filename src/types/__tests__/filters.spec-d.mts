/**
 * @file Type Tests - Filters
 * @module fst-util-from-fs/types/tests/unit-d/Filters
 */

import type TestSubject from '#types/filters'
import type { Filter } from '@flex-development/fst-util-from-fs'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:types/Filters', () => {
  it('should match [directory?: Filter | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('directory')
      .toEqualTypeOf<Nilable<Filter>>
  })

  it('should match [file?: Filter | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('file')
      .toEqualTypeOf<Nilable<Filter>>
  })
})
