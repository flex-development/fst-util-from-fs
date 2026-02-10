/**
 * @file E2E Tests - utils
 * @module fst-util-from-fs/utils/tests/e2e/api
 */

import * as testSubject from '@flex-development/fst-util-from-fs/utils'

describe('e2e:fst-util-from-fs/utils', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
