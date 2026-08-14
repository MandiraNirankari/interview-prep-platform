import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getQuestions, getProgress } from '../services/api'
import { useAuth } from '../context/AuthContext'

function Progress() {
  const { token } = useAuth()

  const [questions, setQuestions] = useState([])
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const questionData = await getQuestions()
        setQuestions(questionData)

        if (token) {
          const progressData = await getProgress(token)
          setProgress(progressData)
        }
      } catch (error) {
        console.error(
          'Failed to load progress:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
  }, [token])

  const isSolved = (questionId) => {
    return progress.some(
      (item) =>
        item.solved &&
        (item.question?._id === questionId ||
          item.question === questionId)
    )
  }

  const solvedQuestions = questions.filter(
    (question) => isSolved(question._id)
  )

  const totalQuestions = questions.length
  const solvedCount = solvedQuestions.length
  const remainingCount = Math.max(
    totalQuestions - solvedCount,
    0
  )

  const percentage =
    totalQuestions > 0
      ? Math.round(
          (solvedCount / totalQuestions) * 100
        )
      : 0

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

  const difficulties = [
    'Easy',
    'Medium',
    'Hard',
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">

        <Navbar />

        <main className="mx-auto max-w-7xl px-8 py-12">

          <h1 className="text-4xl font-bold">
            Your Progress
          </h1>

          <p className="mt-3 text-gray-400">
            Loading your progress...
          </p>

        </main>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar />

      <main className="mx-auto max-w-7xl px-8 py-12">

        {/* Header */}

        <section>

          <h1 className="text-4xl font-bold">
            Your Progress
          </h1>

          <p className="mt-2 text-gray-400">
            Track your interview preparation progress.
          </p>

        </section>

        {/* Main Stats */}

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
                {solvedCount} of {totalQuestions} questions solved.
              </p>

            </div>

            <span className="text-3xl font-bold">
              {percentage}%
            </span>

          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-800">

            <div
              className="h-full rounded-full bg-green-500 transition-all duration-500"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </section>

        {/* Topic Progress */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold">
            Progress by Topic
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {topics.map((topic) => {

              const topicQuestions =
                questions.filter(
                  (question) =>
                    question.topic === topic.slug
                )

              const topicSolved =
                topicQuestions.filter(
                  (question) =>
                    isSolved(question._id)
                ).length

              const topicTotal =
                topicQuestions.length

              const topicPercentage =
                topicTotal > 0
                  ? Math.round(
                      (topicSolved /
                        topicTotal) *
                        100
                    )
                  : 0

              return (
                <div
                  key={topic.slug}
                  className="rounded-xl border border-gray-800 bg-gray-900 p-6"
                >

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold">
                      {topic.name}
                    </h3>

                    <span className="text-sm text-gray-500">
                      {topicSolved}/{topicTotal}
                    </span>

                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-800">

                    <div
                      className="h-full rounded-full bg-green-500 transition-all duration-500"
                      style={{
                        width: `${topicPercentage}%`,
                      }}
                    />

                  </div>

                  <p className="mt-2 text-right text-xs text-gray-500">
                    {topicPercentage}%
                  </p>

                </div>
              )
            })}

          </div>

        </section>

        {/* Difficulty Progress */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold">
            Difficulty Breakdown
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">

            {difficulties.map((difficulty) => {

              const difficultyQuestions =
                questions.filter(
                  (question) =>
                    question.difficulty ===
                    difficulty
                )

              const difficultySolved =
                difficultyQuestions.filter(
                  (question) =>
                    isSolved(question._id)
                ).length

              return (
                <div
                  key={difficulty}
                  className="rounded-xl border border-gray-800 bg-gray-900 p-6"
                >

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold">
                      {difficulty}
                    </h3>

                    <span className="text-sm text-gray-500">
                      {difficultySolved}/
                      {difficultyQuestions.length}
                    </span>

                  </div>

                  <p className="mt-3 text-sm text-gray-400">
                    {difficultySolved} solved
                  </p>

                </div>
              )
            })}

          </div>

        </section>

        {/* Solved Questions */}

        <section className="mt-10">

          <h2 className="text-2xl font-bold">
            Solved Questions
          </h2>

          {solvedQuestions.length === 0 ? (

            <div className="mt-5 rounded-xl border border-gray-800 bg-gray-900 p-8">

              <h3 className="text-lg font-semibold">
                No questions solved yet
              </h3>

              <p className="mt-2 text-gray-400">
                Start solving DSA questions to build your progress.
              </p>

            </div>

          ) : (

            <div className="mt-5 space-y-4">

              {solvedQuestions.map((question) => (

                <div
                  key={question._id}
                  className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900 p-6 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div>

                    <h3 className="text-lg font-semibold">
                      {question.title}
                    </h3>

                    <p className="mt-1 text-sm capitalize text-gray-500">
                      {question.topic.replaceAll(
                        '-',
                        ' '
                      )}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                      {question.difficulty}
                    </span>

                    <span className="rounded-full bg-green-900/40 px-3 py-1 text-sm text-green-400">
                      ✓ Solved
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  )
}

export default Progress