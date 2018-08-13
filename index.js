import {SetupFormElement} from './com/setup-form.js'
import {TestResultsElement} from './com/test-results.js'
import * as API from './api.js'
import {importModule} from './import-module-polyfill.js'

SetupFormElement.register()
TestResultsElement.register()

document.addEventListener('run', async e => {
  var testResultsEl = document.querySelector('test-results')

  // reset
  var tests = []
  testResultsEl.reset()

  // load the tests module
  var testsModule
  try {
    testsModule = await importModule(e.detail.url.toString())
  } catch (e) {
    testResultsEl.fail('Failed to load tests')
    testResultsEl.error(e)
    return
  }

  // define the tests
  try {
    function defineTest (desc, fn) {
      tests.push({desc, fn})
    }
    testsModule.default(defineTest)
  } catch (e) {
    testResultsEl.fail('Failed to load tests')
    testResultsEl.error(e)
    return
  }

  console.log(tests)

  // run the tests sequentially
  for (var test of tests) {
    try {
      await test.fn(API)
      testResultsEl.pass(test.desc || '')
    } catch (e) {
      testResultsEl.fail(test.desc || '')
      testResultsEl.error(e)
    }
  }
  testResultsEl.finish()
})