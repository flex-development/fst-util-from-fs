/**
 * @file Type Tests - Extensions
 * @module fst-util-from-fs/types/tests/unit-d/Extensions
 */

import type TestSubject from '#types/extensions'
import type { List } from '@flex-development/fst-util-from-fs'

describe('unit-d:types/Extensions', () => {
  it('should extract List<string>', () => {
    expectTypeOf<TestSubject>().extract<List<string>>().not.toBeNever()
  })

  it('should extract string', () => {
    expectTypeOf<TestSubject>().extract<string>().not.toBeNever()
  })
})
