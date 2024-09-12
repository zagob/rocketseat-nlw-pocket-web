interface PendingGoalsResponse {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}

export async function getPendingGoals(): Promise<
  PendingGoalsResponse[] | undefined
> {
  return await fetch('http://localhost:3333/pending-goals')
    .then(res => res.json())
    .then(data => {
      return data.pendingGoals
    })
}
