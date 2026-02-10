/**
 * @file Type Tests - Readdir
 * @module fst-util-from-fs/interfaces/tests/unit-d/Readdir
 */

import type TestSubject from '#interfaces/readdir'
import type {
  Awaitable,
  Dirent,
  ReaddirDirentOptions
} from '@flex-development/fst-util-from-fs'

describe('unit-d:interfaces/Readdir', () => {
  it('should match [this: unknown]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<unknown>()
  })

  describe('parameters', () => {
    it('should be callable with [URL | string, ReaddirDirentOptions]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[URL | string, ReaddirDirentOptions]>()
    })
  })

  describe('returns', () => {
    it('should return Awaitable<readonly Dirent[]>', () => {
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<Awaitable<readonly Dirent[]>>()
    })
  })
})
