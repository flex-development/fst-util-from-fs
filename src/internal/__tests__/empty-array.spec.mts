/**
 * @file Unit Tests - emptyArray
 * @module fst-util-from-fs/internal/tests/unit/emptyArray
 */

import testSubject from '#internal/empty-array'

describe('unit:internal/emptyArray', () => {
  it('should be empty readonly array', () => {
    expect(testSubject).to.be.frozen.and.satisfy(Array.isArray)
    expect(testSubject).to.be.of.length(0)
  })
})
