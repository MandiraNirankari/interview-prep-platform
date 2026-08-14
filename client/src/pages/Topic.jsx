import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getQuestions, getProgress } from '../services/api'
import { useAuth } from '../context/AuthContext'

function Topic() {
  const { topicName } = useParams()
  const { token } = useAuth()

  const [questions, setQuestions] = useState([])
  const [progress, setProgress] = useState([])

  useEffect(() => {
    getQuestions()
      .then((data) => {
        setQuestions(data)
      })
      .catch((error) => {
        console.error('Failed to load questions:', error)
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
        console.error('Failed to load progress:', error)
      })
  }, [token])

  const topicQuestions = questions.filter(
    (question) => question.topic === topicName
  )

  const topic = topicName
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

  const solvedCount = topicQuestions.filter((question) =>
    progress.some(
      (item) =>
        item.question?._id === question._id &&
        item.solved
    )
  ).length

  const totalCount = topicQuestions.length

  const percentage =
    totalCount > 0
      ? Math.round((solvedCount / totalCount) * 100)
      : 0

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 py-12">

        <div className="flex items-end justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              {topic}
            </h1>

            <p className="mt-2 text-gray-400">
              Solve {topic} problems and improve your skills.
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">
              Progress
            </p>

            <p className="mt-1 text-2xl font-bold text-green-400">
              {solvedCount} / {totalCount}
            </p>
          </div>

        </div>

        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-5">

          <div className="flex justify-between text-sm">

            <span className="text-gray-400">
              Topic Progress
            </span>

            <span className="text-gray-300">
              {percentage}%
            </span>

          </div>

          <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-800">

            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

        <div className="mt-10 space-y-4">

          {topicQuestions.length === 0 ? (

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">

              <h2 className="text-xl font-semibold">
                No questions found
              </h2>

              <p className="mt-2 text-gray-400">
                There are currently no questions for this topic.
              </p>

            </div>

          ) : (

            topicQuestions.map((question) => {

              const isSolved = progress.some(
                (item) =>
                  item.question?._id === question._id &&
                  item.solved
              )

              return (
                <div
                  key={question._id}
                  className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-gray-600"
                >

                  <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold">
                      {question.title}
                    </h2>

                    <div className="flex items-center gap-3">

                      <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                        {question.difficulty}
                      </span>

                      {isSolved && (
                        <span className="rounded-full bg-green-900/40 px-3 py-1 text-xs text-green-400">
                          ✓ Solved
                        </span>
                      )}

                    </div>

                  </div>

                  <p className="mt-3 text-gray-400">
                    {question.description}
                  </p>

                  <Link
                    to={`/question/${question._id}`}
                    className="mt-5 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200"
                  >
                    {isSolved ? 'View Question' : 'Solve'}
                  </Link>

                </div>
              )
            })

          )}

        </div>

      </main>
    </div>
  )
}

export default Topic