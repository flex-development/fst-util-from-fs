/**
 * @file Type Tests - Filter
 * @module fst-util-from-fs/types/tests/unit-d/Filter
 */

import type TestSubject from '#types/filter'

describe('unit-d:types/Filter', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [string]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[string]>()
    })
  })

  describe('returns', () => {
    it('should return boolean', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<boolean>()
    })
  })
})
