/**
 * @file Type Tests - Handle
 * @module fst-util-from-fs/types/tests/unit-d/Handle
 */

import type TestSubject from '#types/handle'
import type { Child, AnyParent as Parent, Root } from '@flex-development/fst'
import type {
  Awaitable,
  Dirent,
  FileSystem
} from '@flex-development/fst-util-from-fs'

describe('unit-d:types/Handle', () => {
  it('should match [this: void]', () => {
    expectTypeOf<TestSubject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with [T, Dirent, AnyParent, Root, AnyParent[], FileSystem]', () => {
      expectTypeOf<TestSubject>()
        .parameters
        .toEqualTypeOf<[Child, Dirent, Parent, Root, Parent[], FileSystem]>()
    })
  })

  describe('returns', () => {
    it('should return Result', () => {
      expectTypeOf<TestSubject>()
        .returns
        .toEqualTypeOf<Awaitable<null | undefined | void>>()
    })
  })
})
