import { Command, flags } from '@oclif/command'
import { promises as fsPromises } from 'fs'
import ramljsonexpander = require('raml-jsonschema-expander')
import { join, dirname } from 'path'
import ramlParser from '../utils/parser'
import toMarkdown from '../utils/to-markdown'

export default class Render extends Command {
  static description = 'render to markdown files'

  static args = [
    {
      name: 'file',
      required: true,
    },
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    out: flags.string({
      char: 'o',
      description: 'path to save the files',
      default: '.',
    }),
    'respect-version': flags.boolean({
      description: 'save the file to a /{version} path',
      default: false,
    }),
  }

  async run() {
    const { args, flags } = this.parse(Render)

    let ramlOBJ = await ramlParser(args.file)
    ramlOBJ = ramljsonexpander.expandJsonSchemas(ramlOBJ)

    ramlOBJ.resources.forEach(async (resources: Record<string, any>) => {
      const title = resources.relativeUri
        .substring(1)
        .replaceAll('/', '_')
        .replaceAll('{', '')
        .replaceAll('}', '')
      const ret = await toMarkdown(title, ramlOBJ.baseUri, resources)
      try {
        let path = join(flags.out, title + '.md')
        if (flags['respect-version'] && ramlOBJ.version) {
          path = join(flags.out, ramlOBJ.version, title + '.md')
        }
        // eslint-disable-next-line no-console
        console.log(`rendering ${path}`)
        await fsPromises.mkdir(dirname(path), { recursive: true })
        await fsPromises.writeFile(path, ret, { flag: 'w' })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })
  }
}
