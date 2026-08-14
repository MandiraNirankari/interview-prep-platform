import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  getQuestions,
  getProgress,
  markQuestionSolved,
} from '../services/api'
import { useAuth } from '../context/AuthContext'

const examples = {
  'Two Sum': {
    input: '[2, 7, 11, 15], target = 9',
    output: '[0, 1]',
  },

  'Best Time to Buy and Sell Stock': {
    input: '[7, 1, 5, 3, 6, 4]',
    output: '5',
  },

  'Maximum Subarray': {
    input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]',
    output: '6',
  },

  'Product of Array Except Self': {
    input: '[1, 2, 3, 4]',
    output: '[24, 12, 8, 6]',
  },

  'Valid Anagram': {
    input: 's = "anagram", t = "nagaram"',
    output: 'true',
  },

  'Valid Palindrome': {
    input: '"A man, a plan, a canal: Panama"',
    output: 'true',
  },

  'Longest Substring Without Repeating Characters': {
    input: '"abcabcbb"',
    output: '3',
  },

  'Longest Palindromic Substring': {
    input: '"babad"',
    output: '"bab"',
  },

  'Reverse Linked List': {
    input: '[1, 2, 3, 4, 5]',
    output: '[5, 4, 3, 2, 1]',
  },

  'Merge Two Sorted Lists': {
    input: '[1,2,4], [1,3,4]',
    output: '[1,1,2,3,4,4]',
  },

  'Linked List Cycle': {
    input: 'head = [3,2,0,-4], pos = 1',
    output: 'true',
  },

  'Remove Nth Node From End': {
    input: '[1,2,3,4,5], n = 2',
    output: '[1,2,3,5]',
  },

  'Valid Parentheses': {
    input: '"()[]{}"',
    output: 'true',
  },

  'Min Stack': {
    input: 'push(-2), push(0), push(-3), getMin()',
    output: '-3',
  },

  'Evaluate Reverse Polish Notation': {
    input: '["2","1","+","3","*"]',
    output: '9',
  },

  'Daily Temperatures': {
    input: '[73,74,75,71,69,72,76,73]',
    output: '[1,1,4,2,1,1,0,0]',
  },

  'Maximum Depth of Binary Tree': {
    input: '[3,9,20,null,null,15,7]',
    output: '3',
  },

  'Invert Binary Tree': {
    input: '[4,2,7,1,3,6,9]',
    output: '[4,7,2,9,6,3,1]',
  },

  'Binary Tree Level Order Traversal': {
    input: '[3,9,20,null,null,15,7]',
    output: '[[3],[9,20],[15,7]]',
  },

  'Validate Binary Search Tree': {
    input: '[2,1,3]',
    output: 'true',
  },

  'Number of Islands': {
    input: 'grid = [["1","1","0"],["1","0","0"],["0","0","1"]]',
    output: '2',
  },

  'Clone Graph': {
    input: 'graph = [[2,4],[1,3],[2,4],[1,3]]',
    output: 'cloned graph',
  },

  'Course Schedule': {
    input: 'numCourses = 2, prerequisites = [[1,0]]',
    output: 'true',
  },

  'Word Ladder': {
    input: 'beginWord = "hit", endWord = "cog"',
    output: '5',
  },
}

