import {expect, test} from '@oclif/test'

describe('render', () => {
  test
  .stdout()
  .command(['render'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })
})
