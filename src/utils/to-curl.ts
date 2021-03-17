const buildCurlCommand = (methodParams: Record<string, any>) => {
  let params = methodParams.params.slice()

  params = params.join('&')
  params = params === '' ? '' : `?${params}`

  let headers = methodParams.headers.slice()
  if (headers.length > 0) {
    headers.unshift('')
  }
  headers = headers.join(' \\\n\t')

  return `curl -X ${methodParams.method.toUpperCase()} "${
    methodParams.baseUri
  }${methodParams.path}${params}"${headers}${methodParams.payload}`
}

const getCurlStatement = (
  baseUri: string,
  method: Record<string, any>,
  resource: Record<string, any>,
  example: string
) => {
  baseUri = baseUri || ''
  if (baseUri.endsWith('/')) baseUri = baseUri.slice(0, -1)
  method.headers = method.headers || {}
  method.queryParameters = method.queryParameters || {}
  method.method = method.method || 'get'

  const payload = ['patch', 'post', 'put'].includes(method.method) ?
    ` \\\n\t--data ${(JSON.stringify(example, null, 0) || '').replace(
      /\\n/g,
      ''
    )}` :
    ''
  const parentUrl = resource.parentUrl || ''
  const relativeUri = resource.relativeUri || '/'

  const headers = Object.keys(method.headers)
  .filter(
    header =>
      method.headers[header].example &&
        method.headers[header].example.length !== 0
  )
  .map(header => `-H "${header}: ${method.headers[header].example}"`)

  const params = Object.keys(method.queryParameters)
  .filter(
    param =>
      method.queryParameters[param].example &&
        method.queryParameters[param].example.length !== 0
  )
  .map(param => `${param}=${method.queryParameters[param].example}`)

  const methodParams = {
    method: method.method,
    baseUri: baseUri,
    path: `${parentUrl}${relativeUri}`,
    params: params,
    headers: headers,
    payload: payload,
    securedBy: method.securedBy,
  }

  return buildCurlCommand(methodParams)
}

export default getCurlStatement
