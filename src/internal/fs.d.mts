declare module '#internal/fs' {
  import type { FileSystem } from '@flex-development/fst-util-from-fs'

  /**
   * The file system API.
   *
   * @internal
   *
   * @const {FileSystem} fs
   */
  const fs: FileSystem

  export default fs
}
