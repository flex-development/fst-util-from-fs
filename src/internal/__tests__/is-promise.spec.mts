/**
 * @file Unit Tests - isPromise
 * @module mlly/internal/tests/unit/isPromise
 */

import testSubject from '#internal/is-promise'
import pathe from '@flex-development/pathe'

describe('unit:internal/isPromise', () => {
  it.each<Parameters<typeof testSubject>>([
    [null],
    [pathe.cwd()],
    [{ then: pathe.cwd() }]
  ])('should return `false` if `value` is not promise-like (%#)', value => {
    expect(testSubject(value)).to.be.false
  })

  it.each<Parameters<typeof testSubject>>([
    [new Promise(vi.fn())],
    [{ then: vi.fn() }]
  ])('should return `true` if `value` is promise-like (%#)', value => {
    expect(testSubject(value)).to.be.true
  })
})