function Question() {
  const { questionId } = useParams()
  const { token } = useAuth()

  const [question, setQuestion] = useState(null)
  const [solved, setSolved] = useState(false)

  const [code, setCode] = useState(
`function solution(input) {
  // Write your solution here

}`
  )

  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    getQuestions()
      .then((data) => {
        const foundQuestion = data.find(
          (item) => item._id === questionId
        )

        setQuestion(foundQuestion)
      })
      .catch((error) => {
        console.error(
          'Failed to load question:',
          error
        )
      })
  }, [questionId])

  useEffect(() => {
    if (!token) {
      return
    }

    getProgress(token)
      .then((data) => {
        const currentProgress = data.find(
          (item) =>
            item.question?._id === questionId ||
            item.question === questionId
        )

        if (currentProgress?.solved) {
          setSolved(true)
        }
      })
      .catch((error) => {
        console.error(
          'Failed to load progress:',
          error
        )
      })
  }, [questionId, token])

  const runCode = () => {
    setRunning(true)
    setOutput('')

    try {
      const workerCode = `
        self.onmessage = function(event) {
          try {
            const userCode = event.data.code

            const fn = new Function(
              userCode + '\\nreturn solution;'
            )()

            const result = fn([2, 7, 11, 15])

            self.postMessage({
              success: true,
              result: result
            })
          } catch (error) {
            self.postMessage({
              success: false,
              error: error.message
            })
          }
        }
      `

      const blob = new Blob(
        [workerCode],
        {
          type: 'application/javascript',
        }
      )

      const worker = new Worker(
        URL.createObjectURL(blob)
      )

      let finished = false

      worker.onmessage = (event) => {
        if (finished) {
          return
        }

        finished = true

        if (event.data.success) {
          setOutput(
            JSON.stringify(
              event.data.result,
              null,
              2
            )
          )
        } else {
          setOutput(
            `Error: ${event.data.error}`
          )
        }

        worker.terminate()
        setRunning(false)
      }

      worker.onerror = () => {
        if (finished) {
          return
        }

        finished = true

        setOutput(
          'Error: Code execution failed.'
        )

        worker.terminate()
        setRunning(false)
      }

      worker.postMessage({
        code,
      })

      setTimeout(() => {
        if (finished) {
          return
        }

        finished = true

        worker.terminate()
        setRunning(false)

        setOutput(
          'Error: Execution timed out.'
        )
      }, 3000)

    } catch (error) {
      setOutput(
        `Error: ${error.message}`
      )

      setRunning(false)
    }
  }

  const handleSubmit = async () => {
    if (!token) {
      setSubmitMessage(
        'Please log in before submitting.'
      )

      return
    }

    if (!code.trim()) {
      setSubmitMessage(
        'Please write some code first.'
      )

      return
    }

    try {
      setSubmitting(true)
      setSubmitMessage('')

      await markQuestionSolved(
        questionId,
        token
      )

      setSolved(true)

      setSubmitMessage(
        '✓ Solution submitted successfully!'
      )

    } catch (error) {
      console.error(
        'Submission failed:',
        error
      )

      setSubmitMessage(
        error.message ||
        'Failed to submit solution.'
      )

    } finally {
      setSubmitting(false)
    }
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">

        <Navbar />

        <main className="mx-auto max-w-7xl px-8 py-12">

          <h1 className="text-3xl font-bold">
            Question not found
          </h1>

        </main>

      </div>
    )
  }

  const example = examples[question.title]

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Problem */}

          <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">

            <div className="flex items-center justify-between">

              <h1 className="text-3xl font-bold">
                {question.title}
              </h1>

              <div className="flex items-center gap-3">

                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
                  {question.difficulty}
                </span>

                {solved && (
                  <span className="rounded-full bg-green-900/40 px-3 py-1 text-sm text-green-400">
                    ✓ Solved
                  </span>
                )}

              </div>

            </div>

            <div className="mt-8">

              <h2 className="text-xl font-semibold">
                Problem
              </h2>

              <p className="mt-4 leading-7 text-gray-300">
                {question.description}
              </p>

            </div>

            {/* Example */}

            <div className="mt-8">

              <h2 className="text-xl font-semibold">
                Example
              </h2>

              <div className="mt-4 rounded-lg bg-gray-950 p-4 font-mono text-sm text-gray-300">

                <p>
                  Input: {example?.input || 'See problem description'}
                </p>

                <p className="mt-2">
                  Output: {example?.output || 'See expected result'}
                </p>

              </div>

            </div>

          </section>

          {/* Code */}

          <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                Your Solution
              </h2>

              <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
                JavaScript
              </span>

            </div>

            <textarea
              value={code}
              onChange={(event) =>
                setCode(event.target.value)
              }
              spellCheck="false"
              className="mt-4 h-96 w-full resize-none rounded-lg border border-gray-700 bg-gray-950 p-4 font-mono text-sm leading-6 text-gray-200 outline-none focus:border-gray-500"
            />

            <div className="mt-4 flex justify-end gap-3">

              <button
                onClick={runCode}
                disabled={running}
                className="rounded-lg border border-gray-700 px-5 py-2 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {running
                  ? 'Running...'
                  : 'Run Code'}
              </button>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="rounded-lg bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? 'Submitting...'
                  : 'Submit Solution'}
              </button>

            </div>

            {output && (
              <div className="mt-5">

                <h3 className="text-sm font-semibold text-gray-300">
                  Output
                </h3>

                <pre className="mt-2 max-h-60 overflow-auto rounded-lg bg-gray-950 p-4 text-sm text-gray-300">
                  {output}
                </pre>

              </div>
            )}

            {submitMessage && (
              <p
                className={`mt-4 text-sm ${
                  submitMessage.startsWith('✓')
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {submitMessage}
              </p>
            )}

          </section>

        </div>

      </main>

    </div>
  )
}

export default Question