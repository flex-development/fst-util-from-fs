# fst-util-from-fs

[![github release](https://img.shields.io/github/v/release/flex-development/fst-util-from-fs.svg?include_prereleases\&sort=semver)](https://github.com/flex-development/fst-util-from-fs/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/fst-util-from-fs.svg)](https://npmjs.com/package/@flex-development/fst-util-from-fs)
[![npm downloads](https://img.shields.io/npm/dm/@flex-development/fst-util-from-fs.svg)](https://www.npmcharts.com/compare/@flex-development/fst-util-from-fs?interval=30)
[![install size](https://packagephobia.now.sh/badge?p=@flex-development/fst-util-from-fs)](https://packagephobia.now.sh/result?p=@flex-development/fst-util-from-fs)
[![codecov](https://codecov.io/gh/flex-development/fst-util-from-fs/branch/main/graph/badge.svg?token=c7gDtTlaw3)](https://codecov.io/gh/flex-development/fst-util-from-fs)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/fst-util-from-fs.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits\&logoColor=ffffff)](https://conventionalcommits.org)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript\&logoColor=ffffff)](https://typescriptlang.org)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat\&logo=vitest\&logoColor=ffffff)](https://vitest.dev)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat\&logo=yarn\&logoColor=ffffff)](https://yarnpkg.com)

**[fst][]** utility to create trees from file systems

## Contents

- [What is this?](#what-is-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`fromFileSystem([options])`](#fromfilesystemoptions)
- [Types](#types)
  - [`Awaitable<[T]>`](#awaitablet)
  - [`Dirent`](#dirent)
  - [`Extensions`](#extensions)
  - [`FileSystemEntries`](#filesystementries)
  - [`FileSystem`](#filesystem)
  - [`Filter`](#filter)
  - [`Filters`](#filters)
  - [`GetFileSystemEntries<[T]>`](#getfilesystementriest)
  - [`Handle<[T][, Result]>`](#handlet-result)
  - [`Handles`](#handles)
  - [`IsDirectory`](#isdirectory)
  - [`IsFile`](#isfile)
  - [`IsSymbolicLink`](#issymboliclink)
  - [`List<[T]>`](#listt)
  - [`Options`](#options)
  - [`ReaddirDirentOptions`](#readdirdirentoptions)
  - [`ReaddirOptions`](#readdiroptions)
  - [`Readdir`](#readdir)
  - [`Realpath`](#realpath)
  - [`Sort`](#sort)
  - [`Stat`](#stat)
  - [`Stats`](#stats)
  - [`ToVisitKey<[K]>`](#tovisitkeyk)
  - [`VisitMap`](#visitmap)
- [Syntax tree](#syntax-tree)
- [Contribute](#contribute)

## What is this?

This package is a utility to create [file system trees][fst].

This utility uses file system adapters to recursively read a directory, and create a tree from its contents.

## Install

This package is [ESM only][esm].

In Node.js (version 20+) with [yarn][]:

```sh
yarn add @flex-development/fst-util-from-fs
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for details regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import { fromFileSystem } from 'https://esm.sh/@flex-development/fst-util-from-fs'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { fromFileSystem } from 'https://esm.sh/@flex-development/fst-util-from-fs'
</script>
```

## Use

**TODO**: use

## API

This package exports the following identifiers:

- [`fromFileSystem`](#fromfilesystemoptions)

There is no default export.

### `fromFileSystem([options])`

Create a file system tree.

#### Parameters

- `options` ([`Options`](#options), optional) — tree options

#### Returns

([`Root`][fst-root]) file system tree

## Types

This package is fully typed with [TypeScript][].

### `Awaitable<T>`

Create a union of `T` and `T` as a promise-like object (`type`).

```ts
type Awaitable<T> = PromiseLike<T> | T
```

#### Type Parameters

- `T` (`any`)
  — the value

### `Dirent`

Information about a file system entry (`interface`).

This interface can be augmented to register custom methods and properties.

```ts
declare module '@flex-development/fst-util-from-fs' {
  interface Dirent {
    parentPath: string
  }
}
```

#### Properties

- `isDirectory` ([`IsDirectory`](#isdirectory))
  — check if the entry is a directory
- `isFile` ([`IsFile`](#isfile))
  — check if the entry is a file
- `isSymbolicLink` ([`IsSymbolicLink`](#issymboliclink))
  — check if the entry is a symbolic link
- `name` (`string`)
  — the path to the entry, relative to its parent directory

### `Extensions`

Union of options used to filter files by extension (`type`).

```ts
type Extensions = List<string> | string
```

### `FileSystemEntries`

Information about directories and files (`interface`).

#### Properties

- `directories` ([`readonly Dirent[]`](#dirent))
  — the list of directories
- `files` ([`readonly Dirent[]`](#dirent))
  — the list of files

### `FileSystem`

The file system API (`interface`).

#### Properties

- `readdir` ([`Readdir`](#readdir))
  — read the entire contents of a directory
- `realpath` ([`Realpath`](#realpath))
  — compute a canonical pathname by resolving `.`, `..`, and symbolic links
- `stat` ([`Stat`](#stat))
  — get information about a file system entry

### `Filter`

Determine if a node for `path` should be added to the `tree` (`type`).

```ts
type Filter = (
  this: void,
  path: string,
  depth: number | null | undefined,
  dirent: Dirent,
  parent: AnyParent,
  tree: Root
) => boolean
```

#### Parameters

- `path` (`string`)
  — the path to the file system entry, relative to its parent directory
- `depth` (`number` | `null` | `undefined`)
  — the current search depth
- `dirent` ([`Dirent`](#dirent))
  — the dirent representing the file system entry
- `parent` ([`AnyParent`][fst-anyparent])
  — the current parent node
- `tree` ([`Root`][fst-root])
  — the file system tree

#### Returns

(`boolean`) `true` if node for `path` should be added, `false` otherwise

### `Filters`

The filters used to determine if a node should be added to a tree (`interface`).

#### Properties

- `directory` ([`Filter`](#filter) | `null` | `undefined`, optional)
  — determine if a [`Directory`][fst-directory] node should be added to the tree
- `file` ([`Filter`](#filter) | `null` | `undefined`, optional)
  — determine if a [`File`][fst-file] node should be added to the tree

### `GetFileSystemEntries<[T]>`

Get a file system entries record (`type`).

```ts
type GetFileSystemEntries<
  T extends Awaitable<FileSystemEntries> = Awaitable<FileSystemEntries>
> = (
  this: void,
  parent: URL | string,
  fs: FileSystem
) => T
```

#### Type Parameters

- `T` ([`Awaitable<FileSystemEntries>`](#filesystementries))
  — the entries record

#### Parameters

- `parent` (`URL` | `string`)
  — the entry id of the parent directory
- `fs` ([`FileSystem`](#filesystem))
  — the file system api

#### Returns

(`T`) The file system entries record

### `Handle<[T][, Result]>`

Handle a `node` that has been added to the `tree` (`type`).

```ts
type Handle<
  T extends Child = Child,
  Result extends Awaitable<null | undefined | void> = Awaitable<null | undefined | void>
> = (
  this: void,
  node: T,
  dirent: Dirent,
  parent: AnyParent,
  tree: Root,
  ancestors: AnyParent[],
  fs: FileSystem
) => Result
```

#### Type Parameters

- `T` ([`Child`][fst-child], optional)
  — the [fst][] node
- `Result` ([`Awaitable<null | undefined | void>`](#awaitablet), optional)
  — the result of the handle

#### Parameters

- `node` (`T`)
  — the node representing the file system entry
- `dirent` ([`Dirent`](#dirent))
  — the dirent representing the file system entry
- `parent` ([`AnyParent`][fst-anyparent])
  — the parent of `node`
- `tree` ([`Root`][fst-root])
  — the current file system tree
- `ancestors` ([`AnyParent[]`][fst-anyparent])
  — the ancestors of `node`, with the last node being `parent`
- `fs` ([`FileSystem`](#filesystem))
  — the file system api

#### Returns

(`Result`) Nothing

### `Handles`

The callbacks to fire after a node is added to a tree (`interface`).

#### Properties

- `directory` ([`Handle<Directory>`](#handlet-result) | `null` | `undefined`, optional)
  — handle a [`Directory`][fst-directory] node
- `file` ([`Handle<File>`](#handlet-result) | `null` | `undefined`, optional)
  — handle a [`File`][fst-file] node

### `IsDirectory`

Check if a file system entry is a directory (`interface`).

#### Signatures

```ts
(): boolean
```

#### Returns

(`boolean`) `true` if entry is directory, `false` otherwise

### `IsFile`

Check if a file system entry is a file (`interface`).

#### Signatures

```ts
(): boolean
```

#### Returns

(`boolean`) `true` if entry is file, `false` otherwise

### `IsSymbolicLink`

Check if a file system entry is a symbolic link (`interface`).

#### Signatures

```ts
(): boolean
```

#### Returns

(`boolean`) `true` if entry is symbolic link, `false` otherwise

### `List<[T]>`

A list (`type`).

```ts
type List<T = unknown> = ReadonlySet<T> | readonly T[]
```

#### Type Parameters

- `T` (`any`, optional)
  — the list item type

### `Options`

Options for creating a file system tree (`interface`).

#### Properties

- `depth` (`number` | `null` | `undefined`, optional)
  — the maximum search depth (inclusive)
  > 👉 **note**: a search depth less than `0` will produce an empty tree
- `extensions` ([`Extensions`](#extensions) | `null` | `undefined`, optional)
  — the file extensions to filter matched files by
  > 👉 **note**: this is alternative way to exclude files from the tree
- `filters` ([`Filters`](#filters) | `null` | `undefined`, optional)
  — the filters used to determine if nodes should be added to the tree
- `fs` ([`FileSystem`](#filesystem) | `null` | `undefined`, optional)
  — the file system adapter
- `getFileSystemEntries` ([`GetFileSystemEntries`](#getfilesystementriest) | `null` | `undefined`, optional)
  — get a file system entries record
- `handles` ([`Handles`](#handles) | `null` | `undefined`, optional)
  — the callbacks to fire after a node is added to the tree
- `root` (`URL` | `string` | `null` | `undefined`, optional)
  — the module id of the root directory
  - **default**: [`pathe.cwd() + pathe.sep`][pathe]
- `sort` ([`Sort`](#sort) | `null` | `undefined`, optional)
  — the child node sorter.\
  by default, nodes are sorted by `type` and `name`
- `visitKey` ([`ToVisitKey`](#tovisitkeyk) | `null` | `undefined`, optional)
  — generate a key for the `visited` directory map
  - **default**: `path => path`
- `visited` ([`VisitMap`](#visitmap) | `null` | `undefined`, optional)
  — the map indicating which directories have already been searched
  - **default**: `new Map()`

### `ReaddirDirentOptions`

Options for reading the contents of a directory (`interface`).

#### Extends

- [`ReaddirOptions`](#readdiroptions)

#### Properties

- `withFileTypes` (`true`)
  — whether the result should be a content object list instead of just strings.\
  if `true`, the result will be a list of [`Direct`](#dirent) objects, which provide methods
  like [`isDirectory()`](#isdirectory) and [`isFile()`](#isfile) to get more information about
  a file system entry without additional [`fs.stat()`](#stat) calls

### `ReaddirOptions`

Options for reading the contents of a directory (`interface`).

#### Extends

- [`ReaddirOptions`](#readdiroptions)

#### Properties

- `withFileTypes?` (`boolean` | `null` | `undefined`)
  — whether the result should be a content object list instead of just strings.\
  if `true`, the result will be a list of [`Direct`](#dirent) objects, which provide methods
  like [`isDirectory()`](#isdirectory) and [`isFile()`](#isfile) to get more information about
  a file system entry without additional [`fs.stat()`](#stat) calls

### `Readdir`

Read the entire contents of a directory (`interface`).

#### Signatures

```ts
<T extends Awaitable<readonly Dirent[]>>(id: URL | string, options: ReaddirDirentOptions): T
```

#### Type Parameters

- `T` ([`Awaitable<readonly Dirent[]>`](#dirent))
  — the directory contents

#### Parameters

- `id` (`URL` | `string`)
  — the entry id
- `options` ([`ReaddirDirentOptions`](#readdirdirentoptions))
  — read options

#### Returns

(`T`) The directory contents

### `Realpath`

Compute a canonical pathname by resolving `.`, `..`, and symbolic links (`interface`).

> 👉 **Note**: A canonical pathname is not necessarily unique.
> Hard links and bind mounts can expose an entity through many pathnames.

#### Signatures

```ts
<T extends Awaitable<string>>(id: URL | string): T
```

#### Type Parameters

- `T` ([`Awaitable<string>`](#awaitablet))
  — the canonical pathname

#### Parameters

- `id` (`URL` | `string`)
  — the entry id

#### Returns

(`T`) The canonical pathname

### `Sort`

Decide how two nodes should be sorted (`type`).

```ts
type Sort = (this: void, a: Child, b: Child) => number
```

#### Parameters

- `a` ([`Child`][fst-child])
  — the current child node
- `b` ([`Child`][fst-child])
  — the next child node

#### Returns

(`number`) The comparison result

### `Stat`

Get information about a file system entry (`interface`).

#### Signatures

```ts
<T extends Awaitable<Stats>>(id: URL | string): T
```

#### Type Parameters

- `T` ([`Awaitable<Stats>`](#stats))
  — the entry info

#### Parameters

- `id` (`URL` | `string`)
  — the entry id

#### Returns

(`T`) The entry info

### `Stats`

Information about a file system entry (`interface`).

This interface can be augmented to register custom methods and properties.

```ts
declare module '@flex-development/fst-util-from-fs' {
  interface Stats {
    size: bigint | number
  }
}
```

#### Properties

- `isDirectory` ([`IsDirectory`](#isdirectory))
  — check if the entry is a directory
- `isFile` ([`IsFile`](#isfile))
  — check if the entry is a file

### `ToVisitKey<[K]>`

Get a [visit map](#visitmap) key for a pathname (`type`).

```ts
type ToVisitKey<K extends WeakKey | string | null = WeakKey | string | null> = (
  this: void,
  path: string,
  dir: string | null,
  parent: AnyParent,
  tree: Root,
  options: Options
) => K
```

#### Type Parameters

- `K` (`WeakKey` | `string` | `null`, optional)
  — the map key

#### Parameters

- `path` (`string`)
  — the canonical pathname ([realpath](#realpath)) of the directory to visit
- `dir` (`string` | `null`)
  — the path to the directory to visit, relative to `tree.path`
- `parent` ([`AnyParent`][fst-anyparent])
  — the current parent node
- `tree` ([`Root`][fst-root])
  — the current file system tree
- `options` ([`Options`](#options))
  — options for tree creation

#### Returns

(`K`) The [`visited`](#options) map key

### `VisitMap`

Map indicating which directories have already been searched (`type`).

```ts
type VisitMap = Map<string | null, boolean> | WeakMap<WeakKey, boolean>
```

## Syntax tree

The syntax tree is [fst][].

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](./CODE_OF_CONDUCT.md). By interacting with this repository, organization, or
community you agree to abide by its terms.

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[fst-anyparent]: https://github.com/flex-development/fst#anyparent

[fst-child]: https://github.com/flex-development/fst#child

[fst-directory]: https://github.com/flex-development/fst#directory

[fst-file]: https://github.com/flex-development/fst#file

[fst-root]: https://github.com/flex-development/fst#root

[fst]: https://github.com/flex-development/fst

[pathe]: https://github.com/flex-development/pathe

[typescript]: https://www.typescriptlang.org

[yarn]: https://yarnpkg.com
