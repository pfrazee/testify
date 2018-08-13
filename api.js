export function assert (test, desc = null) {
  if (!test) throw new Error(desc)
}