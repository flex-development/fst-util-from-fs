/**
 * @file Type Tests - Extensions
 * @module fst-util-from-fs/types/tests/unit-d/Extensions
 */

import type TestSubject from '#types/extensions'

describe('unit-d:types/Extensions', () => {
  it('should extract Set<string>', () => {
    expectTypeOf<TestSubject>().extract<Set<string>>().not.toBeNever()
  })

  it('should extract readonly string[]', () => {
    expectTypeOf<TestSubject>().extract<readonly string[]>().not.toBeNever()
  })

  it('should extract string', () => {
    expectTypeOf<TestSubject>().extract<string>().not.toBeNever()
  })
})
