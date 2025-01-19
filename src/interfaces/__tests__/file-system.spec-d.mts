/**
 * @file Type Tests - FileSystem
 * @module fst-util-from-fs/interfaces/tests/unit-d/FileSystem
 */

import type TestSubject from '#interfaces/file-system'
import type { Dirent } from '@flex-development/fst-util-from-fs'

describe('unit-d:interfaces/FileSystem', () => {
  describe('readFileSync', () => {
    type Subject = NonNullable<TestSubject['readFileSync']>

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [string, "utf8"]', () => {
        expectTypeOf<Subject>().parameters.toEqualTypeOf<[string, 'utf8']>()
      })
    })

    describe('returns', () => {
      it('should return string', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<string>()
      })
    })
  })

  describe('readdirSync', () => {
    type Subject = TestSubject['readdirSync']

    it('should match [this: void]', () => {
      expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
    })

    describe('parameters', () => {
      it('should be callable with [string, { withFileTypes: true }]', () => {
        expectTypeOf<Subject>()
          .parameters
          .toEqualTypeOf<[string, { withFileTypes: true }]>()
      })
    })

    describe('returns', () => {
      it('should return readonly Dirent[]', () => {
        expectTypeOf<Subject>().returns.toEqualTypeOf<readonly Dirent[]>()
      })
    })
  })
})
