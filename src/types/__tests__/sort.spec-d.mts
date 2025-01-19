/**
 * @file Type Tests - Sort
 * @module fst-util-from-fs/types/tests/unit-d/Sort
 */

import type TestSubject from '#types/sort'
import type { Child } from '@flex-development/fst'

describe('unit-d:types/Sort', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [Child, Child]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[Child, Child]>()
    })
  })

  describe('returns', () => {
    it('should return number', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<number>()
    })
  })
})
