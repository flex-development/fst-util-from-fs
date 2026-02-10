/**
 * @file Test Setup - volume
 * @module tests/setup/volume
 */

import content from '#fixtures/content.json' with { type: 'json' }
import { vol } from 'memfs'

vol.fromNestedJSON(content)
export default vol
