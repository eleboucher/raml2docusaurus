
import {join} from 'path'
import {configure} from 'nunjucks'

const defaultTemplatesDir = join(__dirname, '..', 'templates')

const cleanupMarkdown = (input: any) => {
  const trailingSpaces = / +\n/g
  const excessiveNewLines = /\n{3,}/g
  if (!input) {
    return input
  }
  let result = input.replace(trailingSpaces, '\n')
  result = result.replace(excessiveNewLines, '\n\n')
  return result
}

const toMarkdown = async (title: string, baseUri: string, resource: Record<string, any>): Promise<any> => {
  const template = join(defaultTemplatesDir, 'resources.nunjucks')

  const env = configure(defaultTemplatesDir, {autoescape: false})
  const result = await env.render(template, {title, baseUri, resource})

  return cleanupMarkdown(result)
}

export default toMarkdown
