/**
 * @file Type Tests - Filter
 * @module fst-util-from-fs/types/tests/unit-d/Filter
 */

import type TestSubject from '#types/filter'
import type { AnyParent as Parent, Root } from '@flex-development/fst'
import type { Dirent } from '@flex-development/fst-util-from-fs'

describe('unit-d:types/Filter', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [string, number | null | undefined, Dirent, AnyParent, Root]', () => {
      // Arrange
      type Expect = [string, number | null | undefined, Dirent, Parent, Root]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<Expect>()
    })
  })

  describe('returns', () => {
    it('should return boolean', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<boolean>()
    })
  })
})
