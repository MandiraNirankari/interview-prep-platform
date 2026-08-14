function QuickActions() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Start Preparing</h2>

      <p className="mt-2 text-gray-400">
        Choose what you want to work on today.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-xl font-semibold">
            Practice DSA
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Solve coding problems and improve your problem-solving skills.
          </p>

          <button className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200">
            Start Practice
          </button>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-xl font-semibold">
            Mock Interview
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Simulate a real technical interview and test your skills.
          </p>

          <button className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200">
            Start Interview
          </button>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-xl font-semibold">
            Track Progress
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            Review your performance and see where you need to improve.
          </p>

          <button className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200">
            View Progress
          </button>
        </div>

      </div>
    </section>
  )
}

export default QuickActions