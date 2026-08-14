import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getQuestions, getProgress } from '../services/api'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { token, user } = useAuth()

  const [questions, setQuestions] = useState([])
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const questionData = await getQuestions()

        setQuestions(questionData)

        if (token) {
          const progressData = await getProgress(token)
          setProgress(progressData)
        }
      } catch (error) {
        console.error(
          'Failed to load dashboard:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [token])

  const solvedQuestionIds = progress
    .filter((item) => item.solved)
    .map((item) => {
      if (typeof item.question === 'object') {
        return item.question?._id
      }

      return item.question
    })
    .filter(Boolean)

  const solvedQuestions = questions.filter((question) =>
    solvedQuestionIds.includes(question._id)
  )

  const totalQuestions = questions.length
  const solvedCount = solvedQuestions.length
  const remainingCount = Math.max(
    totalQuestions - solvedCount,
    0
  )

  const progressPercentage =
    totalQuestions > 0
      ? Math.round(
          (solvedCount / totalQuestions) * 100
        )
      : 0

  const recentQuestions = [...solvedQuestions].reverse().slice(0, 5)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />

        <main className="mx-auto max-w-7xl px-8 py-12">

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-3 text-gray-400">
            Loading your interview preparation data...
          </p>

        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-8 py-12">

        {/* Welcome */}

        <section>

          <p className="text-sm font-medium text-gray-500">
            INTERVIEW PREPARATION
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Welcome back
            {user?.name
              ? `, ${user.name}`
              : ''}
          </h1>

          <p className="mt-3 text-lg text-gray-400">
            Keep building your skills and stay consistent.
          </p>

        </section>

        {/* Stats */}

        <section className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">

            <p className="text-sm text-gray-400">
              Total Questions
            </p>

            <p className="mt-3 text-4xl font-bold">
              {totalQuestions}
            </p>

          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">

            <p className="text-sm text-gray-400">
              Solved
            </p>

            <p className="mt-3 text-4xl font-bold text-green-400">
              {solvedCount}
            </p>

          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">

            <p className="text-sm text-gray-400">
              Remaining
            </p>

            <p className="mt-3 text-4xl font-bold">
              {remainingCount}
            </p>

          </div>

        </section>

        {/* Overall Progress */}

        <section className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-8">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                Overall Progress
              </h2>

              <p className="mt-2 text-gray-400">
                Keep solving questions to improve your score.
              </p>
            </div>

            <span className="text-2xl font-bold">
              {progressPercentage}%
            </span>

          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-800">

            <div
              className="h-full rounded-full bg-green-500 transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
              }}
            />

          </div>

          <div className="mt-4 flex justify-between text-sm text-gray-500">

            <span>
              {solvedCount} solved
            </span>

            <span>
              {totalQuestions} total
            </span>

          </div>

        </section>

        {/* Quick Actions */}

        <section className="mt-8">

          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="mt-5 grid gap-6 md:grid-cols-2">

            <Link
              to="/dsa"
              className="group rounded-xl border border-gray-800 bg-gray-900 p-7 transition hover:border-gray-600"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-semibold">
                    DSA Practice
                  </h3>

                  <p className="mt-2 text-gray-400">
                    Practice data structures and algorithms.
                  </p>

                </div>

                <span className="text-2xl transition group-hover:translate-x-1">
                  →
                </span>

              </div>

            </Link>

            <Link
              to="/mock-interview"
              className="group rounded-xl border border-gray-800 bg-gray-900 p-7 transition hover:border-gray-600"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-semibold">
                    Mock Interview
                  </h3>

                  <p className="mt-2 text-gray-400">
                    Test yourself under interview conditions.
                  </p>

                </div>

                <span className="text-2xl transition group-hover:translate-x-1">
                  →
                </span>

              </div>

            </Link>

          </div>

        </section>

        {/* Recent Activity */}

        <section className="mt-10">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Recent Activity
            </h2>

            <Link
              to="/progress"
              className="text-sm text-gray-400 hover:text-white"
            >
              View all
            </Link>

          </div>

          {recentQuestions.length === 0 ? (
            <div className="mt-5 rounded-xl border border-gray-800 bg-gray-900 p-8">

              <h3 className="text-lg font-semibold">
                No questions solved yet
              </h3>

              <p className="mt-2 text-gray-400">
                Start with DSA Practice and solve your
                first question.
              </p>

              <Link
                to="/dsa"
                className="mt-5 inline-block rounded-lg bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200"
              >
                Start Practicing
              </Link>

            </div>
          ) : (
            <div className="mt-5 space-y-4">

              {recentQuestions.map((question) => (

                <Link
                  key={question._id}
                  to={`/question/${question._id}`}
                  className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:border-gray-600"
                >

                  <div>

                    <h3 className="font-semibold">
                      {question.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {question.topic}
                    </p>

                  </div>

                  <div className="flex items-center gap-4">

                    <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                      {question.difficulty}
                    </span>

                    <span className="rounded-full bg-green-900/40 px-3 py-1 text-sm text-green-400">
                      ✓ Solved
                    </span>

                  </div>

                </Link>

              ))}

            </div>
          )}

        </section>

      </main>

    </div>
  )
}

export default Dashboard