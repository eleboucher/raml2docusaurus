import {Command} from '@oclif/command'
import ramlParser from '../utils/parser'

export default class Validate extends Command {
  static description = 'validate a raml file'

  static args = [
    {
      name: 'file',
      required: true,
    },
  ]

  async run() {
    const {args} = this.parse(Validate)
    ramlParser(args.file)
  }
}
