const raml2obj = require('raml2obj')

export default async file => raml2obj.parse(file)

