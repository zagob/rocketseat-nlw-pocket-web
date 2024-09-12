import { Loader2 } from 'lucide-react'

export function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-2">
      <Loader2 className="size-4 animate-spin" />
      Carregando...
    </div>
  )
}
