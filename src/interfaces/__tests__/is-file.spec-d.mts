/**
 * @file Type Tests - IsFile
 * @module fst-util-from-fs/interfaces/tests/unit-d/IsFile
 */

import type TestSubject from '#interfaces/is-file'

describe('unit-d:interfaces/IsFile', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[]>()
    })
  })

  describe('returns', () => {
    it('should return boolean', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<boolean>()
    })
  })
})
