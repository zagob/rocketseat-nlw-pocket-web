import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-goal-completion'

export function PendingGoals() {
  const queryClient = useQueryClient()
  const { data: pendingGoals } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })

  const { mutate: handleCompleteGoal } = useMutation({
    mutationKey: ['create-goal'],
    mutationFn: async (goalId: string) => await createGoalCompletion(goalId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['summary'],
      })
      queryClient.invalidateQueries({
        queryKey: ['pending-goals'],
      })
    },
  })

  if (!pendingGoals) return null

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
