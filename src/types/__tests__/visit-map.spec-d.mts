/**
 * @file Type Tests - VisitMap
 * @module fst-util-from-fs/types/tests/unit-d/VisitMap
 */

import type TestSubject from '#types/visit-map'

describe('unit-d:types/VisitMap', () => {
  it('should extract Map<string | null, boolean>', () => {
    expectTypeOf<TestSubject>()
      .extract<Map<string | null, boolean>>()
      .not.toBeNever()
  })

  it('should extract WeakMap<WeakKey, boolean>', () => {
    expectTypeOf<TestSubject>()
      .extract<WeakMap<WeakKey, boolean>>()
      .not.toBeNever()
  })
})
