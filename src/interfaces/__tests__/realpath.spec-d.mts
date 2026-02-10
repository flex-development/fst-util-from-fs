/**
 * @file Type Tests - Realpath
 * @module fst-util-from-fs/interfaces/tests/unit-d/Realpath
 */

import type TestSubject from '#interfaces/realpath'
import type { Awaitable } from '@flex-development/fst-util-from-fs'

describe('unit-d:interfaces/Realpath', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [URL | string]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[URL | string]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<string>', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Awaitable<string>>()
    })
  })
})
