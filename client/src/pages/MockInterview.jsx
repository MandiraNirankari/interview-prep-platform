import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getQuestions } from '../services/api'

function MockInterview() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)

  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)

  const [timeLeft, setTimeLeft] = useState(30 * 60)

  const [answer, setAnswer] = useState('')
  const [answered, setAnswered] = useState(0)

  useEffect(() => {
    getQuestions()
      .then((data) => {
        setQuestions(data)

        if (data.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * data.length
          )

          setCurrentQuestion(data[randomIndex])
        }
      })
      .catch((error) => {
        console.error(
          'Failed to load questions:',
          error
        )
      })
  }, [])

  useEffect(() => {
    if (!started || finished) {
      return
    }

    if (timeLeft <= 0) {
      setFinished(true)
      setStarted(false)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [started, finished, timeLeft])

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return `${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`
  }

  const startInterview = () => {
    setStarted(true)
    setFinished(false)
    setAnswered(0)
    setAnswer('')
    setTimeLeft(30 * 60)
  }

  const nextQuestion = () => {
    if (!questions.length) {
      return
    }

    if (answer.trim()) {
      setAnswered((previous) => previous + 1)
    }

    const availableQuestions = questions.filter(
      (question) =>
        question._id !== currentQuestion?._id
    )

    const pool =
      availableQuestions.length > 0
        ? availableQuestions
        : questions

    const randomIndex = Math.floor(
      Math.random() * pool.length
    )

    setCurrentQuestion(pool[randomIndex])
    setAnswer('')
  }

  const finishInterview = () => {
    if (answer.trim()) {
      setAnswered((previous) => previous + 1)
    }

    setFinished(true)
    setStarted(false)
  }

  const restartInterview = () => {
    if (!questions.length) {
      return
    }

    const randomIndex = Math.floor(
      Math.random() * questions.length
    )

    setCurrentQuestion(questions[randomIndex])
    setAnswer('')
    setAnswered(0)
    setTimeLeft(30 * 60)
    setFinished(false)
    setStarted(true)
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />

        <main className="mx-auto max-w-7xl px-8 py-12">
          <h1 className="text-4xl font-bold">
            Mock Interview
          </h1>

          <p className="mt-3 text-gray-400">
            Loading interview questions...
          </p>
        </main>
      </div>
    )
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />

        <main className="mx-auto max-w-4xl px-8 py-16">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-900/30 text-4xl">
              ✓
            </div>

            <h1 className="mt-6 text-4xl font-bold">
              Interview Complete
            </h1>

            <p className="mt-3 text-gray-400">
              Good work. Here's your interview summary.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl bg-gray-950 p-6">
                <p className="text-sm text-gray-400">
                  Questions Answered
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {answered}
                </p>
              </div>

              <div className="rounded-xl bg-gray-950 p-6">
                <p className="text-sm text-gray-400">
                  Duration
                </p>

                <p className="mt-2 text-3xl font-bold">
                  30 min
                </p>
              </div>

              <div className="rounded-xl bg-gray-950 p-6">
                <p className="text-sm text-gray-400">
                  Status
                </p>

                <p className="mt-2 text-3xl font-bold text-green-400">
                  Completed
                </p>
              </div>

            </div>

            <button
              onClick={restartInterview}
              className="mt-10 rounded-lg bg-white px-8 py-3 font-semibold text-black hover:bg-gray-200"
            >
              Start New Interview
            </button>

          </div>

        </main>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />

        <main className="mx-auto max-w-4xl px-8 py-16">

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10">

            <h1 className="text-4xl font-bold">
              Mock Interview
            </h1>

            <p className="mt-4 text-lg text-gray-400">
              Test yourself under realistic interview
              conditions.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl bg-gray-950 p-6">
                <p className="text-sm text-gray-400">
                  Duration
                </p>

                <p className="mt-2 text-2xl font-bold">
                  30 minutes
                </p>
              </div>

              <div className="rounded-xl bg-gray-950 p-6">
                <p className="text-sm text-gray-400">
                  Questions
                </p>

                <p className="mt-2 text-2xl font-bold">
                  Random
                </p>
              </div>

              <div className="rounded-xl bg-gray-950 p-6">
                <p className="text-sm text-gray-400">
                  Mode
                </p>

                <p className="mt-2 text-2xl font-bold">
                  Interview
                </p>
              </div>

            </div>

            <div className="mt-10 rounded-xl border border-gray-800 bg-gray-950 p-6">

              <h2 className="text-xl font-semibold">
                Before you start
              </h2>

              <ul className="mt-4 space-y-3 text-gray-400">
                <li>• You have 30 minutes.</li>
                <li>• Questions are selected randomly.</li>
                <li>• Explain your approach clearly.</li>
                <li>• Treat this like a real interview.</li>
              </ul>

            </div>

            <button
              onClick={startInterview}
              className="mt-8 w-full rounded-lg bg-white px-6 py-3 text-lg font-semibold text-black hover:bg-gray-200"
            >
              Start Interview
            </button>

          </div>

        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 py-10">

        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Mock Interview
            </h1>

            <p className="mt-1 text-gray-400">
              Question {answered + 1}
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 px-6 py-3">

            <p className="text-xs uppercase tracking-wide text-gray-500">
              Time Remaining
            </p>

            <p
              className={`mt-1 text-2xl font-bold ${
                timeLeft <= 300
                  ? 'text-red-400'
                  : 'text-white'
              }`}
            >
              {formatTime()}
            </p>

          </div>

        </div>

        {/* Question */}

        <div className="grid gap-6 lg:grid-cols-2">

          <section className="rounded-xl border border-gray-800 bg-gray-900 p-8">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                {currentQuestion.title}
              </h2>

              <span className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
                {currentQuestion.difficulty}
              </span>

            </div>

            <div className="mt-8">

              <h3 className="text-lg font-semibold">
                Problem
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                {currentQuestion.description}
              </p>

            </div>

            <div className="mt-8 rounded-xl bg-gray-950 p-5">

              <h3 className="font-semibold">
                Interview Tip
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Explain your approach first, then discuss
                time and space complexity before writing
                the solution.
              </p>

            </div>

          </section>

          {/* Answer */}

          <section className="rounded-xl border border-gray-800 bg-gray-900 p-8">

            <h2 className="text-xl font-semibold">
              Your Answer
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Explain your approach and write your solution.
            </p>

            <textarea
              value={answer}
              onChange={(event) =>
                setAnswer(event.target.value)
              }
              spellCheck="false"
              placeholder="Explain your approach here..."
              className="mt-5 h-96 w-full resize-none rounded-lg border border-gray-700 bg-gray-950 p-5 font-mono text-sm leading-6 text-gray-200 outline-none focus:border-gray-500"
            />

            <div className="mt-5 flex justify-end gap-3">

              <button
                onClick={nextQuestion}
                className="rounded-lg border border-gray-700 px-5 py-3 font-semibold text-white hover:bg-gray-800"
              >
                Next Question
              </button>

              <button
                onClick={finishInterview}
                className="rounded-lg bg-white px-5 py-3 font-semibold text-black hover:bg-gray-200"
              >
                Finish Interview
              </button>

            </div>

          </section>

        </div>

      </main>
    </div>
  )
}

export default MockInterview