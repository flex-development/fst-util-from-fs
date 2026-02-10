/**
 * @file Unit Tests - withTrailingSlash
 * @module fst-util-from-fs/internal/tests/unit/withTrailingSlash
 */

import testSubject from '#internal/with-trailing-slash'
import pathe from '@flex-development/pathe'
import { equal } from 'devlop'

describe('unit:internal/withTrailingSlash', () => {
  let slashes: string
  let url: URL

  beforeAll(() => {
    url = pathe.pathToFileURL(pathe.cwd())
    url.href += slashes = pathe.sep.repeat(2)
    equal(url.href.slice(-2), slashes, 'expected `2` slashes')
  })

  it('should return `value` with one trailing slash', () => {
    // Act
    const result = testSubject(url)

    // Expect
    expect(result).to.eq(url)
    expect({ href: result.href, pathname: result.pathname }).toMatchSnapshot()
  })
})
