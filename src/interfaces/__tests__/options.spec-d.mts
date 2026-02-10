/**
 * @file Type Tests - Options
 * @module fst-util-from-fs/interfaces/tests/unit-d/Options
 */

import type TestSubject from '#interfaces/options'
import type {
  Extensions,
  FileSystem,
  Filters,
  GetFileSystemEntries,
  Handles,
  Sort,
  ToVisitKey,
  VisitMap
} from '@flex-development/fst-util-from-fs'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/Options', () => {
  it('should match [depth?: number | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('depth')
      .toEqualTypeOf<Nilable<number>>
  })

  it('should match [extensions?: Extensions | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('extensions')
      .toEqualTypeOf<Nilable<Extensions>>
  })

  it('should match [filters?: Filters | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('filters')
      .toEqualTypeOf<Nilable<Filters>>
  })

  it('should match [fs?: FileSystem | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fs')
      .toEqualTypeOf<Nilable<FileSystem>>
  })

  it('should match [getFileSystemEntries?: GetFileSystemEntries | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('getFileSystemEntries')
      .toEqualTypeOf<Nilable<GetFileSystemEntries>>
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

  it('should match [visitKey?: ToVisitKey | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('visitKey')
      .toEqualTypeOf<Nilable<ToVisitKey>>
  })

  it('should match [visited?: VisitMap | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('visited')
      .toEqualTypeOf<Nilable<VisitMap>>
  })
})
