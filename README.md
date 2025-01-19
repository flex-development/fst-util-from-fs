# fst-util-from-fs

[![github release](https://img.shields.io/github/v/release/flex-development/fst-util-from-fs.svg?include_prereleases\&sort=semver)](https://github.com/flex-development/fst-util-from-fs/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/fst-util-from-fs.svg)](https://npmjs.com/package/@flex-development/fst-util-from-fs)
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
  - [`Options`](#options)
  - [`Dirent`](#dirent)
  - [`Extensions`](#extensions)
  - [`FileSystem`](#filesystem)
  - [`Filter`](#filter)
  - [`Filters`](#filters)
  - [`Handle<[T]>`](#handlet)
  - [`Handles`](#handles)
  - [`Sort`](#sort)
- [Syntax tree](#syntax-tree)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

This package is a utility to create [file system trees][fst].

This utility that uses file system adapters to recursively read a directory, and create a tree from its contents.

## Install

This package is [ESM only][esm].

In Node.js (version 18+) with [yarn][]:

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

### `Options`

Options for creating a file system tree (TypeScript interface).

#### Properties

- `content` (`boolean`, optional) —
  include file content (populates the `value` field of each [`file` node][fst-file])
- `depth` (`number`, optional) —
  maximum search depth (inclusive). a search depth less than `0` will produce an empty tree
- `extensions` ([`Extensions`](#extensions), optional) —
  list of file extensions to filter matched files by
- `filters` ([`Filters`](#filters), optional) —
  path filters to determine if nodes should be added to the tree
- `fs` ([`Partial<FileSystem>`](#filesystem), optional) —
  file system adapter
- `handles` ([`Handles`](#handles), optional) —
  node handlers
- `root` (`URL | string`, optional) —
  module id of root directory
  - **default**: [`pathe.cwd() + pathe.sep`][pathe]
- `sort` ([`Sort`](#sort), optional) —
  function used to sort child nodes

### `Dirent`

Directory content entry (TypeScript interface).

This interface can be augmented to register custom methods and properties.

```ts
declare module '@flex-development/fst-util-from-fs' {
  interface Dirent {
    parentPath: string
  }
}
```

#### Properties

- `isDirectory` (`(this: void) => boolean`) — check if the dirent describes a directory
- `name` (`string`) — directory content name. if the dirent refers to a file, the file extension should be included

### `Extensions`

Union of options to filter matched files by file extension (TypeScript type).

```ts
type Extensions = Set<string> | readonly string[] | string
```

### `FileSystem`

File system adapter (TypeScript interface).

#### Properties

- `readFileSync` (`(this: void, path: string, encoding: 'utf8') => string`, optional) —
  get the contents of the file at `path`
- `readdirSync` (`(this: void, path: string, options: { withFileTypes: true }) => readonly Dirent[]`) —
  read the contents of the directory at `path`

### `Filter`

Determine if a node for `x` should be added to a file system tree.

#### Parameters

- `x` (`string`) — path to directory or file

#### Returns

(`boolean`) `true` if node for `x` should be added, `false` otherwise

### `Filters`

Path filters to determine if nodes should be added to the tree (TypeScript type).

#### Properties

- `directory` ([`Filter`](#filter), optional) — determine if a `directory` node should be added to the tree
- `file` ([`Filter`](#filter), optional) — determine if a `file` node should be added to the tree

### `Handle<[T]>`

Handle `node`.

#### Type Parameters

- `T` ([`Child`][fst-child]) — [fst][] child node

#### Parameters

- `node` (`T`) — directory or file node
- `dirent` ([`Dirent`](#dirent)) — dirent object representing directory or file
- `parent` ([`Parent`][fst-parent]) — parent node
- `tree` ([`Root`][fst-root]) — file system tree
- `fs` ([`FileSystem`](#filesystem)) — file system adapter

#### Returns

(`null | undefined | void`) nothing

### `Handles`

Path filters to determine if nodes should be added to the tree (TypeScript type).

#### Properties

- `directory` ([`Handle<Directory>`](#handlet), optional) — [directory node][fst-directory] handler
- `file` ([`Handle<File>`](#handlet), optional) — [file node][fst-file] handler

### `Sort`

Compare node `a` to `b`.

#### Parameters

- `a` ([`Child`][fst-child]) — current child node
- `b` ([`Child`][fst-child]) — next child node

#### Returns

(`number`) comparison result

## Syntax tree

The syntax tree is [fst][].

## Types

This package is fully typed with [TypeScript][].

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](./CODE_OF_CONDUCT.md). By interacting with this repository, organization, or
community you agree to abide by its terms.

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[fst-child]: https://github.com/flex-development/fst#child

[fst-directory]: https://github.com/flex-development/fst#directory

[fst-file]: https://github.com/flex-development/fst#file

[fst-parent]: https://github.com/flex-development/fst#parent

[fst-root]: https://github.com/flex-development/fst#root

[fst]: https://github.com/flex-development/fst

[pathe]: https://github.com/flex-development/pathe

[typescript]: https://www.typescriptlang.org

[yarn]: https://yarnpkg.com
