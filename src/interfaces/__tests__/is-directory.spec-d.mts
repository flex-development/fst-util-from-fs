/**
 * @file Type Tests - IsDirectory
 * @module fst-util-from-fs/interfaces/tests/unit-d/IsDirectory
 */

import type TestSubject from '#interfaces/is-directory'

describe('unit-d:interfaces/IsDirectory', () => {
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
