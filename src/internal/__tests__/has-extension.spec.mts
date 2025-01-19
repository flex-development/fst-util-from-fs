/**
 * @file Unit Tests - hasExtension
 * @module fst-util-from-fs/internal/tests/unit/hasExtension
 */

import testSubject from '#internal/has-extension'
import pathe from '@flex-development/pathe'

describe('unit:internal/hasExtension', () => {
  it('should return `false` if `x` does not pass `extensions` filter', () => {
    expect(testSubject('index.cts', 'mts')).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [import.meta.url, ['spec-d.mts', 'spec.mts']],
    [pathe.resolve('src/index.mts'), 'mts']
  ])('should return `true` if `x` passes `extensions` filter` (%#)', (
    x,
    extensions
  ) => {
    expect(testSubject(x, extensions)).to.be.true
  })

  it.each<Parameters<typeof testSubject>>([
    [import.meta.url, null],
    [pathe.resolve('src/index.mts'), []]
  ])('should return `true` if no `extensions` are provided (%#)', (
    x,
    extensions
  ) => {
    expect(testSubject(x, extensions)).to.be.true
  })
})
