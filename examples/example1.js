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
}