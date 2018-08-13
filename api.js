// globals
// =

var temporaryArchives = []

// exported api
// =

export function assert (test, desc = 'assert') {
  if (!test) throw new Error(desc)
}

export function fail (desc = 'fail') {
  throw new Error(desc)
}

export function equal (a, b, desc = 'equal') {
  console.debug('equal(', a, ',', b, ')')
  assert(a === b, desc)
}

export function notEqual (a, b, desc = 'notEqual') {
  console.debug('notEqual(', a, ',', b, ')')
  assert(a !== b, desc)
}

export function deepEqual (a, b, desc = 'deepEqual') {
  console.debug('deepEqual(', a, ',', b, ')')
  assert(_deepEqual(a, b), desc)
}

export function throws (fn, desc = 'throws') {
  var didThrow = false
  try {
    fn()
  } catch (e) {
    didThrow = true
  }
  if (!didThrow) {
    throw new Error(desc)
  }
}

export async function throwsAsync (fn, desc = 'throws') {
  var didThrow = false
  try {
    await fn()
  } catch (e) {
    didThrow = true
  }
  if (!didThrow) {
    throw new Error(desc)
  }
}

export async function createTemporaryDatArchive (opts = {}) {
  opts.prompt = false
  var a = await DatArchive.create(opts)
  temporaryArchives.push(a)
  return a
}

export async function cleanup () {
  for (let a of temporaryArchives) {
    await DatArchive.unlink(a)
  }
}

// internal methods
// =

function _deepEqual (a, b) {
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
    return a === b
  }

  var aProps = Object.keys(a)
  var bProps = Object.keys(b)

  if (aProps.length !== bProps.length) {
    return false
  }

  for (var i = 0; i < aProps.length; i++) {
    let propName = aProps[i]
    let aProp = a[propName]
    let bProp = b[propName]
    let aPropType = typeof aProp
    let bPropType = typeof bProp

    if (aPropType !== bPropType) {
      return false
    }

    if (aProp && aPropType === 'object') {
      return _deepEqual(aProp, bProp)
    } else if (aProp !== bProp) {
      return false
    }
  }

  return true
}