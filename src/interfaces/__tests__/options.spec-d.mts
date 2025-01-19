/**
 * @file Type Tests - Options
 * @module fst-util-from-fs/interfaces/tests/unit-d/Options
 */

import type TestSubject from '#interfaces/options'
import type {
  FileSystem,
  Filters,
  Handles,
  Sort
} from '@flex-development/fst-util-from-fs'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/Options', () => {
  it('should match [content?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('content')
      .toEqualTypeOf<Nilable<boolean>>
  })

  it('should match [depth?: number | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('depth')
      .toEqualTypeOf<Nilable<number>>
  })

  it('should match [extensions?: Set<string> | readonly string[] | string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('extensions')
      .toEqualTypeOf<Nilable<Set<string> | readonly string[] | string>>
  })

  it('should match [filters?: Filters | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('filters')
      .toEqualTypeOf<Nilable<Filters>>
  })

  it('should match [fs?: Partial<FileSystem> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fs')
      .toEqualTypeOf<Nilable<Partial<FileSystem>>>
  })

  it('should match [handles?: Handles | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('handles')
      .toEqualTypeOf<Nilable<Handles>>
  })

  it('should match [root?: URL | string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('root')
      .toEqualTypeOf<Nilable<URL | string>>
  })

  it('should match [sort?: Sort | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('sort')
      .toEqualTypeOf<Nilable<Sort>>
  })
})
