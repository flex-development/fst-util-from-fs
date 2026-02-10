declare module '#fixtures/content.json' {
  /**
   * An object representing a directory.
   */
  interface DirectoryJson {
    [key: string]: DirectoryJson | string
  }

  /**
   * Mock directory content.
   *
   * @const {DirectoryJson} content
   */
  const content: DirectoryJson

  export { content as default, type DirectoryJson }
}
