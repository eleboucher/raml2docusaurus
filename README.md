raml2docusaurus
===============

export raml to docusaurus markdown

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/raml2docusaurus.svg)](https://npmjs.org/package/raml2docusaurus)
[![Downloads/week](https://img.shields.io/npm/dw/raml2docusaurus.svg)](https://npmjs.org/package/raml2docusaurus)
[![License](https://img.shields.io/npm/l/raml2docusaurus.svg)](https://github.com/eleboucher/raml2docusaurus/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g raml2docusaurus
$ raml2docusaurus COMMAND
running command...
$ raml2docusaurus (-v|--version|version)
raml2docusaurus/0.0.14 darwin-x64 node-v15.3.0
$ raml2docusaurus --help [COMMAND]
USAGE
  $ raml2docusaurus COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`raml2docusaurus help [COMMAND]`](#raml2docusaurus-help-command)
* [`raml2docusaurus render FILE`](#raml2docusaurus-render-file)

## `raml2docusaurus help [COMMAND]`

```
USAGE
  $ raml2docusaurus help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `raml2docusaurus render FILE`

```
USAGE
  $ raml2docusaurus render FILE

OPTIONS
  -h, --help         show CLI help
  -o, --out=out      [default: .] path to save the files
  --respect-version  save the file to a /{version} path
```

_See code: [src/commands/render.ts](https://github.com/eleboucher/raml2docusaurus/blob/v0.0.14/src/commands/render.ts)_
<!-- commandsstop -->
