import hg from 'mercury'
import cuid from 'cuid'
import xtend from 'xtend'

const h = hg.h

/**
 * defaultRender is the default rendering function of a base component
 *
 * @param {object} state - an evaluated hg.state object
 * @returns {object} a virtual dom node
 */
function defaultRender (state) {
  return h('div', state)
}

/**
 * Component creates an hg.state object with bound methods
 * @constructor
 * @param {object} initState - the initial State object. A POJO with observable
 *                             values and a channels attribute
 * @param {function} [rnderFn] The function used to render this component.
 */
function Component (initState, rndrFn) {
  rndrFn = rndrFn || defaultRender
  const cmpId = cuid()
  const cmpState = hg.state(xtend(initState, {
    cmpId: cmpId,
    render: hg.value(),
    containsEvent: hg.value()
  }))
  cmpState.render.set(Component.render.bind(undefined, cmpState, rndrFn))
  cmpState.containsEvent.set(Component.containsEvent.bind(undefined, cmpId))
  return cmpState
}

/**
 * Component.render wraps the render function and updates the node with the
 * state id for future reference
 *
 * @param {object} state - an evaluated hg.state object
 * @param {function} rndrFn - the function used to render the associated state
 */
Component.render = function (state, rndrFn) {
  const vnode = rndrFn(state())
  vnode.properties.id = state.cmpId
  return vnode
}

/**
 * Component.containsEvent evaluates if the givin DOM event happend within the
 * tree with the given component id
 *
 * @param {string} cmpId - the component id
 * @param {event} evt - the DOM event
 */
Component.containsEvent = function (cmpId, evt) {
  let elm = evt.target
  while (elm && elm.tagName.toLowerCase() !== 'body') {
    if (elm.id === cmpId) {
      return true
    }
    elm = elm.parentNode
  }
  return false
}

module.exports = Component
