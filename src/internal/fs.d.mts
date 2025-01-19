declare module '#internal/fs' {
  import type { FileSystem } from '@flex-development/fst-util-from-fs'

  /**
   * File system API.
   *
   * @internal
   *
   * @const {Required<FileSystem>} fs
   */
  const fs: Required<FileSystem>

  export default fs
}
