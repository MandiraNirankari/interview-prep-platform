import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { getQuestions, getProgress } from '../services/api'
import { useAuth } from '../context/AuthContext'

function DSA() {
  const { token } = useAuth()

  const [questions, setQuestions] = useState([])
  const [progress, setProgress] = useState([])

  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('All')

  useEffect(() => {
    getQuestions()
      .then((data) => {
        setQuestions(data)
      })
      .catch((error) => {
        console.error(
          'Failed to load questions:',
          error
        )
      })
  }, [])

  useEffect(() => {
    if (!token) {
      return
    }

    getProgress(token)
      .then((data) => {
        setProgress(data)
      })
      .catch((error) => {
        console.error(
          'Failed to load progress:',
          error
        )
      })
  }, [token])

  const topics = [
    {
      name: 'Arrays',
      slug: 'arrays',
    },
    {
      name: 'Strings',
      slug: 'strings',
    },
    {
      name: 'Linked Lists',
      slug: 'linked-lists',
    },
    {
      name: 'Stacks & Queues',
      slug: 'stacks-&-queues',
    },
    {
      name: 'Trees',
      slug: 'trees',
    },
    {
      name: 'Graphs',
      slug: 'graphs',
    },
  ]

  const isSolved = (questionId) => {
    return progress.some(
      (item) =>
        item.solved &&
        (item.question?._id === questionId ||
          item.question === questionId)
    )
  }

  const filteredQuestions = questions.filter(
    (question) => {
      const matchesSearch =
        question.title
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesDifficulty =
        difficulty === 'All' ||
        question.difficulty === difficulty

      return (
        matchesSearch &&
        matchesDifficulty
      )
    }
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-8 py-12">

        {/* Header */}

        <h1 className="text-4xl font-bold">
          DSA Practice
        </h1>

        <p className="mt-2 text-gray-400">
          Master data structures and algorithms through practice.
        </p>

        {/* Search & Filter */}

        <div className="mt-8 flex flex-col gap-4 md:flex-row">

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search questions..."
            className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-gray-500"
          />

          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value)
            }
            className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none"
          >
            <option value="All">
              All Difficulties
            </option>

            <option value="Easy">
              Easy
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Hard">
              Hard
            </option>
          </select>

        </div>

        {/* Topic Cards */}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {topics.map((topic) => {

            const topicQuestions =
              questions.filter(
                (question) =>
                  question.topic === topic.slug
              )

            const solvedCount =
              topicQuestions.filter(
                (question) =>
                  isSolved(question._id)
              ).length

            const totalCount =
              topicQuestions.length

            const percentage =
              totalCount > 0
                ? Math.round(
                    (solvedCount /
                      totalCount) *
                      100
                  )
                : 0

            return (
              <div
                key={topic.slug}
                className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-gray-600"
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-xl font-semibold">
                    {topic.name}
                  </h2>

                  <span className="text-sm text-gray-500">
                    {totalCount}
                  </span>

                </div>

                <p className="mt-2 text-sm text-gray-400">
                  {solvedCount} / {totalCount} solved
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-800">

                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

                <p className="mt-2 text-right text-xs text-gray-500">
                  {percentage}%
                </p>

                <Link
                  to={`/dsa/${topic.slug}`}
                  className="mt-4 block w-full rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-black hover:bg-gray-200"
                >
                  Practice
                </Link>

              </div>
            )
          })}

        </div>

        {/* Search Results */}

        <section className="mt-12">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Questions
            </h2>

            <span className="text-sm text-gray-500">
              {filteredQuestions.length} questions
            </span>

          </div>

          <div className="mt-5 space-y-4">

            {filteredQuestions.length === 0 ? (

              <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">

                <h3 className="text-lg font-semibold">
                  No questions found
                </h3>

                <p className="mt-2 text-gray-500">
                  Try another search or difficulty.
                </p>

              </div>

            ) : (

              filteredQuestions.map((question) => {

                const solved =
                  isSolved(question._id)

                return (
                  <div
                    key={question._id}
                    className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-gray-600"
                  >

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <h3 className="text-xl font-semibold">
                          {question.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-400">
                          {question.description}
                        </p>

                        <div className="mt-3 flex items-center gap-3">

                          <span className="text-xs capitalize text-gray-500">
                            {question.topic.replaceAll(
                              '-',
                              ' '
                            )}
                          </span>

                          <span className="text-gray-700">
                            •
                          </span>

                          <span className="text-xs text-gray-500">
                            {question.difficulty}
                          </span>

                        </div>

                      </div>

                      <div className="flex shrink-0 items-center gap-3">

                        {solved && (
                          <span className="rounded-full bg-green-900/40 px-3 py-1 text-xs text-green-400">
                            ✓ Solved
                          </span>
                        )}

                        <Link
                          to={`/question/${question._id}`}
                          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
                        >
                          {solved
                            ? 'View'
                            : 'Solve'}
                        </Link>

                      </div>

                    </div>

                  </div>
                )
              })

            )}

          </div>

        </section>

      </main>

    </div>
  )
}

export default DSA