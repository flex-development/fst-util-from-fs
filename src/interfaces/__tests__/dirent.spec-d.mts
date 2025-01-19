/**
 * @file Type Tests - Dirent
 * @module fst-util-from-fs/interfaces/tests/unit-d/Dirent
 */

import type TestSubject from '#interfaces/dirent'
import type { EmptyArray } from '@flex-development/tutils'

describe('unit-d:interfaces/Dirent', () => {
  it('should match [name: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })

  describe('isDirectory', () => {
    type Subject = TestSubject['isDirectory']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with []', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<EmptyArray>()
      })
    })

    describe('returns', () => {
      it('should return boolean', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<boolean>()
      })
    })
  })
})
