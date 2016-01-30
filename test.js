import test from 'tape'
import Component from '.'

test('Create base component', function (t) {
  let cmp = Component({})
  t.ok(cmp.cmpId)
  let vnode = cmp().render()
  t.ok(vnode)
  t.equal(vnode.properties.id, cmp.cmpId, 'cmp should render the id in the dom')
  t.end()
})
