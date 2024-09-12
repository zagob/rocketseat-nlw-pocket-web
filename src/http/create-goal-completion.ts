export async function createGoalCompletion(goalId: string) {
  return await fetch('http://localhost:3333/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  })
    .then(res => res.json())
    .then(data => {
      return data.pendingGoals
    })
}
