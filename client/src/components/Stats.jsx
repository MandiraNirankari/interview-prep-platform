function Stats() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-sm text-gray-400">Problems Solved</p>
        <h2 className="mt-2 text-3xl font-bold">0</h2>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-sm text-gray-400">Mock Interviews</p>
        <h2 className="mt-2 text-3xl font-bold">0</h2>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-sm text-gray-400">Study Streak</p>
        <h2 className="mt-2 text-3xl font-bold">0 days</h2>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-sm text-gray-400">Overall Progress</p>
        <h2 className="mt-2 text-3xl font-bold">0%</h2>
      </div>

    </div>
  )
}

export default Stats