import { createFileRoute } from '@tanstack/react-router'
import { ProjectListItem } from '@/components/ProjectListItem'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-[462px] border border-border rounded-lg overflow-hidden">
        <ProjectListItem
          name="MyAwesomeProject"
          count={1}
          isFavorite={true}
          primaryTag={{ label: "Datasilo" }}
          tags={["Finance", "HR", "Marketing"]}
        />
      </div>
    </div>
  )
}
