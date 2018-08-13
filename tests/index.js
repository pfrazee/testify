export default function (test) {
  test('this test will pass with one assertion', async t => {
    t.assert(1 === 1, '1 is 1')
  })

  test('this test will pass with no assertions', async t => {
    // hi!
  })

  test('this test will pass with two assertions bridged by a sleep', async t => {
    t.assert(1 === 1, '1 is 1')
    await new Promise(r => setTimeout(r, 10))
    t.assert(0 === 0, '0 is 0')
  })

  test('this test will fail', async t => {
    t.assert(0 === 1, '0 is not 1')
  })

  test('equal', async t => {
    t.equal(1, 1)
    t.equal(0, 0)
    t.equal('str', 'str')
    t.equal(true, true)
    t.equal(false, false)
    t.throws(() => t.equal(0, 1))
    t.throws(() => t.equal({}, {}))
    t.throws(() => t.equal([], []))
  })

  test('notEqual', async t => {
    t.notEqual(1, 0)
    t.notEqual(0, 1)
    t.notEqual('str', 'str2')
    t.notEqual(true, false)
    t.notEqual(false, true)
    t.throws(() => t.notEqual(0, 0))
  })

  test('fail', async t => {
    t.throws(() => t.fail('fail!'))
  })

  test('deepEqual', async t => {
    t.deepEqual(1, 1)
    t.deepEqual(0, 0)
    t.deepEqual('str', 'str')
    t.deepEqual(true, true)
    t.deepEqual(false, false)
    t.throws(() => t.deepEqual(0, 1))
    t.deepEqual({}, {})
    t.deepEqual({a: 1}, {a: 1})
    t.deepEqual({a: 1, b: 2}, {b: 2, a: 1})
    t.deepEqual({a: 1, b: {a: 3}}, {b: {a: 3}, a: 1})
    t.throws(() => t.deepEqual({a: 1}, {a: 2}))
    t.throws(() => t.deepEqual({a: 1}, {b: 1}))
    t.deepEqual([], [])
    t.deepEqual(['a'], ['a'])
    t.deepEqual([{a: 1}], [{a: 1}])
    t.throws(() => t.deepEqual(['a', 'b'], ['b', 'a']))
  })
}