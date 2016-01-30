import test from 'tape'
import Component from '.'

test('Create base component', function (t) {
  let cmp = Component({})
  t.ok(cmp.cmpId, 'Component state should have an id ')
  let vnode = cmp().render()
  t.ok(vnode, 'Component render function should return a vnode')
  t.equal(vnode.properties.id, cmp.cmpId, 'Component should render the id in the dom')
  t.end()
})
