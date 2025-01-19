/**
 * @file E2E Tests - api
 * @module fst-util-from-fs/tests/e2e/api
 */

import * as testSubject from '@flex-development/fst-util-from-fs'

describe('e2e:fst-util-from-fs', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
