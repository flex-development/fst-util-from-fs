/**
 * @file Type Tests - Stat
 * @module fst-util-from-fs/interfaces/tests/unit-d/Stat
 */

import type TestSubject from '#interfaces/stat'
import type { Awaitable, Stats } from '@flex-development/fst-util-from-fs'

describe('unit-d:interfaces/Stat', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [URL | string]', () => {
      expectTypeOf<TestSubject>().parameters.toEqualTypeOf<[URL | string]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<Stats>', () => {
      expectTypeOf<TestSubject>().returns.toEqualTypeOf<Awaitable<Stats>>()
    })
  })
})
