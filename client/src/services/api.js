const API_URL = 'https://interview-prep-platform-backend-la3z.onrender.com/api'

export async function getQuestions() {
  const response = await fetch(`${API_URL}/questions`)

  if (!response.ok) {
    throw new Error('Failed to fetch questions')
  }

  return response.json()
}

export async function getProgress(token) {
  const response = await fetch(
    `${API_URL}/progress`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch progress')
  }

  return response.json()
}

export async function markQuestionSolved(
  questionId,
  token
) {
  const response = await fetch(
    `${API_URL}/progress/${questionId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      'Failed to mark question as solved'
    )
  }

  return response.json()
}

export async function getMockQuestions(
  difficulty,
  token
) {
  const response = await fetch(
    `${API_URL}/mock/start?difficulty=${encodeURIComponent(
      difficulty
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      'Failed to start mock interview'
    )
  }

  const data = await response.json()

  return data.questions
}