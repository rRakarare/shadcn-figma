import Aside from '@/components/figmaUI/Aside'
import Frame101 from '@/components/figmaUI/Frame101'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className='container mx-auto mt-5'>
      <Aside/>
    </div>
  )
}
