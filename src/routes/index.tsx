import { createFileRoute } from '@tanstack/react-router'
import { DateSelectionForm } from '@/components/DateSelectionForm'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="border border-border rounded-lg shadow-md">
        <DateSelectionForm />
      </div>
    </div>
  )
}
