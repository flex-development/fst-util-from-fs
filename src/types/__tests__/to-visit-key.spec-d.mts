/**
 * @file Type Tests - ToVisitKey
 * @module fst-util-from-fs/types/tests/unit-d/ToVisitKey
 */

import type TestSubject from '#types/to-visit-key'
import type { AnyParent as Parent, Root } from '@flex-development/fst'
import type { Options } from '@flex-development/fst-util-from-fs'
import type { Nullable } from '@flex-development/tutils'

describe('unit-d:types/ToVisitKey', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [string, string | null, AnyParent, Root, Options]', () => {
      // Arrange
      type Expect = [string, string | null, Parent, Root, Options]

      // Expect
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<Expect>()
    })
  })

  describe('returns', () => {
    it('should return WeakKey | string | null', () => {
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<Nullable<WeakKey | string>>()
    })
  })
})
