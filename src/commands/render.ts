import {Command, flags} from '@oclif/command'
import {promises as fsPromises} from 'fs'
import ramljsonexpander = require('raml-jsonschema-expander')

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
    help: flags.help({char: 'h'}),
  }

  async run() {
    const {args} = this.parse(Render)

    let ramlOBJ = await ramlParser(args.file)
    ramlOBJ = ramljsonexpander.expandJsonSchemas(ramlOBJ)

    ramlOBJ.resources.forEach(async (resources: Record<string, any>) => {
      const title = resources.relativeUri.substring(1).replaceAll('/', '_')
      const ret = await toMarkdown(title, resources)
      try {
        await fsPromises.writeFile(title + '.md', ret, {flag: 'w'})
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })
  }
}
