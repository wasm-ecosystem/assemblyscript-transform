# Introduction

This repo is AssemblyScript transforms to enhance AssemblyScript features

## Utf8 string literal

This is a transform of AssemblyScript to store const utf8 string literal.

The string literal in AssemblyScript is utf16 encoded into Wasm data section, this brings two problems:

1. String storage has too much overhead for ascii strings
2. Need to convert utf16 to utf8 string when calling native API which receives utf8/ascii strings.

To solve this problem, this repo provides a transform of AssemblyScript to define utf8 string literals

## Principle

This transform scans function call pattern

```typescript
utf8.build("string literal");
```

and replace it to

```typescript
utf8.build_internal(memory.data<u8>([bytes in utf8]), length of bytes);
```

For example:

```typescript
utf8.build("test3");
```

is transferred to

```typescript
utf8.build_internal(memory.data<u8>([116, 101, 115, 116, 51]), 5);
```

**Attentions:**

1. The AST transform is based on string pattern matcher, so alias is not supported. Please don't use name alias of import and indirect function call to `utf8.build`, for example `import {utf8 as utf_8}` or `let foo = utf8.build; foo("abc")`.

2. The parameter of `utf8.build` must be string literal

## Usage

Install assemblyscript-transform

```shell
npm install @schleifner/assemblyscript-transform
```

In AssemblyScript code, src/index.ts

```typescript
import {utf8} from "../node_modules/@schleifner/assemblyscript-transform/as/utf8ConstStr"
const str = utf8.build("test3");
```

Build with transform

```shell
asc -o out.wasm --transform ./node_modules/@schleifner/assemblyscript-transform/dist/transformBuildUtf8ConstStr.mjs ./src/index.ts
```
