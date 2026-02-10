/**
 * @file eslint
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

import fldv from '@flex-development/eslint-config'

/**
 * eslint configuration.
 *
 * @type {import('eslint').Linter.Config[]}
 * @const config
 */
const config = [
  ...fldv.configs.node,
  {
    files: ['__fixtures__/content.json'],
    rules: {
      'jsonc/sort-keys': 0
    }
  },
  {
    files: [
      'src/interfaces/__tests__/buffer-encoding-map.spec-d.mts',
      'src/interfaces/buffer-encoding-map.mts'
    ],
    rules: {
      'unicorn/text-encoding-identifier-case': 0
    }
  },
  {
    files: ['src/internal/__tests__/is-promise.spec.mts'],
    rules: {
      'unicorn/no-thenable': 0
    }
  },
  {
    files: [
      'src/__tests__/util.spec.mts',
      'src/internal/chain-or-call.mts',
      'src/internal/visit-directory.mts',
      'src/utils/get-file-system-entries.mts'
    ],
    rules: {
      'promise/prefer-await-to-then': 0
    }
  },
  {
    files: [
      'src/utils/__tests__/get-file-system-entries.spec.mts',
      'src/utils/get-file-system-entries.mts'
    ],
    rules: {
      '@typescript-eslint/promise-function-async': 0
    }
  }
]

export default config
